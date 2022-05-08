// React and Next.js
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

// Images
import GitHubIcon2 from '../../public/github-svgrepo-com.svg';
import Top_Login from '../../public/help/Top_Login.png';
import DashboardWithInitialState from '../../public/help/Dashboard_GitHub_InitialState.png';
import DashboardWithGoToSettings from '../../public/help/Dashboard_GoToUserSettings.png';
import DashboardWithGitHubAggregated from '../../public/help/Dashboard_GitHubAggregated.png';
import UserSettingsWithGitHubInfo from '../../public/help/UserSettings_GitHubInfo.png';
import UserSettingsWithGitHubInfoFulfilled from '../../public/help/UserSettings_GitHubInfoFulfilled.png';
import UserSettingsWithGoToHome from '../../public/help/UserSettings_GoToHome.png';
import GitHubTopPage from '../../public/help/GitHub_TopPage.png';
import GitHubUserName from '../../public/help/GitHub_UserName.png';
import GitHubRepoTop from '../../public/help/GitHub_RepoTop.png';
import ChromeRequestGitHubAPI from '../../public/help/Chrome_RequestGitHubAPI.png';
import ChromeResponseGitHubAPI from '../../public/help/Chrome_ResponseGitHubAPI.png';

const HowToGetGitHubInfo = () => {
  return (
    <>
      <Head>
        <title>How to get GitHub Info - WorkStats</title>
        <meta name='description' content='WorkStats' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='px-5'>
        <div className='flex'>
          <h1 className='text-3xl py-4 pr-2'>How to get GitHub info</h1>
          <Image
            src={GitHubIcon2}
            width={32}
            height={32}
            layout='intrinsic'
            alt='GitHub logo'
            quality={75}
            priority={false}
            placeholder='empty'
          />
        </div>
        <h2 className='text-2xl py-4'>1. Your GitHub stats shows 0</h2>
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
          &apos;Coding - GitHub&apos;.
        </p>
        <div className='flex place-content-evenly place-items-center'>
          <div className='relative aspect-video w-2/3'>
            <Image
              src={DashboardWithGoToSettings}
              alt='User Settings links in the Dashboard'
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
              src={UserSettingsWithGitHubInfo}
              alt='User Settings with GitHub info'
              layout='fill'
              objectFit='contain'
              quality={75}
              priority={false}
              placeholder='empty'
            />
          </div>
        </div>
        <p className='py-1 pt-4'>
          Now you can see what GitHub settings are. There are several items
          below;
        </p>
        <ul className='py-1 pb-4 list-disc list-inside' role='list'>
          <li>User ID</li>
          <li>User Name</li>
          <li>Repo Owner Name (Repository Owner Name)</li>
          <li>Repo Name (Repository Name)</li>
          <li>Repo Visibility (Repository Visibility)</li>
        </ul>
        <h2 className='text-2xl py-4'>
          3. Go to{' '}
          <a
            className='py-1 text-blue-600'
            href='https://github.com/'
            target='_blank'
            rel='noreferrer noopener' // Must pair with target='_blank'
          >
            [GitHub Web Site]
          </a>
        </h2>
        <h3 className='text-xl pt-1 pb-4'>3-1. GitHub User Name</h3>
        <p className='py-1 pb-4'>
          After you signed in, you will be navigated to home screen. And you can
          see your user icon on the top right corner. Click it, then you can see
          your GitHub user name first.
        </p>
        <div className='flex place-content-evenly place-items-center'>
          <div className='relative aspect-video w-2/3'>
            <Image
              src={GitHubTopPage}
              alt='GitHub top page'
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
              src={GitHubUserName}
              alt='GitHub user name'
              layout='fill'
              objectFit='contain'
              quality={75}
              priority={false}
              placeholder='empty'
            />
          </div>
        </div>
        <h3 className='text-xl pt-4 pb-4'>3-2. GitHub User ID</h3>
        <p className='py-1 pb-4'>
          The easiest way to get a user ID is to call the API from your browser.
          Set{' '}
          <a
            className='py-1 text-blue-600'
            target='_blank'
            rel='noreferrer noopener' // Must pair with target='_blank'
          >
            https://api.github.com/users/$userName
          </a>{' '}
          (Replace $userName with your username) in the URL field of your
          browser and press Enter. You will get the following result, which will
          tell you your user ID
        </p>
        <div className='flex place-content-evenly place-items-center'>
          <div className='relative aspect-video w-2/3'>
            <Image
              src={ChromeRequestGitHubAPI}
              alt='GitHub API request'
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
              src={ChromeResponseGitHubAPI}
              alt='GitHub API response'
              layout='fill'
              objectFit='contain'
              quality={75}
              priority={false}
              placeholder='empty'
            />
          </div>
        </div>
        <h3 className='text-xl pt-4 pb-4'>
          3-3. GitHub Repo Name, its Owner Name and its Visibility
        </h3>
        <p className='py-1 pb-4'>
          Get a name of a repository owner to be aggregated. Go to the
          [Repository] and on the top left corner, you can see the repository
          name, its owner name, and its visibility as well.
        </p>
        <Image
          src={GitHubRepoTop}
          alt='GitHub repository top page'
          layout='intrinsic'
          quality={75}
          priority={false}
          placeholder='empty'
          className='w-full'
        />
        <p className='py-1 pt-4'>
          In this example, the info you get is as follows:
        </p>
        <ul className='py-1 list-disc list-inside' role='list'>
          <li>Repo Owner Name: vercel</li>
          <li>Repo Name: next.js</li>
          <li>Repo Visibility: Public</li>
        </ul>
        <p className='py-1 pb-4'>
          Regarding visibility, first letter should be capitalized.
        </p>
        <h2 className='text-2xl py-4'>4. Go back to [User Settings]</h2>
        <p className='py-1 pb-4'>
          Now that you are all set up, go back to the User Settings screen and
          set those values.
        </p>
        <div className='flex place-content-evenly place-items-center'>
          <div className='relative aspect-video w-2/3'>
            <Image
              src={UserSettingsWithGitHubInfo}
              alt='User Settings with GitHub info'
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
              src={UserSettingsWithGitHubInfoFulfilled}
              alt='User Settings with GitHub info fulfilled'
              layout='fill'
              objectFit='contain'
              quality={75}
              priority={false}
              placeholder='empty'
            />
          </div>
        </div>
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
              alt='User Settings with go to home'
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
              src={DashboardWithGitHubAggregated}
              alt='Dashboard with GitHub aggregated'
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

export default HowToGetGitHubInfo;
