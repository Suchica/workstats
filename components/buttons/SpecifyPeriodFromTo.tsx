// import "flowbite";
// import Datepicker from '@themesberg/tailwind-datepicker/Datepicker';
// import DateRangePicker from "@themesberg/tailwind-datepicker/DateRangePicker";

const SpecifyPeriodFromTo = () => {
  // useEffect(() => {
  //   import("flowbite");
  //   import('@themesberg/flowbite');
  // }, []);

  return (
    <div className='flex px-3 py-1 mx-2 my-1 items-center'>
      <span className='text-slate-800 px-2'>From: </span>
      <div className='relative'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
          <svg
            className='w-5 h-5 text-gray-400 dark:text-gray-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        <input
          // datepicker
          disabled // Temporarily disabled
          type='text'
          className='bg-white text-gray-700 border border-gray-300 rounded-lg block w-44 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 px-2 py-1 pl-10'
          placeholder='mm/dd/yyyy'
        />
      </div>
      <span className='text-slate-800 px-2'>~ To: </span>
      <div className='relative'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
          <svg
            className='w-5 h-5 text-gray-400 dark:text-gray-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        <input
          // datepicker
          disabled // Temporarily disabled
          type='text'
          className='bg-white text-gray-700 border border-gray-300 rounded-lg block w-44 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 px-2 py-1 pl-10'
          placeholder='mm/dd/yyyy'
        />
      </div>
    </div>
  );
};

export default SpecifyPeriodFromTo;
