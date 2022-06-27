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
  slackConversationList
} from '../services/slackServices.server';
import getAUserDoc from '../services/getAUserDocFromFirebase';

interface PropTypes {
  numberOfNewSent: number;
  numberOfReplies: number;
  asanaWorkspaceId: string;
  asanaUserId: string;
  asanaOAuthAccessToken: string;
  asanaRefreshToken: string;
  githubOwnerName: string;
  githubRepoName: string;
  githubUserId: number;
  githubUserName: string;
  githubAccessToken: string;
  profileList: UserType;
  slackAccessToken: string;
  searchQuery: string;
  uid: string;
}

export default function Home({
  numberOfNewSent,
  numberOfReplies,
  asanaWorkspaceId,
  asanaUserId,
  asanaOAuthAccessToken,
  asanaRefreshToken,
  githubOwnerName,
  githubRepoName,
  githubUserId,
  githubUserName,
  githubAccessToken,
  profileList,
  slackAccessToken,
  searchQuery,
  uid
}: PropTypes) {
  const contentLong =
    'WorkStats is a dashboard tool for engineers and project managers engaged in system development to visualize their productivity and contributions in numbers. It aggregates various numbers from the platforms used by members and teams, such as GitHub for source control, Asana for task management, and Slack for communication tools.WorkStats';
  return (
    <>
      <Head>
        <title>Dashboard - WorkStats</title>
        <meta name='description' content={contentLong} />
      </Head>
      {profileList && (
        <main className='md:flex min-h-screen'>
          <div className='md:w-72'>
            <Avatar userId={uid} />
            <ProfileList profileList={profileList} />
          </div>
          <div>
            <ButtonList />
            <SpecifyPeriodFromTo />
            <CardList
              numberOfNewSent={numberOfNewSent}
              numberOfReplies={numberOfReplies}
              asanaWorkspaceId={asanaWorkspaceId}
              asanaUserId={asanaUserId}
              asanaOAuthAccessToken={asanaOAuthAccessToken}
              asanaRefreshToken={asanaRefreshToken}
              githubOwnerName={githubOwnerName}
              githubRepoName={githubRepoName}
              githubUserId={githubUserId}
              githubUserName={githubUserName}
              githubAccessToken={githubAccessToken}
              slackAccessToken={slackAccessToken}
              searchQuery={searchQuery}
              uid={uid}
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
    const asanaOAuthAccessToken = userDoc?.asana?.accessToken
      ? userDoc.asana.accessToken
      : null;
    const asanaRefreshToken = userDoc?.asana?.refreshToken
      ? userDoc.asana.refreshToken
      : null;
    const asanaUserId = userDoc?.asana?.userId ? userDoc.asana.userId : null;
    const asanaWorkspaceId = userDoc?.asana?.workspace?.[0]?.workspaceId
      ? userDoc.asana.workspace[0].workspaceId
      : null;

    // Parameters for github
    const githubRepoName = userDoc?.github?.repositories?.[0]?.repo
      ? userDoc.github.repositories[0].repo
      : null;
    const githubOwnerName = userDoc?.github?.repositories?.[0]?.owner
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
      userDoc?.slack?.workspace?.[0]?.memberId;
    const slackAccessToken = `Bearer ${userDoc?.slack?.workspace?.[0]?.accessToken}`;

    // Tabulate number of times a user has newly sent messages in all slack public channels
    const channelList = await slackConversationList(slackAccessToken);
    let numberOfNewSent = 0;
    const numberOfNewSentPromises = [];
    for (let x in channelList) {
      let channel = channelList[x];
      numberOfNewSentPromises.push(
        slackConversationHistory(
          channel,
          // @ts-ignore
          searchQuery,
          slackAccessToken
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
        listTimestampInSlack(channel, slackAccessToken)
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
              slackAccessToken
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
        numberOfNewSent,
        numberOfReplies,
        asanaUserId,
        asanaWorkspaceId,
        asanaOAuthAccessToken,
        asanaRefreshToken,
        githubRepoName,
        githubOwnerName,
        githubUserId,
        githubUserName,
        githubAccessToken,
        profileList,
        slackAccessToken,
        searchQuery,
        uid
      }
    };
  } else {
    return { props: {} as never };
  }
};
