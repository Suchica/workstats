// React and Next.js
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

// Images
import AsanaIcon from '../../public/asana-svgrepo-com.svg';
// import NoImage from '../../public/noImageWith16-9.png';
import Top_Login from '../../public/help/Top_Login.png';
import DashboardWithInitialState from '../../public/help/Dashboard_GitHub_InitialState.png';
import DashboardWithGoToSettings from '../../public/help/Dashboard_GoToUserSettings_Asana.png';
import UserSettingsWithAsanaInfo from '../../public/help/UserSettings_AsanaInfo.png';
import ChromeRequestAsanaAPI from '../../public/help/Chrome_RequestAsanaAPI.png';
import ChromeResponseAsanaAPI from '../../public/help/Chrome_ResponseAsanaAPI.png';
import ChromeResponseAsanaWorkspaceAPI from '../../public/help/Chrome_ResponseAsanaWorkspaceAPIWithRed.png';
import AsanaTop from '../../public/help/Chrome_AsanaTopWithRed.png';
import ASanaDevConsoleTop from '../../public/help/Asana_DeveloperConsole_CreateToken.png';
import UserSettingsWithAsanaInfoFulfilled from '../../public/help/UserSettings_AsanaInfoFulfilled.png';
import UserSettingsWithGoToHome from '../../public/help/UserSettings_GoToHome.png';
import DashboardWithAsanaAggregated from '../../public/help/Dashboard_AsanaAggregatedWithRed.png';

