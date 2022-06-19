# Volunteeria


## Description
 Volunteeria is a platform that matches volunteers and food banks. Food banks can create ` events` where volunteers can register for. 
 
## Tech stack

- Typescript 
- React
- Firebase


## How to run:
1. Run `npm install` to get requsite packages
2. Add API keys in [here](src/firebase/firebase.tsx)
``` 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
```
3. Run `npm start`
