// import custom nextjs components
import { useEffect, useState } from 'react';
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
import VelocityOfTaskClose from './VelocityOfTaskClose';
// import TotalTimeOfMeetings from './TotalTimeOfMtgs';

// import services
// import { handleClientLoad } from '../../services/googleCalendar.client';
// import GoogleAuthButton from './Auth&SignInButton';
import GearIconLink from '../common/GearIcon';
import {
  useNumberOfCommits,
  useNumberOfPullRequests,
  useNumberOfReviews
} from '../../services/githubServices.client';
import { useNumberOfTasks } from '../../services/asanaServices.client';
import EstimatedDateOfCompletion from './EstimatedDateOfTaskEnd';
import {
  useSlackSearch,
  useSlackChannelList,
  getSlackNumberOfNewSent
} from '../../services/slackServices.client';
import {
  UpdInsAsanaNumbers,
  UpdInsGithubNumbers,
  UpdInsSlackNumbers
} from '../../services/setDocToFirestore';
import { NumbersType } from '../../config/firebaseTypes';

interface PropTypes {
  asanaWorkspaceId: string;
  asanaUserId: string;
  asanaOAuthAccessToken: string;
  asanaRefreshToken: string;
  githubOwnerName: string;
  githubRepoName: string;
  githubUserId: number;
  githubUserName: string;
  githubAccessToken: string;
  numbersDoc: NumbersType;
  slackAccessToken: string;
  slackMemberId: string;
  uid: string;
}

