const TotalTimeOfMeetings = () => {
  return (
    <div className='bg-white shadow rounded-lg p-3 md:p-4 hover:bg-slate-200'>
      <div className='flex space-x-4 items-center'>
        <div>
          <div className='bg-lime-50 rounded-full w-5 h-5 md:w-12 md:h-12 text-lime-400 flex justify-center items-center'>
            <svg
              width='26'
              height='26'
              viewBox='0 0 480 480'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M443.089,106.198c-15.556-22.846-34.675-42.665-56.555-58.825h49.553v-30H314.538v122.244h30V56.048
                  C412.319,93.057,455,163.972,455,242.5C455,359.673,359.673,455,242.5,455S30,359.673,30,242.5S125.327,30,242.5,30
                  c5.257,0,10.617,0.2,15.93,0.593l2.215-29.918C254.598,0.227,248.493,0,242.5,0C177.726,0,116.829,25.225,71.027,71.026
                  C25.225,116.829,0,177.726,0,242.5c0,64.774,25.225,125.671,71.027,171.473S177.726,485,242.5,485
                  c64.774,0,125.671-25.225,171.474-71.027C459.775,368.171,485,307.274,485,242.5C485,193.601,470.507,146.468,443.089,106.198z'
                stroke='currentColor '
                strokeWidth='8'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <polygon points='227.5,227.5 85.003,227.5 85.003,257.5 257.5,257.5 257.5,85.256 227.5,85.256' />
            </svg>
          </div>
        </div>
        <div>
          <div className='text-gray-400 text-sm md:text-base'>
            Ttl time of mtgs
          </div>
          <div className='hidden md:contents md:text-2xl md:font-bold md:text-gray-900'>
            123 hours
          </div>
        </div>
      </div>
      <div className='md:hidden text-xl font-bold text-gray-900'>123 hours</div>
    </div>
  );
};
export default TotalTimeOfMeetings;
