import Link from 'next/link';
import React from 'react';

interface QuestionMarkType {
  mt: number;
  mb: number;
}

const QuestionMark = ({ mt, mb }: QuestionMarkType) => {
  return (
    <Link href='/help/how-to-get-github-info' passHref={true}>
      {/* Instead of opening a separate tab, it's too slow and doesn't take advantage of Next's good features. */}
      <a target='_blank' className=''>
        <button
          className={`rounded-full text-center text-base font-semibold text-white bg-sky-500 w-6 h-6 mt-${mt} mb-${mb} ml-3 pb-6`}
        >
          ?
        </button>
      </a>
    </Link>
  );
};

export default QuestionMark;
