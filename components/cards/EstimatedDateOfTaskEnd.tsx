interface PropTypes {
  date: string;
}

const EstimatedDateOfCompletion = ({ date }: PropTypes) => {
  return (
    <div className='bg-white shadow rounded-lg p-3 md:p-4 hover:bg-slate-200'>
      <div className='flex space-x-4 items-center'>
        <div>
          <div className='bg-purple-50 rounded-full w-5 h-5 md:w-12 md:h-12 text-purple-400 flex justify-center items-center'>
            <svg
              width='32px'
              height='32px'
              viewBox='0 0 48 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='48' height='48' fill='white' fillOpacity='0.01' />
              <path
                d='M43 11L16.875 37L5 25.1818'
                stroke='currentColor'
                strokeWidth='5'
                strokeLinecap='round'
                strokeLinejoin='round'
                fill='none'
                color='currentColor'
              />
            </svg>
          </div>
        </div>
        <div>
          <div className='text-gray-400 text-sm md:text-base'>
            Est. cmpl. date
          </div>
          <div className='hidden md:contents md:text-2xl md:font-bold md:text-gray-900'>
            {date ? date : '--'}
          </div>
        </div>
      </div>
      <div className='md:hidden text-xl font-bold text-gray-900'>
        {date ? date : '--'}
      </div>
    </div>
  );
};

export default EstimatedDateOfCompletion;
