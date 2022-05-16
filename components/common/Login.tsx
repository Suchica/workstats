// firebase related
import {
  linkWithPopup,
  // GithubAuthProvider,
  // GoogleAuthProvider,
  signInWithPopup
} from '@firebase/auth';
import {
  auth,
  githubProvider,
  googleProvider
} from '../../config/firebaseClient';

// styles
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';
import AsanaIcon from '../../public/asana-svgrepo-com.svg';
import SlackIcon from '../../public/slack-svgrepo-com.svg';
import GoogleCalendarIcon from '../../public/google-calendar-svgrepo-com.svg';
import GitHubIcon2 from '../../public/github-svgrepo-com.svg';

// Custom services
import { createUserDoc } from '../../services/setUserDocToFirestore';

// Scopes in detail: https://developers.google.com/identity/protocols/oauth2/scopes#calendar
const scopes = 'https://www.googleapis.com/auth/calendar.readonly	';
googleProvider.addScope(scopes);

const Login = () => {
  // google login handler
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // console.log('result is: ', result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log('credential is: ', credential);
        const user = result.user;
        // console.log('user is: ', user);
        createUserDoc(user.uid);
        window.location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          // OAuth providers are only available for Google and GitHub, so if this error occurs at Google, sign in at GitHub.
          signInWithPopup(auth, githubProvider).then(() => {
            if (auth.currentUser) {
              // Link a Google account to a GitHub account
              linkWithPopup(auth.currentUser, googleProvider);
            }
          });
        } else {
          // window.location.reload();
          console.log('error is: ', error);
        }
      });
  };

  // github login handler
  const loginWithGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // console.log('result is: ', result);
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // console.log('credential is: ', credential);
        const user = result.user;
        // console.log('user is: ', user);
        createUserDoc(user.uid);
        window.location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          // OAuth providers are only available for Google and GitHub, so if this error occurs at GitHub, sign in at Google.
          signInWithPopup(auth, googleProvider).then(() => {
            if (auth.currentUser) {
              // Link a Github account to a Google account
              linkWithPopup(auth.currentUser, githubProvider);
            }
          });
        } else {
          // window.location.reload();
          console.log('error is: ', error);
        }
      });
  };

  return (
    <div className='flex'>
      <div className='grid gap-4 w-1/2 h-screen bg-white content-center justify-center justify-items-center'>
        <p className='text-xl text-slate-900'>Log in with OAuth provider</p>
        <button
          className='text-white bg-blue-600 hover:bg-blue-800 font-bold rounded-md w-52 h-10'
          onClick={loginWithGoogle}
        >
          <GoogleIcon className='text-white mr-2' />
          Login with Google
        </button>
        <button
          className='text-white bg-gray-600 hover:bg-gray-800 font-bold rounded-md w-52 h-10'
          onClick={loginWithGithub}
        >
          <GitHubIcon className='text-white mr-2' />
          Login with GitHub
        </button>
      </div>
      <div className='grid gap-6 w-1/2 h-screen bg-slate-800 content-center justify-center justify-items-center'>
        <h1 className='text-white text-5xl text-center'>
          Welcome to &quot;WorkStats&quot;
        </h1>
        <p className='text-white text-2xl text-center'>
          This app visualizes contribution of you and your team in numbers!
        </p>
        <p className='text-white text-2xl text-center'>
          Aggregate from the following services.
        </p>
        <div className='flex gap-3'>
          <Image
            src={GitHubIcon2}
            width={30}
            height={30}
            layout='intrinsic'
            alt='GitHub logo'
            quality={75}
            priority={false}
            placeholder='empty'
          />
          <Image
            src={AsanaIcon}
            width={30}
            height={30}
            layout='intrinsic'
            alt='Asana logo'
            quality={75}
            priority={false}
            placeholder='empty'
          />
          <Image
            src={SlackIcon}
            width={30}
            height={30}
            layout='intrinsic'
            alt='Slack logo'
            quality={75}
            priority={false}
            placeholder='empty'
          />
          <Image
            src={GoogleCalendarIcon}
            width={30}
            height={30}
            layout='intrinsic'
            alt='Google Calendar logo'
            quality={75}
            priority={false}
            placeholder='empty'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
