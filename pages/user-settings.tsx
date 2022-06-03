// Next.js and React related
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import nookies from 'nookies';

// Components and Services
import Avatar from '../components/common/Avatar';
import InputBox from '../components/boxes/InputBox';
import SubmitButton from '../components/buttons/SubmitButton';
import { UserType } from '../config/firebaseTypes';
import { verifyIdToken } from '../firebaseAdmin';
import getAUserDoc from '../services/getAUserDocFromFirebase';
import {
  handleSubmitBasicInfo,
  handleSubmitCommunicationActivity,
  handleSubmitGithubAccessToken,
  handleSubmitSourceCode,
  handleSubmitTaskTicket
} from '../services/setDocToFirestore';
import QuestionMark from '../components/common/QuestionMark';
import NewTabIcon from '../public/new-tab-svgrepo-com.svg';
import ConnectWithGithubButton from '../components/buttons/ConnectWithGithub';
import DisconnectWithGithubButton from '../components/buttons/DisconnectWithGithubButton';

interface UserSettingsProps {
  uid: string;
  userDoc: UserType | null;
  isGithubAuthenticated: boolean;
}

const useUserSettings = ({
  uid,
  userDoc,
  isGithubAuthenticated
}: UserSettingsProps) => {
  // If a user click 'Connect with GitHub' button to agree to authenticate WorkStats with GitHub scopes, a code will be passed to the redirect URL.
  const htmlParams = window.location.search;
  const code = htmlParams.startsWith('?code=')
    ? htmlParams.split(/[=&]+/)[1] // split by '=' or '&'
    : undefined;

  // If code is defined and isGithubAuthenticatedState is false, call /api/get-github-access-token to exchange the code for a GitHub access token
  const [isGithubAuthenticatedState, setIsGithubAuthenticatedState] = useState(
    isGithubAuthenticated
  );
  const [githubAccessToken, setGithubAccessToken] = useState('');
  useEffect(() => {
    if (code && !isGithubAuthenticatedState) {
      const url = '/api/get-github-access-token';
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      const body = {
        code: code
      };
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((res) => {
          setGithubAccessToken(res.access_token);
        });
    }
  }, [code, isGithubAuthenticatedState]);

  // If githubAccessToken is defined and isGithubAuthenticatedState is false, update/insert the access token to Firestore
  useEffect(() => {
    if (githubAccessToken && !isGithubAuthenticatedState) {
      handleSubmitGithubAccessToken(uid, githubAccessToken);
      setIsGithubAuthenticatedState(true);
    }
  }, [githubAccessToken, isGithubAuthenticatedState, uid]);

  return (
    <>
      <Head>
        <title>User Settings - WorkStats</title>
        <meta
          name='description'
          content='This is the user settings page. You can set the users basic information, GitHub aggregation information, Asana aggregation information, Slack aggregation information, etc. You can also unsubscribe from this page.'
        />
        <link rel='icon' href='/icononly_transparent_nobuffer.ico' />
      </Head>
      <div className='flex'>
        <div className='grid justify-items-center mt-5'>
          <Avatar userId={uid} />
          <button
            // type="submit"
            className='text-blue-500 hover:underline hover:underline-offset-4'
            onClick={() => {
              console.log('Change icon button was clicked');
            }}
          >
            Change
          </button>
        </div>
        <div className='w-full'>
          <h2 className='text-xl mt-8 mb-2 ml-6 underline underline-offset-4'>
            Basic Information
          </h2>
          <form
            name='basic-info'
            onSubmit={(e) => handleSubmitBasicInfo(e, uid)}
            method='post'
            target='_self'
            autoComplete='off'
            className='flex flex-wrap'
          >
            <InputBox
              label={'First Name'}
              name={'firstName'}
              placeholder={'Oliver'}
              width={32}
              value={userDoc?.firstName}
            />
            <InputBox
              label={'Middle Name'}
              name={'middleName'}
              placeholder={'Alan'}
              width={36}
              value={userDoc?.middleName}
            />
            <InputBox
              label={'Last Name'}
              name={'lastName'}
              placeholder={'Smith'}
              width={36}
              value={userDoc?.lastName}
            />
            <InputBox
              label={'Department'}
              name={'department'}
              placeholder={'IT & Development'}
              width={96}
              value={userDoc?.department}
            />
            <InputBox
              label={'Rank'}
              name={'rank'}
              placeholder={'Director'}
              width={36}
              value={userDoc?.rank}
            />
            <InputBox
              label={'Supervisor'}
              name={'supervisor'}
              placeholder={'A name here'}
              width={36}
              value={userDoc?.supervisor}
            />
            <InputBox
              label={'Assessor'}
              name={'assessor'}
              placeholder={'A name here'}
              width={36}
              value={userDoc?.assessor}
            />
            <InputBox
              label={'Assigned Project'}
              name={'assignedPj'}
              placeholder={'New Business Development'}
              width={96}
              value={userDoc?.assignedPj}
            />
            <InputBox
              label={'Role'}
              name={'role'}
              placeholder={'Product Manager'}
              width={36}
              value={userDoc?.role}
            />
            <SubmitButton />
          </form>
        </div>
      </div>
      <div className='flex'>
        <h2 className='text-xl mt-8 mb-2 ml-6 underline underline-offset-4'>
          Source Code / GitHub
        </h2>
        <QuestionMark mt={9} mb={1} href='/help/how-to-get-github-info' />
        {isGithubAuthenticatedState ? (
          <DisconnectWithGithubButton
            label='Disconnect with GitHub'
            uid={uid}
          />
        ) : (
          <ConnectWithGithubButton label='Connect with GitHub' />
        )}
      </div>
      <form
        name='source-code'
        onSubmit={(e) => handleSubmitSourceCode(e, uid)}
        method='post'
        target='_self'
        autoComplete='off'
      >
        <div className='flex flex-wrap items-center'>
          <div className='ml-6 w-28'></div>
          <InputBox
            label={'User ID'}
            name={'githubUserId'}
            inputType={'number'}
            placeholder={'4620828'}
            width={36}
            value={userDoc?.github?.userId}
          />
          <InputBox
            label={'User Name'}
            name={'githubUserName'}
            placeholder={'oliversmith'}
            width={36}
            value={userDoc?.github?.userName}
          />
          <InputBox
            label={'Access Token'}
            name={'githubAccessToken'}
            placeholder={'No Access Token is set'}
            width={36}
            value={userDoc?.github?.accessToken}
            disabled={true}
            bgColor={'bg-gray-200'}
          />
        </div>
        <div className='flex flex-wrap items-center'>
          <h3 className='ml-6 w-28'>Repository 1 :</h3>
          <InputBox
            label={'Repo Owner Name'}
            name={'githubRepoOwner1'}
            placeholder={'octocat'}
            width={36}
            value={userDoc?.github?.repositories[0]?.owner}
          />
          <InputBox
            label={'Repo Name'}
            name={'githubRepo1'}
            placeholder={'hello-world'}
            width={36}
            value={userDoc?.github?.repositories[0]?.repo}
          />
          <InputBox
            label={'Repo Visibility'}
            name={'githubRepoVisibility1'}
            placeholder={'Public or Private'}
            width={36}
            value={userDoc?.github?.repositories[0]?.visibility}
          />
        </div>
        <div className='flex flex-wrap items-center'>
          <h3 className='ml-6 w-28'>Repository 2 :</h3>
          <InputBox
            label={'Repo Owner Name'}
            name={'githubRepoOwner2'}
            placeholder={'octocat'}
            width={36}
            value={userDoc?.github?.repositories[1]?.owner}
          />
          <InputBox
            label={'Repo Name'}
            name={'githubRepo2'}
            placeholder={'hello-world'}
            width={36}
            value={userDoc?.github?.repositories[1]?.repo}
          />
          <InputBox
            label={'Repo Visibility'}
            name={'githubRepoVisibility2'}
            placeholder={'Public or Private'}
            width={36}
            value={userDoc?.github?.repositories[1]?.visibility}
          />
          <SubmitButton />
        </div>
      </form>
      <div className='flex'>
        <h2 className='text-xl mt-8 mb-2 ml-6 underline underline-offset-4'>
          Task Ticket / Asana
        </h2>
        <QuestionMark mt={9} mb={1} href='/help/how-to-get-asana-info' />
      </div>
      <form
        name='task-ticket'
        onSubmit={(e) => handleSubmitTaskTicket(e, uid)}
        method='post'
        target='_self'
        autoComplete='off'
      >
        <div className='flex flex-wrap items-center'>
          <div className='ml-6 w-28'></div>
          <InputBox
            label={'User ID'}
            name={'asanaUserId'}
            inputType={'number'}
            placeholder={'1200781652740141'}
            width={48}
            value={userDoc?.asana?.userId}
          />
        </div>
        <div className='flex flex-wrap items-center'>
          <h3 className='ml-6 w-28'>Workspace 1 :</h3>
          <InputBox
            label={'Workspace ID'}
            name={'asanaWorkspaceId1'}
            inputType={'number'}
            placeholder={'1234567890123456'}
            width={48}
            value={userDoc?.asana?.workspace[0]?.workspaceId}
          />
          <InputBox
            label={'Workspace Name'}
            name={'asanaWorkspaceName1'}
            placeholder={'Suchica'}
            width={36}
            value={userDoc?.asana?.workspace[0]?.workspaceName}
          />
          <InputBox
            label={'Personal Access Token'}
            name={'asanaWorkspacePersonalAccessToken1'}
            placeholder={'1/1234567890123456:031..........................a63'}
            width={96}
            value={userDoc?.asana?.workspace[0]?.personalAccessToken}
          />
        </div>
        <div className='flex flex-wrap items-center'>
          <h3 className='ml-6 w-28'>Workspace 2 :</h3>
          <InputBox
            label={'Workspace ID'}
            name={'asanaWorkspaceId2'}
            inputType={'number'}
            placeholder={'1234567890123456'}
            width={48}
            value={userDoc?.asana?.workspace[1]?.workspaceId}
          />
          <InputBox
            label={'Workspace Name'}
            name={'asanaWorkspaceName2'}
            placeholder={'Suchica'}
            width={36}
            value={userDoc?.asana?.workspace[1]?.workspaceName}
          />
          <InputBox
            label={'Personal Access Token'}
            name={'asanaWorkspacePersonalAccessToken2'}
            placeholder={'1/1234567890123456:031..........................a63'}
            width={96}
            value={userDoc?.asana?.workspace[1]?.personalAccessToken}
          />
          <SubmitButton />
        </div>
      </form>
      <div className='flex'>
        <h2 className='text-xl mt-8 mb-2 ml-6 underline underline-offset-4'>
          Communication Activity / Slack
        </h2>
        <QuestionMark mt={9} mb={1} href='/help/how-to-get-slack-info' />
      </div>
      <form
        name='communication-activity'
        onSubmit={(e) => handleSubmitCommunicationActivity(e, uid)}
        method='post'
        target='_self'
        autoComplete='off'
      >
        <div className='flex items-center'>
          <h3 className='ml-6 w-28'>Workspace 1 :</h3>
          <div className='flex flex-wrap'>
            <InputBox
              label={'Workspace Name'}
              name={'slackWorkspaceName1'}
              placeholder={'Suchica'}
              width={36}
              value={userDoc?.slack?.workspace[0]?.workspaceName}
            />
            <InputBox
              label={'Member ID'}
              name={'slackWorkspaceMemberId1'}
              placeholder={'U02DK80DN9H'}
              width={36}
              value={userDoc?.slack?.workspace[0]?.memberId}
            />
            <InputBox
              label={'User Token'}
              name={'slackWorkspaceUserToken1'}
              placeholder={
                'xoxp-1234567890123-1234567890123-1234567890123-a94..........................16e'
              }
              width={96}
              value={userDoc?.slack?.workspace[0]?.userToken}
            />
            <InputBox
              label={'Bot Token'}
              name={'slackWorkspaceBotToken1'}
              placeholder={
                'xoxb-1234567890123-1234567890123-Uia..................8HH'
              }
              width={96}
              value={userDoc?.slack?.workspace[0]?.botToken}
            />
          </div>
        </div>
        <div className='flex items-center'>
          <h3 className='ml-6 w-28'>Workspace 2 :</h3>
          <div className='flex flex-wrap'>
            <InputBox
              label={'Workspace Name'}
              name={'slackWorkspaceName2'}
              placeholder={'Suchica'}
              width={36}
              value={userDoc?.slack?.workspace[1]?.workspaceName}
            />
            <InputBox
              label={'Member ID'}
              name={'slackWorkspaceMemberId2'}
              placeholder={'U02DK80DN9H'}
              width={36}
              value={userDoc?.slack?.workspace[1]?.memberId}
            />
            <InputBox
              label={'User Token'}
              name={'slackWorkspaceUserToken2'}
              placeholder={
                'xoxp-1234567890123-1234567890123-1234567890123-a94..........................16e'
              }
              width={96}
              value={userDoc?.slack?.workspace[1]?.userToken}
            />
            <InputBox
              label={'Bot Token'}
              name={'slackWorkspaceBotToken2'}
              placeholder={
                'xoxb-1234567890123-1234567890123-Uia..................8HH'
              }
              width={96}
              value={userDoc?.slack?.workspace[1]?.botToken}
            />
            <SubmitButton />
          </div>
        </div>
      </form>
      <div className='flex'>
        <Link href='/cancel-membership'>
          <a
            className='mr-3'
            target='_blank'
            rel='noreferrer noopener' // Must pair with target='_blank'
          >
            <button className='text-xl mt-8 mb-2 ml-6 underline underline-offset-4'>
              Cancel Membership
            </button>
          </a>
        </Link>
        <div className='mt-9 mb-1'>
          <Image
            src={NewTabIcon}
            width={24}
            height={24}
            layout='intrinsic'
            alt='Open a new tab'
            quality={75}
            priority={false}
            placeholder='empty'
          />
        </div>
      </div>
      <p className='py-1 ml-6'>
        If you wish to cancel your membership to this service, please follow
        this link.
      </p>
      <div className='h-20'></div>
    </>
  );
};

export default useUserSettings;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = nookies.get(ctx);
  if (cookies.token) {
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;
    const userDoc = (await getAUserDoc(uid)) ? await getAUserDoc(uid) : null;
    const isGithubAuthenticated =
      userDoc?.github?.accessToken && userDoc?.github?.accessToken !== ''
        ? true
        : false;
    return {
      props: { uid, userDoc, isGithubAuthenticated }
    };
  } else {
    return { props: {} as never };
  }
};
