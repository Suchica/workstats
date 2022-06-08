import { useNumberOfTasks } from '../../services/asanaServices.client';
// @ts-ignore
const NumberOfCloseTasks = ({
  // @ts-ignore
  asanaWorkspaceId,
  // @ts-ignore
  asanaUserId,
  // @ts-ignore
  asanaPersonalAccessToken
}) => {
  const numberOfTasks = useNumberOfTasks(
    asanaPersonalAccessToken,
    asanaWorkspaceId,
    asanaUserId
  );
  return (
    <div className='bg-white shadow rounded-lg p-3 md:p-4 hover:bg-slate-200'>
      <div className='flex space-x-4 items-center'>
        <div>
          <div className='bg-cyan-50 rounded-full w-5 h-5 md:w-12 md:h-12 text-cyan-400 flex justify-center items-center'>
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8.52325 6.61231C10.2911 5.20443 12.4206 4.32434 14.6667 4.07333V17.3333H27.9267C27.6757 19.5794 26.7956 21.7089 25.3877 23.4767C23.9798 25.2446 22.1013 26.5791 19.9685 27.3265C17.8357 28.0739 15.5351 28.2039 13.3317 27.7015C11.1282 27.1991 9.11142 26.0847 7.51336 24.4866C5.91529 22.8886 4.80094 20.8718 4.29854 18.6683C3.79614 16.4649 3.92612 14.1643 4.67352 12.0315C5.42092 9.89866 6.75535 8.0202 8.52325 6.61231Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M20 12H27.3173C26.7188 10.3128 25.7513 8.78047 24.4854 7.5146C23.2195 6.24873 21.6872 5.28125 20 4.68268V12Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        <div>
          <div className='text-gray-400 text-sm md:text-base'>
            # of close tasks
          </div>
          <div className='hidden md:contents md:text-2xl md:font-bold md:text-gray-900'>
            {/* @ts-ignore */}
            {numberOfTasks?.numberOfClosed
              ? // @ts-ignore
                numberOfTasks?.numberOfClosed
              : 0}{' '}
            times
          </div>
        </div>
      </div>
      <div className='md:hidden text-xl font-bold text-gray-900'>
        {/* @ts-ignore */}
        {numberOfTasks?.numberOfClosed
          ? // @ts-ignore
            numberOfTasks?.numberOfClosed
          : 0}{' '}
        times
      </div>
    </div>
  );
};

export default NumberOfCloseTasks;
