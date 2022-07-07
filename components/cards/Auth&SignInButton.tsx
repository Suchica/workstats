import { handleAuthClick } from '../../services/googleCalendar.client';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleAuthButton = () => {
  return (
    <button
      className='animate-pulse bg-amber-200 shadow rounded-lg p-4'
      onClick={() => {
        console.log('clicked');
        handleAuthClick();
      }}
    >
      <div className='flex space-x-4 items-center'>
        <div>
          <div className='bg-blue-50 rounded-full w-12 h-12 text-blue-400 flex justify-center items-center'>
            <GoogleIcon />
          </div>
        </div>
        <div>
          <div className='text-gray-400'>Google Calendar</div>
          <div className=' text-2xl font-bold text-gray-900'>Authorize</div>
        </div>
      </div>
    </button>
  );
};

export default GoogleAuthButton;
