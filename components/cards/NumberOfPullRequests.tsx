import { useNumberOfPullRequests } from '../../services/githubServices.client';

interface PropTypes {
  githubOwnerName: string;
  githubRepoName: string;
  githubUserId: number;
  githubAccessToken: string;
}

const NumberOfPullRequests = ({
  githubOwnerName,
  githubRepoName,
  githubUserId,
  githubAccessToken
}: PropTypes) => {
  const data = useNumberOfPullRequests(
    githubOwnerName,
    githubRepoName,
    githubUserId,
    githubAccessToken
  );
  return (
    <div className='bg-white shadow rounded-lg p-4 hover:bg-slate-200'>
      <div className='flex space-x-4 items-center'>
        <div>
          <div className='bg-amber-50 rounded-full w-12 h-12 text-amber-400 flex justify-center items-center'>
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M19.7712 13.1046C20.7714 12.1044 21.3333 10.7478 21.3333 9.33333C21.3333 7.91885 20.7714 6.56229 19.7712 5.5621C18.771 4.5619 17.4145 4 16 4C14.5855 4 13.2289 4.5619 12.2288 5.5621C11.2286 6.56229 10.6667 7.91885 10.6667 9.33333C10.6667 10.7478 11.2286 12.1044 12.2288 13.1046C13.2289 14.1048 14.5855 14.6667 16 14.6667C17.4145 14.6667 18.771 14.1048 19.7712 13.1046Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9.40033 21.4003C11.1507 19.65 13.5246 18.6667 16 18.6667C18.4753 18.6667 20.8493 19.65 22.5997 21.4003C24.35 23.1507 25.3333 25.5246 25.3333 28H6.66666C6.66666 25.5246 7.64999 23.1507 9.40033 21.4003Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        <div>
          <div className='text-gray-400'># of pull reqs</div>
          <div className=' text-2xl font-bold text-gray-900'>{data} times</div>
        </div>
      </div>
    </div>
  );
};

export default NumberOfPullRequests;
