import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  access_token: string;
  scope: string;
  token_type: string;
};

// Exchange a code for an GitHub access token
// See https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
const GetGithubAccessToken = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const body = {
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    code: req.body.code
    // redirectUri: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI
  };
  const url = 'https://github.com/login/oauth/access_token';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log({ err });
      return err;
    });

  // This API responses with a JSON object containing the access token
  res.status(200).json(response);
};

export default GetGithubAccessToken;
