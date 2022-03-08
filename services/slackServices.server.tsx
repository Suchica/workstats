// Common part of each function
const token = `Bearer ${process.env.NEXT_PUBLIC_SLACK_API_USER_TOKEN}`;
const myHeaders = new Headers();
myHeaders.append("Authorization", token);
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// Slack API method: search.messages
const slackSearchFromServer = async (searchQuery: string) => {
  // This URL itself will be changed to a temporary argument later.
  const slackURL = `https://slack.com/api/search.messages?query=${searchQuery}`;
  const res = await fetch(slackURL, {
    headers: myHeaders,
  });
  const data = await res.json();
  return data;
};

// Slack API method: conversation.history
// Obtain the number of times a user has posted a new message on a given channel
const slackConversationHistory = async (
  channel: string,
  newSentUser: string
) => {
  const slackURL = `https://slack.com/api/conversations.history?channel=${channel}`;
  const res = await fetch(slackURL, {
    headers: myHeaders,
  });
  const data = await res.json();
  // The contents of data.messages is an array. Each element of the array is called an item. Then, filter by one property in the item.
  const filteredData = data.messages.filter((item) => {
    return item.user === newSentUser;
  });
  const result = filteredData.length;
  return result;
};

// Slack API method: conversation.list
// Obtain a channel list
const slackConversationList = async () => {
  const slackURL = `https://slack.com/api/conversations.list`;
  const res = await fetch(slackURL, {
    headers: myHeaders,
  });
  const data = await res.json();
  // data.channels is an array. Each element in the array is an object containing various information about the channel. 
  // So, we use the map method to create a new array with only the specific id property from that object.
  const result = data.channels.map((item) => item.id);
  return result;
};

export {
  slackSearchFromServer,
  slackConversationHistory,
  slackConversationList,
};
