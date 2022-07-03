import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseClient';
import { NumbersType, UserType } from '../config/firebaseTypes';

const createUserDoc = async (docId: string) => {
  const docRef = doc(db, 'users', docId);
  const docData: UserType = {};
  const option = { merge: true };
  await setDoc(docRef, docData, option);
  return;
};

const createNumbersDoc = async (docId: string) => {
  const docRef = doc(db, 'numbers', docId);
  const docData: NumbersType = {};
  const option = { merge: true };
  await setDoc(docRef, docData, option);
  return;
};

const handleSubmitBasicInfo = async (
  event: React.FormEvent<HTMLFormElement>,
  docId: string
) => {
  event.preventDefault();
  const docRef = doc(db, 'users', docId);
  const docData: UserType = {
    assessor: event.currentTarget.assessor.value,
    assignedPj: event.currentTarget.assignedPj.value,
    companyName: event.currentTarget.companyName.value,
    department: event.currentTarget.department.value,
    firstName: event.currentTarget.firstName.value,
    lastName: event.currentTarget.lastName.value,
    middleName: event.currentTarget.middleName.value,
    rank: event.currentTarget.rank.value,
    role: event.currentTarget.role.value,
    supervisor: event.currentTarget.supervisor.value
  };
  const option = { merge: true }; // means that if the doc already exists, it will be updated instead of creating a new one.

  await setDoc(docRef, docData, option);
  alert('Basic info updated!');
  return;
};

const handleSubmitGithubAccessToken = async (
  docId: string,
  accessToken: string
) => {
  const docRef = doc(db, 'users', docId);
  const docData = {
    github: {
      accessToken: accessToken
    }
  };
  const option = { merge: true };
  await setDoc(docRef, docData, option);
  return;
};

const handleSubmitSourceCode = async (
  event: React.FormEvent<HTMLFormElement>,
  docId: string
) => {
  event.preventDefault();
  const docRef = doc(db, 'users', docId);
  const docData: UserType = {
    github: {
      repositories: [
        {
          owner: event.currentTarget.githubRepoOwner1.value,
          repo: event.currentTarget.githubRepo1.value,
          visibility: event.currentTarget.githubRepoVisibility1.value
        },
        {
          owner: event.currentTarget.githubRepoOwner2.value,
          repo: event.currentTarget.githubRepo2.value,
          visibility: event.currentTarget.githubRepoVisibility2.value
        }
      ],
      userId: event.currentTarget.githubUserId.valueAsNumber, // should be a number
      userName: event.currentTarget.githubUserName.value
    }
  };
  const option = { merge: true };

  await setDoc(docRef, docData, option);
  alert('Source code info updated!');
  return;
};

const handleSubmitAsanaAccessToken = async (
  docId: string,
  accessToken: string,
  userId?: string,
  refreshToken?: string
) => {
  const docRef = doc(db, 'users', docId);
  const docData =
    !refreshToken && refreshToken !== ''
      ? {
          asana: {
            accessToken: accessToken
          }
        }
      : {
          asana: {
            accessToken: accessToken,
            refreshToken: refreshToken,
            userId: userId
          }
        };
  const option = { merge: true };
  await setDoc(docRef, docData, option);
  return;
};

const handleSubmitTaskTicket = async (
  event: React.FormEvent<HTMLFormElement>,
  docId: string
) => {
  event.preventDefault();
  const docRef = doc(db, 'users', docId);
  const docData: UserType = {
    asana: {
      userId: event.currentTarget.asanaUserId.value,
      workspace: [
        {
          workspaceId: event.currentTarget.asanaWorkspaceId1.value,
          workspaceName: event.currentTarget.asanaWorkspaceName1.value
        },
        {
          workspaceId: event.currentTarget.asanaWorkspaceId2.value,
          workspaceName: event.currentTarget.asanaWorkspaceName2.value
        }
      ]
    }
  };
  const option = { merge: true }; // means that if the doc already exists, it will be updated instead of creating a new one.

  await setDoc(docRef, docData, option);
  alert('Task ticket info updated!');
  return;
};

const handleSubmitSlackAccessToken = async (
  docId: string,
  accessToken: string,
  userId: string,
  workspaceName: string
) => {
  const docRef = doc(db, 'users', docId);
  const docData: UserType = {
    slack: {
      workspace: [
        {
          accessToken: accessToken,
          memberId: userId,
          workspaceName: workspaceName
        }
      ]
    }
  };
  const option = { merge: true };
  await setDoc(docRef, docData, option);
  return;
};

const handleSubmitCommunicationActivity = async (
  event: React.FormEvent<HTMLFormElement>,
  docId: string
) => {
  event.preventDefault();
  const docRef = doc(db, 'users', docId);
  const docData: UserType = {
    slack: {
      workspace: [
        {
          workspaceName: event.currentTarget.slackWorkspaceName1.value,
          memberId: event.currentTarget.slackWorkspaceMemberId1.value
        },
        {
          workspaceName: event.currentTarget.slackWorkspaceName2.value,
          memberId: event.currentTarget.slackWorkspaceMemberId2.value
        }
      ]
    }
  };
  const option = { merge: true }; // means that if the doc already exists, it will be updated instead of creating a new one.

  await setDoc(docRef, docData, option);
  alert('Communication activity info updated!');
  return;
};

