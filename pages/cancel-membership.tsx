// React and Next.js
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useState } from 'react';
import nookies from 'nookies';
import Head from 'next/head';

// Firebase related
import { verifyIdToken } from '../firebaseAdmin';
import getAUserDoc from '../services/getAUserDocFromFirebase';
import { UserType } from '../config/firebaseTypes';

// Components and Services
import CheckButton from '../components/buttons/CheckButton';
import UnsubscribeButton from '../components/buttons/UnsubscribeButton';
import SendFeedbackButton from '../components/buttons/SendFeedbackButton';
import { handleSubmitSurveyWhyYouLeave } from '../services/setDocToFirestore';

interface CancelMembershipTypes {
  uid: string;
  userDoc: UserType | null;
}

const useCancelMembership = ({ uid }: CancelMembershipTypes) => {
  const [isSurveySubmitted, setIsSurveySubmitted] = useState(false);
  console.log('isSurveySubmitted: ', isSurveySubmitted);
  console.log('!isSurveySubmitted: ', !isSurveySubmitted);
  return (
    <>
      <Head>
        <title>Cancel Membership - WorkStats</title>
        <meta
          name='description'
          content='This is the page where users can unsubscribe from WorkStats. Users can leave by answering a questionnaire about the reason for leaving.'
        />
        <link rel='icon' href='/icononly_transparent_nobuffer.ico' />
      </Head>
      <main className='px-5'>
        <h1 className='text-3xl py-4'>Cancel Membership</h1>
        <p className='py-1'>
          I am very sorry that you wish to unsubscribe from this service. There
          is a button to unsubscribe at the end of this page, but before you do,
          could you please tell us why you were not satisfied with this service
          and what made you decide to unsubscribe? We would like to take this
          seriously and make improvements.
        </p>
        <h2 className='text-2xl py-4'>1. Tell us why you leave.</h2>
        <p className='py-1'>
          What are the applicable reasons for withdrawal from this service? You
          may select more than one.
        </p>
        <form
          name='survey why the user wanted to leave'
          onSubmit={async (e) => {
            console.log('e.target', e.currentTarget.reason1.id);
            await handleSubmitSurveyWhyYouLeave(e, uid, 13);
            setIsSurveySubmitted(true);
          }}
          method='post'
          target='_self'
          autoComplete='off'
        >
          <CheckButton id='reason1' label='I do not use GitHub.' />
          <CheckButton id='reason2' label='I do not use Asana.' />
          <CheckButton id='reason3' label='I do not use Slack.' />
          <CheckButton
            id='reason4'
            label='I use GitHub, but I do not have any GitHub public repository that I contribute to.'
          />
          <CheckButton
            id='reason5'
            label='I use Asana, but I am not authorized to issue Asana Personal Access Token and do not know Asana administrator.'
          />
          <CheckButton
            id='reason6'
            label='I asked Asana administrator to give me Asana Personal Access Token, but I was refused.'
          />
          <CheckButton
            id='reason7'
            label='I have Asana Personal Access Token, but I do not want to share it with this app.'
          />
          <CheckButton
            id='reason8'
            label='I use Slack, but I am not authorized to issue User Token and do not know Slack administrator.'
          />
          <CheckButton
            id='reason9'
            label='I asked Slack administrator to give me User Token, but I was refused.'
          />
          <CheckButton
            id='reason10'
            label='I have Slack User Token, but I do not want to share it with this app.'
          />
          <CheckButton
            id='reason11'
            label='I do not want to care about these numbers in the first place.'
          />
          <CheckButton
            id='reason12'
            label='I do not know how to use these numbers.'
          />
          <CheckButton
            id='reason13'
            label='Not enough variety in numbers are tabulated.'
          />
          <SendFeedbackButton />
        </form>
        {isSurveySubmitted ? (
          <p className='py-3'>
            The survey has been submitted. Thank you for your feedback. If you
            would like to correct the reason for your withdrawal, please modify
            the checkboxes above and resubmit your request.
          </p>
        ) : null}
        <h2 className='text-2xl py-4'>
          2. Cancel membership and delete your data.
        </h2>
        <p className='py-1'>
          When you unsubscribe, your data will be erased and your account will
          be deleted. If you try to log in again, the account will be created
          again, but unlike before, you should not see any data and there should
          be no data in your user settings. That way you can confirm that your
          data has indeed been deleted.
        </p>
        <p className='py-1'>
          Therefore, even if you have accidentally unsubscribed, you will not be
          able to restore your account or data. Please be aware of this.
        </p>
        <UnsubscribeButton uid={uid} disabled={!isSurveySubmitted} />
        <div className='h-20'></div>
      </main>
    </>
  );
};

export default useCancelMembership;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = nookies.get(ctx);
  if (cookies.token) {
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;
    const userDoc = (await getAUserDoc(uid)) ? await getAUserDoc(uid) : null;
    return {
      props: { uid, userDoc }
    };
  } else {
    return { props: {} as never };
  }
};