const HowToGetAsanaInfo = () => {
  return (
    <>
      <Head>
        <title>How to get Asana Info - WorkStats</title>
        <meta
          name='description'
          content='This help page explains the settings required to aggregate numbers from Asana in WorkStats and how to configure them'
        />
        <link rel='icon' href='/icononly_transparent_nobuffer.ico' />
      </Head>
      <main className='px-5'>
        <div className='flex'>
          <h1 className='text-3xl py-4'>How to get Asana info</h1>
          <Image
            src={AsanaIcon}
            width={60}
            height={32}
            layout='intrinsic'
            alt='Asana logo'
            quality={75}
            priority={false}
            placeholder='empty'
          />
        </div>
        <h2 className='text-2xl py-4'>1. Your Asana stats shows 0</h2>
        <p className='py-1 pb-4'>
          After you signed in, you will be navigated to home dashboard screen
          and then you can see your stats which shows 0.
        </p>
        <div className='flex place-content-evenly place-items-center'>
          <div className='relative aspect-video w-2/3'>
            <Image
              src={Top_Login}
              alt='Log in screen'
              layout='fill'
              objectFit='contain'
              quality={75}
              priority={false}
              placeholder='empty'
            />
          </div>
          <div className='px-3'>{'=>'}</div>
          <div className='relative aspect-video w-2/3'>
            <Image
              src={DashboardWithInitialState}
              alt='Dashboard with an initial state'
              layout='fill'
              objectFit='contain'
              quality={75}
              priority={false}
              placeholder='empty'
            />
          </div>
        </div>
        <h2 className='text-2xl py-4'>2. Go to [User Settings]</h2>
        <p className='py-1 pb-4'>
          Go to [User Settings] in the left sidebar or the gear icon beside
          &apos;Task Ticket - Asana&apos;.
        </p>
        <div className='flex place-content-evenly place-items-center'>
          <div className='relative aspect-video w-2/3'>
            <Image
              src={DashboardWithGoToSettings}
              alt='Go to user settings'
              layout='fill'
              objectFit='contain'
              quality={75}
              priority={false}
              placeholder='empty'
            />
          </div>
          <div className='px-3'>{'=>'}</div>
          <div className='relative aspect-video w-2/3'>
            <Image
              src={UserSettingsWithAsanaInfo}
              alt='User settings with Asana info'
              layout='fill'
              objectFit='contain'
              quality={75}
              priority={false}
              placeholder='empty'
            />
          </div>
        </div>
        <p className='py-1 pt-4'>
          Now you can see what Asana settings are. There are several items
          below;
        </p>
        <ul className='py-1 pb-4 list-disc list-inside' role='list'>
          <li>User ID</li>
          <li>Workspace ID</li>
          <li>Workspace Name</li>
          <li>Personal Access Token</li>
        </ul>
        <h3 className='text-xl py-4'>2-1. Asana User ID</h3>
        <p className='py-1 pb-4'>
          While logged into Asana in your browser, click here:{' '}
          <a
            className='py-1 text-blue-600'
            href='https://app.asana.com/api/1.0/users'
            target='_blank'
            rel='noreferrer noopener' // Must pair with target='_blank'
          >
            Asana Users API
          </a>{' '}
          That should display some information including your User ID. At the
          time of writing of this help page, there seems to be no way to check
          your user ID from either the desktop application or the browser other
          than calling this API.
        </p>
        <Image
          src={ChromeRequestAsanaAPI}
          alt='Asana API request'
          layout='intrinsic'
          quality={75}
          priority={false}
          placeholder='empty'
          className='w-full'
        />
        <p className='py-1 pb-4'>
          Then the response would be like here below. You can see your username
          then find your user ID.
        </p>
        <Image
          src={ChromeResponseAsanaAPI}
          alt='Asana API response'
          layout='intrinsic'
          quality={75}
          priority={false}
          placeholder='empty'
          className='w-full'
        />
        <h3 className='text-xl py-4'>2-2. Asana Workspace ID</h3>
        <p className='py-1 pb-4'>
          As for Asana&apos;s workspace ID, you can check it from the URL of
          your browser. Go to the top screen of the workspace you wish to
          aggregate.
        </p>
        <Image
          src={AsanaTop}
          alt='Asana top screen'
          layout='intrinsic'
          quality={75}
          priority={false}
          placeholder='empty'
          className='w-full'
        />
        <p className='py-5'>
          Or call the{' '}
          <a
            className='py-1 text-blue-600'
            href='https://app.asana.com/api/1.0/workspaces'
            target='_blank'
            rel='noreferrer noopener' // Must pair with target='_blank'
          >
            Asana Workspace API
          </a>{' '}
          to display a list of workspaces, as well as user IDs. Either method is
          acceptable. Now you can see your workspace ID and name.
        </p>
        <Image
          src={ChromeResponseAsanaWorkspaceAPI}
          alt='Asana workspace API response'
          layout='intrinsic'
          quality={75}
          priority={false}
          placeholder='empty'
          className='w-full'
        />
        <h3 className='text-xl py-4'>2-3. Asana Personal Access Token</h3>
        <p className='py-1 pb-4'>
          The Asana API is used to aggregate numbers from the Asana application.
          At the time of writing, the following two authentication methods are
          available for using this API.
          <ul className='py-3 list-disc list-inside' role='list'>
            <li>Personal access token</li>
            <li>OAuth 2.0</li>
          </ul>
          The former is used to call apps and APIs created by users themselves,
          and the latter is used by third-party apps such as this app to obtain
          information on behalf of users. For more information, please refer to
          the link on{' '}
          <a
            className='py-1 text-blue-600'
            href='https://developers.asana.com/docs/authentication'
            target='_blank'
            rel='noreferrer noopener' // Must pair with target='_blank'
          >
            Asana official website
          </a>{' '}
          . In the future, we plan to change the format of this application to
          call APIs using the latter OAuth 2.0, but at this time, please note
          that the API calls are made using personal access tokens.
        </p>
        <p className='py-1 pb-4'>
          Now that you understand the above, let&apos;s actually get your
          personal access token. You can use the link{' '}
          <a
            className='py-1 text-blue-600'
            href='https://app.asana.com/0/developer-console'
            target='_blank'
            rel='noreferrer noopener' // Must pair with target='_blank'
          >
            here
          </a>{' '}
          to access your developer console or follow the steps below:
          <ul className='py-3 list-disc list-inside' role='list'>
            <li>Click your profile photo from the topbar</li>
            <li>Select My Settings</li>
            <li>Open the Apps tab</li>
            <li>Click Manage Developer Apps</li>
            <li>Click + New Access Token</li>
          </ul>
          Then you can find a button to generate your personal access token.
        </p>
        <Image
          src={ASanaDevConsoleTop}
          alt='Asana developer console'
          layout='intrinsic'
          quality={75}
          priority={false}
          placeholder='empty'
          className='w-full'
        />
        <h2 className='text-2xl py-4'>3. Go back to [User Settings]</h2>
        <p className='py-1 pb-4'>
          Now that you are all set up, go back to the User Settings screen and
          set those values.
        </p>
        <Image
          src={UserSettingsWithAsanaInfoFulfilled}
          alt='User settings with Asana info filled'
          layout='intrinsic'
          quality={75}
          priority={false}
          placeholder='empty'
          className='w-full'
        />
        <h2 className='text-2xl py-4'>
          5. Go to [Home] and then you can see your stats !!
        </h2>
        <p className='py-1 pb-4'>
          Press the Home button on the left sidebar to jump to the dashboard
          screen. You should see a tally of your contributions to your given
          repository.
        </p>
        <p className='py-1 pb-4'>
          If it is not tallying well, try reloading it several times. Or, check
          again to make sure the values you set are correct. If it still does
          not work, please contact{' '}
          <a
            className='py-1 text-blue-600'
            href='mailto: info@suchica.com'
            target='_blank'
            rel='noreferrer noopener' // Must pair with target='_blank'
          >
            our help desk{' '}
          </a>
          .
        </p>
        <div className='flex place-content-evenly place-items-center'>
          <div className='relative aspect-video w-2/3'>
            <Image
              src={UserSettingsWithGoToHome}
              alt='Go to home button in user settings'
              layout='fill'
              objectFit='contain'
              quality={75}
              priority={false}
              placeholder='empty'
            />
          </div>
          <div className='px-3'>{'=>'}</div>
          <div className='relative aspect-video w-2/3'>
            <Image
              src={DashboardWithAsanaAggregated}
              alt='Dashboard with Asana aggregated'
              layout='fill'
              objectFit='contain'
              quality={75}
              priority={false}
              placeholder='empty'
            />
          </div>
        </div>
        <div className='h-20'></div>
      </main>
    </>
  );
};

export default HowToGetAsanaInfo;
