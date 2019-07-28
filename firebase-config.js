let defaultConf = {
  apiKey: "AIzaSyBjevDyjS1mJaZJEBBZS8UchkYr_xUryGM",
  authDomain: "act-6b808.firebaseapp.com",
  databaseURL: "https://act-6b808.firebaseio.com",
  projectId: "act-6b808",
  storageBucket: "act-6b808.appspot.com",
  messagingSenderId: "589682227370",
  appId: "1:589682227370:web:c5a95d7e67ba1075"
};

function parseFromEnv(defaultCnf) {
  try {
    let firebaseConfString = process.env.FIREBASE_CONFIG;
    if(firebaseConfString) {
        return JSON.parse(firebaseConfString);
    } else {
        return defaultCnf
    }
  } catch (e) {
    console.error("failed to parse FIREBASE_CONFIG env variable", e);
    return defaultCnf;
  }
}

let firebaseConf = parseFromEnv(defaultConf)

export default firebaseConf;
