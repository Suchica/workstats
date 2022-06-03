// Next.js and React related
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

// Config
import { verifyIdToken } from '../firebaseAdmin';
import { UserType } from '../config/firebaseTypes';

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

interface PropTypes {
  numberOfMentioned: number;
  numberOfNewSent: number;
  numberOfReplies: number;
  asanaWorkspaceId: string;
  asanaUserId: string;
  asanaPersonalAccessToken: string;
  githubOwnerName: string;
  githubRepoName: string;
  githubUserId: number;
  githubUserName: string;
  githubAccessToken: string;
  profileList: UserType;
  uid: string;
}

export default function Home({
  numberOfMentioned,
  numberOfNewSent,
  numberOfReplies,
  asanaWorkspaceId,
  asanaUserId,
  asanaPersonalAccessToken,
  githubOwnerName,
  githubRepoName,
  githubUserId,
  githubUserName,
  githubAccessToken,
  profileList,
  uid
}: PropTypes) {
  const contentLong =
    'WorkStats is a dashboard tool for engineers and project managers engaged in system development to visualize their productivity and contributions in numbers. It aggregates various numbers from the platforms used by members and teams, such as GitHub for source control, Asana for task management, and Slack for communication tools.WorkStats';
  const contentShort =
    'is a dashboard tool for engineers and PMs to quantify their productivity, aggregating various numbers from GitHub, Asana, Slack, etc.';
  return (
    <>
      <Head>
        <title>Dashboard - WorkStats</title>
        <meta name='description' content={contentLong} />
        <meta property='og:title' content='WorkStats' />
        <meta property='og:description' content={contentShort} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://workstats.dev' />
        <meta property='og:image' content='../public/WorkStats_Dashboard.png' />
        <meta property='og:image:alt' content='WorkStats' />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:site_name' content='WorkStats' />
        <meta property='og:locale' content='en_US' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='WorkStats' />
        <meta name='twitter:site' content='@hnishio0105' />
        <meta name='twitter:creator' content='@hnishio0105' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/icononly_transparent_nobuffer.ico' />
      </Head>
      {profileList && (
        <main className='flex min-h-screen'>
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
              githubAccessToken={githubAccessToken}
            />
            <div className='h-20'></div>
          </div>
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
  const cookies = nookies.get(ctx);

  if (cookies.token) {
    const token = await verifyIdToken(cookies.token);

    // the user is authenticated!
    const { uid } = token;
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
    const githubAccessToken = userDoc?.github?.accessToken
      ? userDoc.github.accessToken
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
        githubAccessToken,
        profileList,
        uid
      }
    };
  } else {
    return { props: {} as never };
  }
};
