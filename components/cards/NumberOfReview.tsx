import { useNumberOfReviews } from '../../services/githubServices.client';

interface PropTypes {
  githubOwnerName: string;
  githubRepoName: string;
  githubUserName: string;
  githubAccessToken: string;
}

const NumberOfReviews = ({
  githubOwnerName,
  githubRepoName,
  githubUserName,
  githubAccessToken
}: PropTypes) => {
  const data = useNumberOfReviews(
    githubOwnerName,
    githubRepoName,
    githubUserName,
    githubAccessToken
  );
  // console.log(`data is: ${data}`);
  return (
    <div className='bg-white shadow rounded-lg p-4 hover:bg-slate-200'>
      <div className='flex space-x-4 items-center'>
        <div>
          <div className='bg-violet-50 rounded-full w-12 h-12 text-violet-400 flex justify-center items-center'>
            <svg
              width='32'
              height='32'
              viewBox='0 0 480 480'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M480.6,296.133L416,91.033c-9.1-29.9-40.9-46.8-70.8-37.7c-7.1,2.2-11.2,9.7-9,16.8s9.7,11.2,16.8,9
                c15.7-4.8,32.3,4.1,37.1,19.8v0.1l46.2,146.9c-14.7-8.3-31.6-13-49.6-13c-51.8,0-94.6,39.2-100.4,89.4h-85
                c-6.6-49.4-49-87.6-100.2-87.6c-18.1,0-35.1,4.8-49.8,13.1l46.8-148.8v-0.1c4.8-15.7,21.4-24.6,37.1-19.8c7.1,2.2,14.7-1.9,16.8-9
                c2.2-7.1-1.9-14.7-9-16.8c-29.9-9.1-61.6,7.8-70.8,37.7l-64.4,205.3c-0.2,0.6-0.3,1.1-0.4,1.7c-4.7,11.7-7.4,24.5-7.4,37.8
                c0,55.7,45.4,101.1,101.1,101.1c51.2,0,93.6-38.2,100.2-87.6h85.5c7.4,48.5,49.4,85.8,99.9,85.8c55.7,0,101.1-45.4,101.1-101.1
                C487.9,320.633,485.3,307.833,480.6,296.133z M101.2,409.933c-40.9,0-74.1-33.2-74.1-74.1s33.2-74.1,74.1-74.1s74.1,33.2,74.1,74.1
                S142,409.933,101.2,409.933z M386.8,408.133c-40.9,0-74.1-33.2-74.1-74.1s33.3-74.1,74.1-74.1s74.1,33.2,74.1,74.1
                S427.7,408.133,386.8,408.133z'
                stroke='currentColor'
                strokeWidth='4'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        <div>
          <div className='text-gray-400'># of reviews</div>
          <div className=' text-2xl font-bold text-gray-900'>{data} times</div>
        </div>
      </div>
    </div>
  );
};

export default NumberOfReviews;
