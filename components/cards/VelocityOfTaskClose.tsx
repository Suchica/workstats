interface PropTypes {
  number: number;
}

const VelocityOfTaskClose = ({ number }: PropTypes) => {
  return (
    <div className='bg-white shadow rounded-lg p-3 md:p-4 hover:bg-slate-200'>
      <div className='flex space-x-4 items-center'>
        <div>
          <div className='bg-pink-50 rounded-full w-5 h-5 md:w-12 md:h-12 text-pink-400 flex justify-center items-center'>
            <svg
              width='30px'
              height='30px'
              viewBox='0 0 24 24'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              aria-labelledby='timeIconTitle'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              fill='none'
              color='currentColor'
            >
              <circle cx='12' cy='12' r='10' />
              <polyline points='12 5 12 12 16 16' />
            </svg>
          </div>
        </div>
        <div>
          <div className='text-gray-400 text-sm md:text-base'>
            Vel. of cls. tasks
          </div>
          <div className='hidden md:contents md:text-2xl md:font-bold md:text-gray-900'>
            {number ? number : 0} <span className='md:text-xl'>times/wk</span>
          </div>
        </div>
      </div>
      <div className='md:hidden text-xl font-bold text-gray-900'>
        {number ? number : 0} times/wk
      </div>
    </div>
  );
};

export default VelocityOfTaskClose;
