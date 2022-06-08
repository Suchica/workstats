// import PropTypes from "prop-types";

// @ts-ignore
const NumberOfMeetings = ({ data }) => {
  return (
    <div className='bg-white shadow rounded-lg p-3 md:p-4 hover:bg-slate-200'>
      <div className='flex space-x-4 items-center'>
        <div>
          <div className='bg-indigo-50 rounded-full w-5 h-5 md:w-12 md:h-12 text-indigo-400 flex justify-center items-center'>
            <svg
              width='26'
              height='26'
              viewBox='0 0 420 430'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M293.333,45V20h-30v25H161.667V20h-30v25H0v360h316.213L425,296.213V45H293.333z M131.667,75v25h30V75h101.667v20h30V75
                  H395v50H30V75H131.667z M30,155h365v120H295v100H30V155z M373.787,305L325,353.787V305H373.787z'
                stroke='currentColor '
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        <div>
          <div className='text-gray-400 text-sm md:text-base'>
            # of meetings
          </div>
          <div className='hidden md:contents md:text-2xl md:font-bold md:text-gray-900'>
            {data} times
          </div>
        </div>
      </div>
      <div className='md:hidden text-xl font-bold text-gray-900'>
        {data} times
      </div>
    </div>
  );
};

// NumberOfMeetings.propTypes = {
//   data: PropTypes.number,
// };

export default NumberOfMeetings;
