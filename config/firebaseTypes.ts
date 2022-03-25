import { Timestamp } from "firebase/firestore";

interface UserType extends Record<string, any> {
  asana?: {
    userId: string;
    workspace: [
      {
        personalAccessToken: string;
        workspaceId: string;
        workspaceName: string;
      },
    ];
  };
  assessor?: string;
  assignedPj?: string;
  avatarUrl?: string;
  birth?: Timestamp;
  department?: string;
  firstName?: string;
  github?: {
    repositories: [
      {
        owner: string;
        repo: string;
      },
    ];
    userId: number;
    userName: string;
  };
  documentId?: string;
  lastName?: string;
  rank?: string;
  role?: string;
  slack?: {
    workspace: [
      {
        botToken: string;
        memberId: string;
        userToken: string;
        workspaceName: string;
      },
    ];
  };
  supervisor?: string;
};

export type { UserType };