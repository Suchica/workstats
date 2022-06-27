import useSWR from 'swr';

// HTTP endpoint v3 (REST API)
const base = 'https://api.github.com';
const options = {
  shouldRetryOnError: false, // Default is true
  revalidateIfStale: false, // Default is true
  revalidateOnFocus: false, // Default is true
  revalidateOnReconnect: false // Default is true
};

// Request a user's GitHub identity
// THe official document is here https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity
const requestGithubUserIdentity = () => {
  const scopes = 'repo read:org user read:discussion';
  const unguessableRandomString = (outputLength: number) => {
    const stringPool =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: outputLength }, () =>
      stringPool.charAt(Math.floor(Math.random() * stringPool.length))
    ).join('');
  };
  interface PramsTypes {
    client_id: string;
    // redirect_uri: string;
    scope: string;
    state: string;
    allow_signup: string;
    [key: string]: string; // To avoid type error ts(7053) in params[key]
  }
  const params: PramsTypes = {
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
    // redirect_uri: 'https://auth.workstats.dev/__/auth/handler',
    scope: scopes,
    state: unguessableRandomString(16),
    allow_signup: 'false'
  };
  const queryString = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  const url = `https://github.com/login/oauth/authorize?${queryString}`;
  window.location.href = url;
};

// Get a number of commits for a specific user
// The official document is here https://docs.github.com/en/rest/reference/metrics#get-all-contributor-commit-activity
const useNumberOfCommits = (
  owner: string,
  repo: string,
  githubUserId: number,
  accessToken?: string
) => {
  // console.log(`githubUserId is: ${githubUserId}`);
  const url = `${base}/repos/${owner}/${repo}/stats/contributors`;
  if (owner === null || repo === null || githubUserId === 0) {
    return 0;
  }
  const headers = new Headers();
  headers.append('Accept', 'application/vnd.github.v3+json');
  accessToken && accessToken !== ''
    ? headers.append('Authorization', `token ${accessToken}`)
    : null;
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      headers: headers
    }).then((res) => res.json());
    // @ts-ignore
    const filteredResponse = response.filter((item) => {
      return item.author.id === githubUserId;
    });
    const output: number = filteredResponse[0].total;
    return output;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(url, fetcher, options);

  if (error) {
    // console.log(`Failed to load number of commits: ${error}`);
    return 0;
  } else if (!data) {
    // console.log('Loading number of commits...');
    return 0;
  } else {
    return data;
  }
};

// List pull requests
// The official document is here https://docs.github.com/en/rest/reference/pulls#list-pull-requests
const useNumberOfPullRequests = (
  owner: string,
  repo: string,
  githubUserId: number,
  accessToken?: string
) => {
  const params = {
    state: 'closed', // or "open", "all"
    per_page: '10', // max = 100
    page: '1'
  };
  let query = new URLSearchParams(params);
  const url = `${base}/repos/${owner}/${repo}/pulls?${query}`;
  if (owner === null || repo === null || githubUserId === 0) {
    return 0;
  }

  // use useSWR function in Next.js
  // The official document is here: https://swr.vercel.app/docs/data-fetching
  const headers = new Headers();
  headers.append('Accept', 'application/vnd.github.v3+json');
  accessToken && accessToken !== ''
    ? headers.append('Authorization', `token ${accessToken}`)
    : null;
  const fetcher = async (url: string) => {
    let count = 0;
    let totalCount = 0;
    let pageCount = 1;
    do {
      const response = await fetch(url, {
        headers: headers
      }).then((res) => res.json());
      // @ts-ignore
      const filteredResponse = response.filter((item) => {
        return item.user.id === githubUserId;
      });
      count = filteredResponse.length;
      totalCount += count;
      pageCount++;
      params.page = pageCount.toString();
      query = new URLSearchParams(params);
      url = `${base}/repos/${owner}/${repo}/pulls?${query}`;
    } while (count > 0);
    return totalCount;
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(url, fetcher, options);

  if (error) {
    // console.log(`Failed to load number of pull requests: ${error}`);
    return 0;
  } else if (!data) {
    // console.log('Loading number of pull requests...');
    return 0;
  } else {
    // console.log(data);
    return data;
  }
};

// Search for pull request data with reviewer
// The official document is here https://docs.github.com/en/rest/reference/search#search-issues-and-pull-requests
const useNumberOfReviews = (
  owner: string,
  repo: string,
  githubUserName: string,
  accessToken?: string
): number => {
  const params = {
    q: `is:pr repo:${owner}/${repo} reviewed-by:${githubUserName}`,
    per_page: '10', // max = 100
    page: '1'
  };
  const query = new URLSearchParams(params);
  const url = `${base}/search/issues?${query}`;
  // console.log(url);

  const headers = new Headers();
  headers.append('Accept', 'application/vnd.github.v3+json');
  accessToken && accessToken !== ''
    ? headers.append('Authorization', `token ${accessToken}`)
    : null;
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      headers: headers
    }).then((res) => res.json());
    return response.total_count;
  };

  const { data, error } = useSWR(url, fetcher, options);

  if (error) {
    // console.log(`Failed to load number of reviews: ${error}`);
    return 0;
  } else if (!data) {
    // console.log('Loading number of reviews...');
    return 0;
  } else {
    return data;
  }
};

export {
  useNumberOfCommits,
  useNumberOfPullRequests,
  useNumberOfReviews,
  requestGithubUserIdentity
};