const CardList = ({
  asanaWorkspaceId,
  asanaUserId,
  asanaOAuthAccessToken,
  asanaRefreshToken,
  githubOwnerName,
  githubRepoName,
  githubUserId,
  githubUserName,
  githubAccessToken,
  numbersDoc,
  slackAccessToken,
  slackMemberId,
  uid
}: PropTypes) => {
  // const numberOfMeetings = 0;
  const [numberOfCommits, setNumberOfCommits] = useState(
    numbersDoc?.github?.numberOfCommits.allPeriods || 0
  );
  const [numberOfPullRequests, setNumberOfPullRequests] = useState(
    numbersDoc?.github?.numberOfPullRequests.allPeriods || 0
  );
  const [numberOfReviews, setNumberOfReviews] = useState(
    numbersDoc?.github?.numberOfReviews.allPeriods || 0
  );
  const numberOfCommitsCalc = useNumberOfCommits(
    githubOwnerName,
    githubRepoName,
    githubUserId,
    githubAccessToken
  );
  const numberOfPullRequestsCalc = useNumberOfPullRequests({
    owner: githubOwnerName,
    repo: githubRepoName,
    githubUserId,
    accessToken: githubAccessToken
  });
  const numberOfReviewsCalc = useNumberOfReviews(
    githubOwnerName,
    githubRepoName,
    githubUserName,
    githubAccessToken
  );
  useEffect(() => {
    setNumberOfCommits(numberOfCommitsCalc);
    setNumberOfPullRequests(numberOfPullRequestsCalc);
    setNumberOfReviews(numberOfReviewsCalc);
  }, [numberOfCommitsCalc, numberOfPullRequestsCalc, numberOfReviewsCalc]);
  // Store GitHub numbers in Firestore without awaiting
  useEffect(() => {
    UpdInsGithubNumbers({
      docId: uid,
      numberOfCommitsAllPeriods: numberOfCommits,
      numberOfPullRequestsAllPeriods: numberOfPullRequests,
      numberOfReviewsAllPeriods: numberOfReviews
    });
  }, [numberOfCommits, numberOfPullRequests, numberOfReviews, uid]);

  // Aggregate numbers from Asana
  const [numberOfTasks, setNumberOfTasks] = useState(
    numbersDoc?.asana?.numberOfTasks.allPeriods || 0
  );
  const [numberOfTasksClosed, setNumberOfTasksClosed] = useState(
    numbersDoc?.asana?.numberOfTasksClosed.allPeriods || 0
  );
  const [numberOfTasksOpen, setNumberOfTasksOpen] = useState(
    numbersDoc?.asana?.numberOfTasksOpen.allPeriods || 0
  );
  const [velocityPerDay, setVelocityPerDay] = useState(
    numbersDoc?.asana?.velocityPerDay.allPeriods || 0
  );
  const [velocityPerWeek, setVelocityPerWeek] = useState(
    numbersDoc?.asana?.velocityPerWeek.allPeriods || 0
  );
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState(
    numbersDoc?.asana?.estimatedCompletionDate.allPeriods || '--'
  );
  const [asanaAccessToken, setAsanaAccessToken] = useState(
    asanaOAuthAccessToken
  );
  const numberOfTasksCalc = useNumberOfTasks(
    asanaAccessToken,
    asanaWorkspaceId,
    asanaUserId,
    asanaRefreshToken,
    uid
  );
  useEffect(() => {
    setNumberOfTasks(numberOfTasksCalc.numberOfAll);
    setNumberOfTasksClosed(numberOfTasksCalc.numberOfClosed);
    setNumberOfTasksOpen(numberOfTasksCalc.numberOfOpened);
    setVelocityPerDay(numberOfTasksCalc.velocityPerDays);
    setVelocityPerWeek(numberOfTasksCalc.velocityPerWeeks);
    setEstimatedCompletionDate(numberOfTasksCalc.estimatedCompletionDate);
    setAsanaAccessToken(numberOfTasksCalc.asanaAccessToken);
  }, [numberOfTasksCalc]);
  useEffect(() => {
    UpdInsAsanaNumbers({
      docId: uid,
      numberOfTasksAllPeriods: numberOfTasks,
      numberOfTasksClosedAllPeriods: numberOfTasksClosed,
      numberOfTasksOpenAllPeriods: numberOfTasksOpen,
      velocityPerDayAllPeriods: velocityPerDay,
      velocityPerWeekAllPeriods: velocityPerWeek,
      estimatedCompletionDateAllPeriods: estimatedCompletionDate
    });
  }, [
    numberOfTasks,
    numberOfTasksClosed,
    numberOfTasksOpen,
    velocityPerDay,
    velocityPerWeek,
    estimatedCompletionDate,
    uid
  ]);

  // Aggregate numbers from Slack
  const [numberOfMentioned, setNumberOfMentioned] = useState(
    numbersDoc?.slack?.numberOfMentioned.allPeriods || 0
  );
  const [numberOfTotalSent, setNumberOfTotalSent] = useState(
    numbersDoc?.slack?.numberOfTotalSent.allPeriods || 0
  );
  const numberOfTotalSentCalc = useSlackSearch({
    slackMemberId,
    slackAccessToken,
    searchMode: 'sent'
  });
  const numberOfMentionedCalc = useSlackSearch({
    slackMemberId,
    slackAccessToken,
    searchMode: 'mentioned'
  });
  useEffect(() => {
    setNumberOfMentioned(numberOfMentionedCalc);
    setNumberOfTotalSent(numberOfTotalSentCalc);
  }, [numberOfMentionedCalc, numberOfTotalSentCalc]);
  const slackChannelList = useSlackChannelList({ slackAccessToken });
  const [numberOfNewSent, setNumberOfNewSent] = useState(
    numbersDoc?.slack?.numberOfNewSent.allPeriods || 0
  );
  const [numberOfReplies, setNumberOfReplies] = useState(
    numbersDoc?.slack?.numberOfReplies.allPeriods || 0
  );
  useEffect(() => {
    // Since this is an unnamed asynchronous function, it is enclosed in parentheses for immediate execution upon declaration
    (async () => {
      // Throwing the return value of getSlackNumberOfNewSent into an array of numberOfNewSentPromises without intentionally resolving the promise.
      const numberOfNewSentPromises: Promise<number>[] = [];
      const nowDate = new Date();
      const nowUnixtime = nowDate.valueOf() / 1000; // seconds
      for (const i in slackChannelList) {
        numberOfNewSentPromises.push(
          getSlackNumberOfNewSent({
            channelId: slackChannelList[i],
            latest: nowUnixtime,
            oldest: 0,
            slackMemberId,
            slackAccessToken
          })
        );
      }
      // Wait for all the promises in the numberOfNewSentPromises array to be resolved, then add them all together.
      const numberOfNewSentCalc = (
        await Promise.all(numberOfNewSentPromises)
      ).reduce((acc, curr) => {
        return acc + curr;
      }, 0);
      setNumberOfNewSent(numberOfNewSentCalc);
      if (numberOfTotalSentCalc && numberOfNewSentCalc) {
        setNumberOfReplies(numberOfTotalSentCalc - numberOfNewSentCalc);
      }
    })();
  }, [
    slackMemberId,
    slackAccessToken,
    slackChannelList,
    numberOfNewSent,
    numberOfTotalSentCalc
  ]);
  useEffect(() => {
    UpdInsSlackNumbers({
      docId: uid,
      numberOfMentionedAllPeriods: numberOfMentioned,
      numberOfTotalSentAllPeriods: numberOfTotalSent,
      numberOfNewSentAllPeriods: numberOfNewSent,
      numberOfRepliesAllPeriods: numberOfReplies
    });
  }, [
    numberOfMentioned,
    numberOfTotalSent,
    numberOfNewSent,
    numberOfReplies,
    uid
  ]);

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
      <div className='container max-w-6xl px-5 my-1 md:my-5'>
        <div className='flex'>
          <h2 className='text-xl mt-4 mb-2'>Coding - GitHub</h2>
          <GearIconLink
            mt={5}
            mb={2}
            href='/user-settings'
            alt='Gear icon links to user settings'
          />
        </div>
        <div className='grid gap-3 md:gap-5 grid-cols-2 lg:grid-cols-3'>
          <NumberOfCommits data={numberOfCommits} />
          <NumberOfPullRequests data={numberOfPullRequests} />
          <NumberOfReviews data={numberOfReviews} />
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
        <div className='grid gap-3 md:gap-5 grid-cols-2 lg:grid-cols-3'>
          <NumberOfCloseTasks number={numberOfTasksClosed} />
          <NumberOfOpenTasks number={numberOfTasksOpen} />
          <VelocityOfTaskClose
            number={velocityPerWeek.toFixed(1)} // If the first decimal place is 0, it is converted to a string to keep the 0
          />
          <EstimatedDateOfCompletion date={estimatedCompletionDate} />
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
        <div className='grid gap-3 md:gap-5 grid-cols-2 lg:grid-cols-3'>
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
