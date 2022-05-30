import React from 'react';

interface PropTypes {
  label?: string;
}

const SubmitButton = ({ label = 'Submit' }: PropTypes) => {
  return (
    <button
      type='submit'
      className='w-auto h-8 bg-gray-800 text-blue-100 hover:bg-gray-700 hover:text-white font-semibold py-1 px-3 mt-9 rounded-lg'
    >
      {label}
    </button>
  );
};

export default SubmitButton;
