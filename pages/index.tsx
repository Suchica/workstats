// Next.js and React related
import Head from 'next/head';
import { useEffect } from 'react';
import { GetStaticProps } from 'next';
// import { useState } from "react";

// Config
// import { auth } from "../config/firebase";
// import { useAuth } from "../auth";

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

  // useEffect(() => {
  //   import("flowbite");
  //   import('@themesberg/flowbite');
  // }, []);

  // console.log(`Propped data is: ${JSON.stringify(data)}`);
  // console.log(`Propped data is: ${data.messages.total}`);

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
      <main className="flex">
        <div className="flex-none w-72">
          <Avatar />
          <ProfileList />
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
    </div>
  );
}

// This gets called on every request.
// The official document is here: https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export const getStaticProps: GetStaticProps = async () => {
  // The docID should be changed to get it when clicking on the list of transition sources, or if not, get it from the firebase login user.
  const docID = 'REArvdg1hv5I6pkJ40nC';
  const userDoc = await getAUserDoc(docID);

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
  const searchQuery: string | undefined = userDoc?.slack?.workspace[0].memberId;
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
  for (let x in channelList) {
    let channel = channelList[x];
    numberOfNewSent += await slackConversationHistory(
      channel,
      // @ts-ignore
      searchQuery,
      slackUserToken,
    );
  }

  // Tabulate number of times a user has replied in all slack public channels
  let numberOfReplies: number = 0;
  for (let x in channelList) {
    // console.log(`x is: ${x} times`);
    let channel = channelList[x];
    // console.log(`Current channel is: ${channelList[x]}`);
    let timestampList = await listTimestampInSlack(channel, slackUserToken);
    // console.log(`Timestamp list length is: ${timestampList.length}`);
    // console.log(`Timestamp list is: ${timestampList}`);
    for (let y in timestampList) {
      // console.log(`y is: ${y} times`);
      // @ts-ignore
      numberOfReplies += await countRepliesInSlack(channel, timestampList[y], searchQuery,slackUserToken);
    }
  }
  // console.log(`numberOfReplies is: ${numberOfReplies}`);

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
    },
  };
};
