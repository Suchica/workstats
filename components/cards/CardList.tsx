// import custom nextjs components
import Script from 'next/script';

// import card components
import NumberOfCommits from './NumberOfCommits';
import NumberOfCloseTasks from './NumberOfCloseTasks';
import NumberOfMeetings from './NumberOfMtgs';
import NumberOfMentioned from './NumberOfMentioned';
import NumberOfNewSent from './NumberOfNewSent';
import NumberOfOpenTasks from './NumberOfOpenTasks';
import NumberOfPullRequests from './NumberOfPullRequests';
import NumberOfReplies from './NumberOfReplies';
import NumberOfReviews from './NumberOfReview';
import TotalTimeOfMeetings from './TotalTimeOfMtgs';

// import services
import { handleClientLoad } from '../../services/googleCalendar.client';
// import GoogleAuthButton from './Auth&SignInButton';
import GearIconLink from '../common/GearIcon';

// @ts-ignore
const CardList = ({
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
  githubUserName
}) => {
  const numberOfMeetings = 0;

  return (
    <>
      <Script
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
      />
      <div className='container max-w-6xl px-5 my-5'>
        <div className='flex'>
          <h2 className='text-xl mt-4 mb-2'>Coding - GitHub</h2>
          <GearIconLink mt={5} mb={2} href='/user-settings' />
        </div>
        <div className='grid gap-6 grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
          <NumberOfCommits
            githubOwnerName={githubOwnerName}
            githubRepoName={githubRepoName}
            githubUserId={githubUserId}
          />
          <NumberOfPullRequests
            githubOwnerName={githubOwnerName}
            githubRepoName={githubRepoName}
            githubUserId={githubUserId}
          />
          <NumberOfReviews
            githubOwnerName={githubOwnerName}
            githubRepoName={githubRepoName}
            githubUserName={githubUserName}
          />
        </div>
        <h2 className='text-xl mt-4 mb-2'>Tasks - Asana</h2>
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
        <h2 className='text-xl mt-4 mb-2'>
          Communication - Slack, Google Calendar & Gmail
        </h2>
        <div className='grid gap-6 grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
          <NumberOfMentioned data={numberOfMentioned} />
          <NumberOfReplies data={numberOfReplies} />
          <NumberOfNewSent data={numberOfNewSent} />
          {/* <GoogleAuthButton /> */}
          <NumberOfMeetings data={numberOfMeetings} />
          <TotalTimeOfMeetings />
        </div>
      </div>
    </>
  );
};

export default CardList;
