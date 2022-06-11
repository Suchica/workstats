import useSWR from 'swr';

// Record<Keys,Type> is a Utility type in typescript. It is a much cleaner alternative for key-value pairs where property-names are not known. It's worth noting that Record<Keys,Type> is a named alias to {[k: Keys]: Type} where Keys and Type are generics.
interface Params extends Record<string, string> {
  workspace: string;
  assignee: string;
}

const params: Params = {
  workspace: '',
  assignee: ''
};

// Request a user's Asana identity
// THe official document is here 'User Authorization Endpoint' in https://developers.asana.com/docs/oauth
const requestAsanaUserIdentity = () => {
  const scope = 'default';
  const unguessableRandomString = (outputLength: number) => {
    const stringPool =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: outputLength }, () =>
      stringPool.charAt(Math.floor(Math.random() * stringPool.length))
    ).join('');
  };
  interface PramsTypes {
    client_id: string;
    redirect_uri: string;
    response_type: 'code' | 'id_token' | 'code id_token';
    state: string;
    // code_challenge_method?: 'S256';
    // code_challenge?: string;
    scope: 'default' | 'openid' | 'email' | 'profile';
    [key: string]: string; // To avoid type error ts(7053) in params[key]
  }
  const params: PramsTypes = {
    client_id: process.env.NEXT_PUBLIC_ASANA_CLIENT_ID || '',
    redirect_uri: process.env.NEXT_PUBLIC_ASANA_REDIRECT_URI || '',
    response_type: 'code',
    state: unguessableRandomString(16),
    // code_challenge_method: 'S256',
    // code_challenge: unguessableRandomString(16), // This needs to be different from state
    scope: scope
  };
  const queryString = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  const url = `https://app.asana.com/-/oauth_authorize?${queryString}`;
  window.location.href = url;
};

const useNumberOfTasks = (
  asanaPersonalAccessToken: string,
  asanaWorkspaceId: string,
  asanaUserId: string
) => {
  // The official document is here: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#headers
  const token = asanaPersonalAccessToken;
  const myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + token);

  // Query parameters are passed in the URL.
  params.workspace = asanaWorkspaceId;
  params.assignee = asanaUserId;
  params.opt_fields = 'completed,completed_at';
  interface item {
    completed: boolean;
    completed_at: string;
  }
  const query = new URLSearchParams(params);
  // The official document is here: https://developers.asana.com/docs/get-multiple-tasks
  const asanaUrl = `https://app.asana.com/api/1.0/tasks?${query}`;

  // The official document is here: https://swr.vercel.app/docs/data-fetching
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      headers: myHeaders
    }).then((res) => res.json());

    const numberOfAll: number = response.data?.length
      ? response.data.length
      : 0;

    const numberOfClosed: number = response['data']?.filter((item: item) => {
      return item['completed'] === true;
    })?.length;

    const output = {
      numberOfAll: numberOfAll,
      numberOfClosed: numberOfClosed,
      numberOfOpened: numberOfAll - numberOfClosed
    };
    return output;
  };

  const { data, error } = useSWR(asanaUrl, fetcher, {
    revalidateOnFocus: false, // Don't revalidate on focus because a new user has not set up their asana profile yet
    revalidateOnReconnect: true
  });

  if (error) {
    console.log(`Failed to load Asana data: ${error}`);
    return 0;
  } else if (!data) {
    // console.log('Loading stats of asana...');
    return 0;
  } else {
    return data;
  }
};

export { requestAsanaUserIdentity, useNumberOfTasks };
