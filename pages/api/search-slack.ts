import type { NextApiRequest, NextApiResponse } from 'next';

// The official document is here: https://api.slack.com/methods/search.messages
// Rate limit is Tier 2: 20+ requests per minute.
const SearchSlack = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = `https://slack.com/api/search.messages?query=${req.body.searchQuery}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: req.body.slackAccessToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log({ err });
      return err;
    });
  res.status(200).json(response);
};

export default SearchSlack;
