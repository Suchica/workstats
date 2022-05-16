const admin = require('firebase-admin');
const serviceAccount = {
  type: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TYPE,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY
    ? process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined,
  client_email: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url:
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_X509_CERT_URL
};

// @ts-ignore
const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  return (
    admin
      .auth()
      .verifyIdToken(token)
      // @ts-ignore
      .catch((error) => {
        throw error;
      })
  );
};

export { verifyIdToken };