const handleSubmitSurveyWhyYouLeave = async (
  event: React.FormEvent<HTMLFormElement>,
  docId: string,
  n: number
) => {
  event.preventDefault();
  const docRef = doc(db, 'unsub-reasons', docId);
  const arrayData = Array(n)
    .fill(0) // fill with 0 because map() will not work with undefined
    .map((_, i) => {
      return {
        reasonId: event.currentTarget[`reason${i + 1}`].id,
        reasonName: event.currentTarget[`reason${i + 1}`].name,
        checked: event.currentTarget[`reason${i + 1}`].checked
      };
    });
  const docData = {
    reasons: arrayData
  };
  const option = { merge: true }; // means that if the doc already exists, it will be updated instead of creating a new one.

  await setDoc(docRef, docData, option);
  return;
};

interface UpdInsGithubNumbersProps {
  docId: string;
  numberOfCommitsAllPeriods: number;
  numberOfPullRequestsAllPeriods: number;
  numberOfReviewsAllPeriods: number;
}
const UpdInsGithubNumbers = async ({
  docId,
  numberOfCommitsAllPeriods,
  numberOfPullRequestsAllPeriods,
  numberOfReviewsAllPeriods
}: UpdInsGithubNumbersProps) => {
  const docRef = doc(db, 'numbers', docId);
  const docData: NumbersType = {
    github: {
      numberOfCommits: {
        allPeriods: numberOfCommitsAllPeriods
      },
      numberOfPullRequests: {
        allPeriods: numberOfPullRequestsAllPeriods
      },
      numberOfReviews: {
        allPeriods: numberOfReviewsAllPeriods
      }
    }
  };
  const option = { merge: true };
  await setDoc(docRef, docData, option);
  return;
};

interface UpdInsAsanaNumbersProps {
  docId: string;
  numberOfTasksAllPeriods: number;
  numberOfTasksClosedAllPeriods: number;
  numberOfTasksOpenAllPeriods: number;
  velocityPerDayAllPeriods: number;
  velocityPerWeekAllPeriods: number;
  estimatedCompletionDateAllPeriods: string;
}
const UpdInsAsanaNumbers = async ({
  docId,
  numberOfTasksAllPeriods,
  numberOfTasksClosedAllPeriods,
  numberOfTasksOpenAllPeriods,
  velocityPerDayAllPeriods,
  velocityPerWeekAllPeriods,
  estimatedCompletionDateAllPeriods
}: UpdInsAsanaNumbersProps) => {
  const docRef = doc(db, 'numbers', docId);
  const docData: NumbersType = {
    asana: {
      numberOfTasks: {
        allPeriods: numberOfTasksAllPeriods
      },
      numberOfTasksClosed: {
        allPeriods: numberOfTasksClosedAllPeriods
      },
      numberOfTasksOpen: {
        allPeriods: numberOfTasksOpenAllPeriods
      },
      velocityPerDay: {
        allPeriods: velocityPerDayAllPeriods
      },
      velocityPerWeek: {
        allPeriods: velocityPerWeekAllPeriods
      },
      estimatedCompletionDate: {
        allPeriods: estimatedCompletionDateAllPeriods
      }
    }
  };
  const option = { merge: true };
  await setDoc(docRef, docData, option);
  return;
};

interface UpdInsSlackNumbersProps {
  docId: string;
  numberOfMentionedAllPeriods: number;
  numberOfNewSentAllPeriods: number;
  numberOfTotalSentAllPeriods: number;
  numberOfRepliesAllPeriods: number;
}
const UpdInsSlackNumbers = async ({
  docId,
  numberOfMentionedAllPeriods,
  numberOfNewSentAllPeriods,
  numberOfTotalSentAllPeriods,
  numberOfRepliesAllPeriods
}: UpdInsSlackNumbersProps) => {
  const docRef = doc(db, 'numbers', docId);
  const docData: NumbersType = {
    slack: {
      numberOfMentioned: {
        allPeriods: numberOfMentionedAllPeriods
      },
      numberOfNewSent: {
        allPeriods: numberOfNewSentAllPeriods
      },
      numberOfTotalSent: {
        allPeriods: numberOfTotalSentAllPeriods
      },
      numberOfReplies: {
        allPeriods: numberOfRepliesAllPeriods
      }
    }
  };
  const option = { merge: true };
  await setDoc(docRef, docData, option);
  return;
};

export {
  createNumbersDoc,
  createUserDoc,
  handleSubmitBasicInfo,
  handleSubmitGithubAccessToken,
  handleSubmitSourceCode,
  handleSubmitAsanaAccessToken,
  handleSubmitTaskTicket,
  handleSubmitSlackAccessToken,
  handleSubmitCommunicationActivity,
  handleSubmitSurveyWhyYouLeave,
  UpdInsAsanaNumbers,
  UpdInsGithubNumbers,
  UpdInsSlackNumbers
};
