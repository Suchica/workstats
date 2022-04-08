// Next.js and React related
import Head from 'next/head';
import { useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
// import { useState } from "react";

// Config
import { auth } from '../config/firebaseClient';
// import { useAuth } from "../auth";
import { verifyIdToken } from '../firebaseAdmin';

// Components
import ProfileList from '../components/ProfileList';
import CardList from '../components/cards/CardList';
import Avatar from '../components/Avatar';
import ButtonList from '../components/buttons/ButtonList';
import SpecifyPeriodFromTo from '../components/buttons/SpecifyPeriodFromTo';

// Services
import {
  countRepliesInSlack,
  listTimestampInSlack,
  slackConversationHistory,
  slackConversationList,
  slackSearchFromServer,
} from '../services/slackServices.server';
import getAUserDoc from '../services/getAUserDocFromFirebase';

export default function Home({
  // @ts-ignore
  numberOfMentioned,
  // @ts-ignore
  numberOfNewSent,
  // @ts-ignore
  numberOfReplies,
  // @ts-ignore
  asanaWorkspaceId,
  // @ts-ignore
  asanaUserId,
  // @ts-ignore
  asanaPersonalAccessToken,
  // @ts-ignore
  githubOwnerName,
  // @ts-ignore
  githubRepoName,
  // @ts-ignore
  githubUserId,
  // @ts-ignore
  githubUserName,
  // @ts-ignore
  profileList,
  // @ts-ignore
  uid,
}) {
  // const { currentUser } = useAuth();
  // const [open, setOpen] = useState(false);
  // const [alertType, setAlertType] = useState("success");
  // const [alertMessage, setAlertMessage] = useState("");
  // const showAlert = (type, msg) => {
  //   setAlertType(type);
  //   setAlertMessage(msg);
  //   setOpen(true);
  // };
  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };
  // console.log('userDoc is: ', userDoc);

  return (
    <div>
      <Head>
        <title>PolygonHR</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/@themesberg/flowbite@1.3.3/dist/flowbite.min.css"
        /> */}
      </Head>
      {profileList && (
        <main className="flex">
          <div className="flex-none w-72">
            <Avatar userId={uid} />
            {/* <ProfileList user={userDoc} /> */}
            <ProfileList profileList={profileList} />
          </div>
          <div>
            <ButtonList />
            <SpecifyPeriodFromTo />
            <CardList
              numberOfMentioned={numberOfMentioned}
              numberOfNewSent={numberOfNewSent}
              numberOfReplies={numberOfReplies}
              asanaWorkspaceId={asanaWorkspaceId}
              asanaUserId={asanaUserId}
              asanaPersonalAccessToken={asanaPersonalAccessToken}
              githubOwnerName={githubOwnerName}
              githubRepoName={githubRepoName}
              githubUserId={githubUserId}
              githubUserName={githubUserName}
            />
          </div>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          {/* <script src="https://unpkg.com/@themesberg/flowbite@1.3.3/dist/flowbite.bundle.js" /> */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          {/* <script src="https://unpkg.com/@themesberg/flowbite@1.3.3/dist/datepicker.bundle.js" /> */}
        </main>
      )}
    </div>
  );
}

// This gets called on every request.
// The official document is here: https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  // export const getStaticProps: GetStaticProps = async () => {
  const cookies = nookies.get(ctx);

  if (cookies.token) {
    const token = await verifyIdToken(cookies.token);
    // The docID should be changed to get it when clicking on the list of transition sources, or if not, get it from the firebase login user.

    // the user is authenticated!
    const { uid, email } = token;
    // const currentUser = auth.currentUser;
    // const docId = currentUser?.uid ? currentUser.uid : '';
    const userDoc = await getAUserDoc(uid);

    // Profile list to be displayed on the left side
    const profileList = {
      firstName: userDoc?.firstName ? userDoc.firstName : '',
      lastName: userDoc?.lastName ? userDoc.lastName : '',
      department: userDoc?.department ? userDoc.department : '',
      rank: userDoc?.rank ? userDoc.rank : '',
      supervisor: userDoc?.supervisor ? userDoc.supervisor : '',
      assessor: userDoc?.assessor ? userDoc.assessor : '',
      assignedPj: userDoc?.assignedPj ? userDoc.assignedPj : '',
      role: userDoc?.role ? userDoc.role : '',
      avatarUrl: userDoc?.avatarUrl ? userDoc.avatarUrl : '',
    };

    // Parameters for asana
    const asanaPersonalAccessToken =
      userDoc?.asana?.workspace[0].personalAccessToken;
    const asanaUserId: string | undefined = userDoc?.asana?.userId;
    const asanaWorkspaceId: string | undefined =
      userDoc?.asana?.workspace[0].workspaceId;

    // Parameters for github
    const githubRepoName: string | undefined =
      userDoc?.github?.repositories[0].repo;
    const githubOwnerName: string | undefined =
      userDoc?.github?.repositories[0].owner;
    const githubUserId: number | undefined = userDoc?.github?.userId;
    const githubUserName: string | undefined = userDoc?.github?.userName;

    // Parameters for slack
    const searchQuery: string | undefined =
      userDoc?.slack?.workspace[0].memberId;
    const slackUserToken: string = `Bearer ${userDoc?.slack?.workspace[0].userToken}`;

    // Tabulate number of times a user has been mentioned in all slack public channels
    const numberOfMentioned = await slackSearchFromServer(
      // @ts-ignore
      searchQuery,
      slackUserToken,
    );

    // Tabulate number of times a user has newly sent messages in all slack public channels
    const channelList = await slackConversationList(slackUserToken);
    let numberOfNewSent: number = 0;
    const numberOfNewSentPromises = [];
    for (let x in channelList) {
      let channel = channelList[x];
      numberOfNewSentPromises.push(
        slackConversationHistory(
          channel,
          // @ts-ignore
          searchQuery,
          slackUserToken,
        ),
      );
    }
    (await Promise.all(numberOfNewSentPromises)).map(
      (n) => (numberOfNewSent += n),
    );

    // Tabulate number of times a user has replied in all slack public channels
    let numberOfReplies: number = 0;
    const numberOfRepliesPromises: any = [];
    const listTimestampInSlackPromises: any = [];

    channelList.map((channel: string) => {
      listTimestampInSlackPromises.push(
        listTimestampInSlack(channel, slackUserToken),
      );
    });

    (await Promise.all(listTimestampInSlackPromises)).map(
      // @ts-ignore
      ({ channel, result }) => {
        const timestampList: [] = result;
        timestampList.map((timestamp: number) => {
          numberOfRepliesPromises.push(
            countRepliesInSlack(
              channel,
              timestamp,
              // @ts-ignore
              searchQuery,
              slackUserToken,
            ),
          );
        });
      },
    );

    (await Promise.all(numberOfRepliesPromises)).map(
      // n must be a number but type error is thrown
      // @ts-ignore
      (n) => (numberOfReplies += n),
    );

    // Pass data to the page via props
    return {
      props: {
        numberOfMentioned,
        numberOfNewSent,
        numberOfReplies,
        asanaUserId,
        asanaWorkspaceId,
        asanaPersonalAccessToken,
        githubRepoName,
        githubOwnerName,
        githubUserId,
        githubUserName,
        profileList,
        uid,
      },
    };
  } else {
    return { props: {} as never };
  }
};
