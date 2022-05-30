import React from 'react';
import { requestGithubUserIdentity } from '../../services/githubServices.client';

interface PropTypes {
  label?: string;
}

const ConnectWithGithubButton = ({ label = 'Submit' }: PropTypes) => {
  return (
    <button
      className='w-auto h-7 bg-green-600 hover:bg-green-700 text-white font-semibold px-3 ml-3 mt-9 rounded-lg inline-block align-middle'
      onClick={requestGithubUserIdentity}
    >
      {label}
    </button>
  );
};

export default ConnectWithGithubButton;
