import useSWR from 'swr';

// HTTP endpoint v3 (REST API)
const base = 'https://api.github.com';
const options = {
  shouldRetryOnError: false,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
};

// Get a number of commits for a specific user
// The official document is here https://docs.github.com/en/rest/reference/metrics#get-all-contributor-commit-activity
const useNumberOfCommits = (
  owner: string,
  repo: string,
  githubUserId: number
) => {
  // console.log(`githubUserId is: ${githubUserId}`);
  const url = `${base}/repos/${owner}/${repo}/stats/contributors`;
  // console.log(url);
  const headers = new Headers();
  headers.append('Accept', 'application/vnd.github.v3+json');
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      headers: headers
    }).then((res) => res.json());
    // console.log(`response is: ${JSON.stringify(response)}`);
    // @ts-ignore
    const filteredResponse = response.filter((item) => {
      return item.author.id === githubUserId;
    });
    // console.log(filteredResponse);
    const output: number = filteredResponse[0].total;
    return output;
  };
  const { data, error } = useSWR(url, fetcher, options);

  if (error) {
    console.log(`Failed to load number of commits: ${error}`);
    return 0;
  } else if (!data) {
    console.log('Loading number of commits...');
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
  githubUserId: number
) => {
  const params = {
    state: 'closed', // or "open", "all"
    per_page: '10', // max = 100
    page: '1'
  };
  let query = new URLSearchParams(params);
  const url = `${base}/repos/${owner}/${repo}/pulls?${query}`;
  // console.log(url);

  // use useSWR function in Next.js
  // The official document is here: https://swr.vercel.app/docs/data-fetching
  const headers = new Headers();
  headers.append('Accept', 'application/vnd.github.v3+json');
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
      // console.log(`count is: ${count}`);
      // console.log(`totalCount is: ${totalCount}`);
      // console.log(`pageCount is: ${pageCount}`);
      // console.log(`params.page is: ${params.page}`);
      // console.log(`url is: ${url}`)
    } while (count > 0);
    return totalCount;
  };

  const { data, error } = useSWR(url, fetcher, options);

  if (error) {
    console.log(`Failed to load number of pull requests: ${error}`);
    return 0;
  } else if (!data) {
    console.log('Loading number of pull requests...');
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
  githubUserName: string
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
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      headers: headers
    }).then((res) => res.json());
    return response.total_count;
  };

  const { data, error } = useSWR(url, fetcher, options);

  if (error) {
    console.log(`Failed to load number of reviews: ${error}`);
    return 0;
  } else if (!data) {
    console.log('Loading number of reviews...');
    return 0;
  } else {
    return data;
  }
};

export { useNumberOfCommits, useNumberOfPullRequests, useNumberOfReviews };
