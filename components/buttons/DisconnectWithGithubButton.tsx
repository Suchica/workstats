import React from 'react';
import { handleSubmitGithubAccessToken } from '../../services/setDocToFirestore';

interface PropTypes {
  label?: string;
  uid: string;
}

const DisconnectWithGithubButton = ({ label = 'Submit', uid }: PropTypes) => {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const url = `https://github.com/settings/connections/applications/${clientId}`;
  return (
    <button
      className='w-auto h-7 bg-red-600 hover:bg-red-700 text-white font-semibold px-3 ml-3 mt-9 rounded-lg inline-block align-middle'
      onClick={() => {
        handleSubmitGithubAccessToken(uid, '');
        window.open(url, '_blank');
      }}
    >
      {label}
    </button>
  );
};

export default DisconnectWithGithubButton;
