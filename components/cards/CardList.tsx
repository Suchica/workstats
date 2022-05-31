// import custom nextjs components
// import Script from 'next/script';

// import card components
import NumberOfCommits from './NumberOfCommits';
import NumberOfCloseTasks from './NumberOfCloseTasks';
// import NumberOfMeetings from './NumberOfMtgs';
import NumberOfMentioned from './NumberOfMentioned';
import NumberOfNewSent from './NumberOfNewSent';
import NumberOfOpenTasks from './NumberOfOpenTasks';
import NumberOfPullRequests from './NumberOfPullRequests';
import NumberOfReplies from './NumberOfReplies';
import NumberOfReviews from './NumberOfReview';
// import TotalTimeOfMeetings from './TotalTimeOfMtgs';

// import services
// import { handleClientLoad } from '../../services/googleCalendar.client';
// import GoogleAuthButton from './Auth&SignInButton';
import GearIconLink from '../common/GearIcon';

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
}

// @ts-ignore
const CardList = ({
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
  githubAccessToken
}: PropTypes) => {
  // const numberOfMeetings = 0;

  return (
    <>
      {/* <Script
        src='https://apis.google.com/js/api.js'
        // src='https://accounts.google.com/gsi/client'
        strategy='afterInteractive' // default. This is equivalent to loading a script with the `defer` attribute
        onLoad={async () => {
          console.log('1. google api script is loaded');
          console.log('2. handleClientLoad is starting');
          await handleClientLoad();
          console.log('15. handleClientLoad finished');
          // await countNumberOfEvents();
        }}
        onError={(e) => {
          console.error('Script failed to load google api', e);
        }}
      /> */}
      <div className='container max-w-6xl px-5 my-5'>
        <div className='flex'>
          <h2 className='text-xl mt-4 mb-2'>Coding - GitHub</h2>
          <GearIconLink
            mt={5}
            mb={2}
            href='/user-settings'
            alt='Gear icon links to user settings'
          />
        </div>
        <div className='grid gap-6 grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
          <NumberOfCommits
            githubOwnerName={githubOwnerName}
            githubRepoName={githubRepoName}
            githubUserId={githubUserId}
            githubAccessToken={githubAccessToken}
          />
          <NumberOfPullRequests
            githubOwnerName={githubOwnerName}
            githubRepoName={githubRepoName}
            githubUserId={githubUserId}
            githubAccessToken={githubAccessToken}
          />
          <NumberOfReviews
            githubOwnerName={githubOwnerName}
            githubRepoName={githubRepoName}
            githubUserName={githubUserName}
            githubAccessToken={githubAccessToken}
          />
        </div>
        <div className='flex'>
          <h2 className='text-xl mt-4 mb-2'>Tasks - Asana</h2>
          <GearIconLink
            mt={5}
            mb={2}
            href='/user-settings'
            alt='Gear icon links to user settings'
          />
        </div>
        <div className='grid gap-6 grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
          <NumberOfCloseTasks
            asanaPersonalAccessToken={asanaPersonalAccessToken}
            asanaWorkspaceId={asanaWorkspaceId}
            asanaUserId={asanaUserId}
          />
          <NumberOfOpenTasks
            asanaPersonalAccessToken={asanaPersonalAccessToken}
            asanaWorkspaceId={asanaWorkspaceId}
            asanaUserId={asanaUserId}
          />
        </div>
        <div className='flex'>
          <h2 className='text-xl mt-4 mb-2'>Communication - Slack</h2>
          <GearIconLink
            mt={5}
            mb={2}
            href='/user-settings'
            alt='Gear icon links to user settings'
          />
        </div>
        <div className='grid gap-6 grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
          <NumberOfMentioned data={numberOfMentioned} />
          <NumberOfReplies data={numberOfReplies} />
          <NumberOfNewSent data={numberOfNewSent} />
          {/* <GoogleAuthButton /> */}
          {/* <NumberOfMeetings data={numberOfMeetings} /> */}
          {/* <TotalTimeOfMeetings /> */}
        </div>
      </div>
    </>
  );
};

export default CardList;
