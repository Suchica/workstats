import { Timestamp } from 'firebase/firestore';

interface UserType extends Record<string, any> {
  asana?: {
    userId: string;
    workspace: [
      {
        personalAccessToken: string;
        workspaceId: string;
        workspaceName: string;
      },
      {
        personalAccessToken: string;
        workspaceId: string;
        workspaceName: string;
      }
    ];
  };
  assessor?: string;
  assignedPj?: string;
  avatarUrl?: string;
  birth?: Timestamp | number; // DB has Timestamp type but birth could be converted to number
  department?: string;
  firstName?: string;
  github?: {
    repositories: [
      {
        owner: string;
        repo: string;
        visibility: string;
      },
      {
        owner: string;
        repo: string;
        visibility: string;
      }
    ];
    userId?: number;
    userName?: string;
    accessToken?: string;
  };
  documentId?: string;
  lastName?: string;
  middleName?: string;
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
      {
        botToken: string;
        memberId: string;
        userToken: string;
        workspaceName: string;
      }
    ];
  };
  supervisor?: string;
}

export type { UserType };
