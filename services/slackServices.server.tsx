// Slack API method: conversation.history
// Obtain the number of times a user has posted a new message on a given channel
const slackConversationHistory = async (
  channel: string,
  newSentUser: string,
  token: string
) => {
  // Common part of each function
  const myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const slackURL = `https://slack.com/api/conversations.history?channel=${channel}`;
  const res = await fetch(slackURL, {
    headers: myHeaders
  });
  const data = await res.json();
  // The contents of data.messages is an array. Each element of the array is called an item. Then, filter by one property in the item.
  // @ts-ignore
  const filteredData = data.messages.filter((item) => {
    return item.user === newSentUser;
  });
  const result = filteredData.length;
  return result;
};

// Slack API method: conversation.list
// Obtain a channel list
const slackConversationList = async (token: string) => {
  // Common part of each function
  const myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const slackURL = 'https://slack.com/api/conversations.list';
  const res = await fetch(slackURL, {
    headers: myHeaders
  });
  const data = await res.json();
  // data.channels is an array. Each element in the array is an object containing various information about the channel.
  // So, we use the map method to create a new array with only the specific id property from that object.
  if (data.channels === undefined || data.channels.length === 0) {
    return [];
  }
  // @ts-ignore
  const result = data.channels.map((item) => item.id);
  return result;
};

const countRepliesInSlack = async (
  channel: string,
  timestamp: number,
  userId: string,
  token: string
) => {
  // Common part of each function
  const myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const slackURL = `https://slack.com/api/conversations.replies?channel=${channel}&ts=${timestamp}`;
  const res = await fetch(slackURL, {
    headers: myHeaders
  });
  const data = await res.json();
  if (data.messages === undefined || data.messages.length === 0) {
    return 0;
  }
  // @ts-ignore
  const result = data.messages.filter((item) => {
    return item.ts !== timestamp && item.user === userId;
  });
  return result.length;
};

const listTimestampInSlack = async (channel: string, token: string) => {
  // Common part of each function
  const myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const slackURL = `https://slack.com/api/conversations.history?channel=${channel}`;
  const res = await fetch(slackURL, {
    headers: myHeaders
  });
  const data = await res.json();
  // @ts-ignore
  const result = data.messages.map((item) => {
    return item.ts;
  });
  return { channel, result };
};

// Post a message to Slack
const postMessageToSlack = async () => {
  // Prepare arguments for the Slack API call
  const auth = `Bearer ${process.env.NEXT_PUBLIC_SLACK_BOT_TOKEN}`;
  const slackChannel = 'C03GG1FFZFC'; // channel name is 'cancel-membership'
  const slackMessage = 'A user has canceled their membership.';
  // const slackMessage = `
  // A new user has joined the app!
  // User name: Test
  // `;
  const slackURL = 'https://slack.com/api/chat.postMessage';

  // How to call the Slack API
  const response = await fetch(slackURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `token=${auth}&channel=${slackChannel}&text=${slackMessage}`
  });
  const data = await response.json();
  console.log('data is: ', data);
};

export {
  slackConversationHistory,
  slackConversationList,
  countRepliesInSlack,
  listTimestampInSlack,
  postMessageToSlack
};
