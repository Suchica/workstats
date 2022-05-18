// Next.js and React related
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

// Config
import { verifyIdToken } from '../firebaseAdmin';

// Components
import ProfileList from '../components/common/ProfileList';
import CardList from '../components/cards/CardList';
import Avatar from '../components/common/Avatar';
import ButtonList from '../components/buttons/ButtonList';
import SpecifyPeriodFromTo from '../components/buttons/SpecifyPeriodFromTo';

// Services
import {
  countRepliesInSlack,
  listTimestampInSlack,
  slackConversationHistory,
  slackConversationList,
  slackSearchFromServer
} from '../services/slackServices.server';
import getAUserDoc from '../services/getAUserDocFromFirebase';

export default function Home({
  // @ts-ignore
  numberOfMentioned,
  // @ts-ignore
  numberOfNewSent,
  // @ts-ignore
  numberOfReplies,
  // @ts-ignore
  asanaWorkspaceId,
  // @ts-ignore
  asanaUserId,
  // @ts-ignore
  asanaPersonalAccessToken,
  // @ts-ignore
  githubOwnerName,
  // @ts-ignore
  githubRepoName,
  // @ts-ignore
  githubUserId,
  // @ts-ignore
  githubUserName,
  // @ts-ignore
  profileList,
  // @ts-ignore
  uid
}) {
  // const { currentUser } = useAuth();
  // const [open, setOpen] = useState(false);
  // const [alertType, setAlertType] = useState("success");
  // const [alertMessage, setAlertMessage] = useState("");
  // const showAlert = (type, msg) => {
  //   setAlertType(type);
  //   setAlertMessage(msg);
  //   setOpen(true);
  // };
  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };
  // console.log('userDoc is: ', userDoc);

  return (
    <>
      <Head>
        <title>Dashboard - WorkStats</title>
        <meta name='description' content='WorkStats' />
        <link rel='icon' href='/favicon.ico' />
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/@themesberg/flowbite@1.3.3/dist/flowbite.min.css"
        /> */}
      </Head>
      {profileList && (
        <main className='flex'>
          <div className='flex-none w-72'>
            <Avatar userId={uid} />
            <ProfileList profileList={profileList} />
          </div>
          <div>
            <ButtonList />
            <SpecifyPeriodFromTo />
            <CardList
              numberOfMentioned={numberOfMentioned}
              numberOfNewSent={numberOfNewSent}
              numberOfReplies={numberOfReplies}
              asanaWorkspaceId={asanaWorkspaceId}
              asanaUserId={asanaUserId}
              asanaPersonalAccessToken={asanaPersonalAccessToken}
              githubOwnerName={githubOwnerName}
              githubRepoName={githubRepoName}
              githubUserId={githubUserId}
              githubUserName={githubUserName}
            />
            <div className='h-10'></div>
          </div>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          {/* <script src="https://unpkg.com/@themesberg/flowbite@1.3.3/dist/flowbite.bundle.js" /> */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          {/* <script src="https://unpkg.com/@themesberg/flowbite@1.3.3/dist/datepicker.bundle.js" /> */}
        </main>
      )}
    </>
  );
}

// This gets called on every request.
// The official document is here: https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  // console.log('ctx is: ', ctx);
  const cookies = nookies.get(ctx);
  // console.log('cookies is: ', cookies);

  if (cookies.token) {
    const token = await verifyIdToken(cookies.token);

    // the user is authenticated!
    const { uid } = token;
    // const currentUser = auth.currentUser;
    // const docId = currentUser?.uid ? currentUser.uid : '';
    const userDoc = await getAUserDoc(uid);

    // Profile list to be displayed on the left side
    const profileList = {
      firstName: userDoc?.firstName ? userDoc.firstName : '',
      middleName: userDoc?.middleName ? userDoc.middleName : '',
      lastName: userDoc?.lastName ? userDoc.lastName : '',
      department: userDoc?.department ? userDoc.department : '',
      rank: userDoc?.rank ? userDoc.rank : '',
      supervisor: userDoc?.supervisor ? userDoc.supervisor : '',
      assessor: userDoc?.assessor ? userDoc.assessor : '',
      assignedPj: userDoc?.assignedPj ? userDoc.assignedPj : '',
      role: userDoc?.role ? userDoc.role : '',
      avatarUrl: userDoc?.avatarUrl ? userDoc.avatarUrl : ''
    };

    // Parameters for asana
    const asanaPersonalAccessToken = userDoc?.asana?.workspace[0]
      .personalAccessToken
      ? userDoc.asana.workspace[0].personalAccessToken
      : null;
    const asanaUserId = userDoc?.asana?.userId ? userDoc.asana.userId : null;
    const asanaWorkspaceId = userDoc?.asana?.workspace[0].workspaceId
      ? userDoc.asana.workspace[0].workspaceId
      : null;

    // Parameters for github
    const githubRepoName = userDoc?.github?.repositories[0].repo
      ? userDoc.github.repositories[0].repo
      : null;
    const githubOwnerName = userDoc?.github?.repositories[0].owner
      ? userDoc.github.repositories[0].owner
      : null;
    const githubUserId = userDoc?.github?.userId ? userDoc.github.userId : null;
    const githubUserName = userDoc?.github?.userName
      ? userDoc.github.userName
      : null;

    // Parameters for slack
    const searchQuery: string | undefined =
      userDoc?.slack?.workspace[0].memberId;
    const slackUserToken = `Bearer ${userDoc?.slack?.workspace[0].userToken}`;

    // Tabulate number of times a user has been mentioned in all slack public channels
    const numberOfMentioned = await slackSearchFromServer(
      // @ts-ignore
      searchQuery,
      slackUserToken
    );

    // Tabulate number of times a user has newly sent messages in all slack public channels
    const channelList = await slackConversationList(slackUserToken);
    let numberOfNewSent = 0;
    const numberOfNewSentPromises = [];
    for (let x in channelList) {
      let channel = channelList[x];
      numberOfNewSentPromises.push(
        slackConversationHistory(
          channel,
          // @ts-ignore
          searchQuery,
          slackUserToken
        )
      );
    }
    (await Promise.all(numberOfNewSentPromises)).map(
      (n) => (numberOfNewSent += n)
    );

    // Tabulate number of times a user has replied in all slack public channels
    let numberOfReplies = 0;
    const numberOfRepliesPromises: any = [];
    const listTimestampInSlackPromises: any = [];

    channelList.map((channel: string) => {
      listTimestampInSlackPromises.push(
        listTimestampInSlack(channel, slackUserToken)
      );
    });

    (await Promise.all(listTimestampInSlackPromises)).map(
      // @ts-ignore
      ({ channel, result }) => {
        const timestampList: [] = result;
        timestampList.map((timestamp: number) => {
          numberOfRepliesPromises.push(
            countRepliesInSlack(
              channel,
              timestamp,
              // @ts-ignore
              searchQuery,
              slackUserToken
            )
          );
        });
      }
    );

    (await Promise.all(numberOfRepliesPromises)).map(
      // n must be a number but type error is thrown
      // @ts-ignore
      (n) => (numberOfReplies += n)
    );

    // Pass data to the page via props
    return {
      props: {
        numberOfMentioned,
        numberOfNewSent,
        numberOfReplies,
        asanaUserId,
        asanaWorkspaceId,
        asanaPersonalAccessToken,
        githubRepoName,
        githubOwnerName,
        githubUserId,
        githubUserName,
        profileList,
        uid
      }
    };
  } else {
    return { props: {} as never };
  }
};
