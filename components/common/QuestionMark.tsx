import Link from 'next/link';
import React from 'react';

interface QuestionMarkType {
  mt: number;
  mb: number;
  href: string;
}

const QuestionMark = ({ mt, mb, href }: QuestionMarkType) => {
  return (
    <Link href={href} passHref={true}>
      {/* Instead of opening a separate tab, it's too slow and doesn't take advantage of Next's good features. */}
      <a target='_blank' className=''>
        <button
          className={`rounded-full text-center text-sm font-semibold text-blue-100 hover:text-white bg-gray-700 hover:bg-gray-600 w-5 h-5 mt-${mt} mb-${mb} ml-2`}
        >
          ?
        </button>
      </a>
    </Link>
  );
};

export default QuestionMark;
