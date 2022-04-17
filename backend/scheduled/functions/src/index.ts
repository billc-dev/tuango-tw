import axios from "axios";
import * as functions from "firebase-functions";

export const pingVercel = functions
  .region("asia-east1")
  .pubsub.schedule("every 2 minutes")
  .onRun(async () => {
    try {
      await axios.get(
        "https://tuango-tw.vercel.app/posts?postId=6254430bf63a6c33a8a22b5a"
        // "https://xn--ndsp5rmr3blfh.com/posts?postId=6254430bf63a6c33a8a22b5a"
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  });

export const pingFirebase = functions
  .region("asia-east1")
  .pubsub.schedule("every 2 minutes")
  .onRun(async () => {
    try {
      await axios.get(
        "https://asia-east1-tuango-tw-firebase.cloudfunctions.net/api_tw_firebase/posts/paginate/initial?limit=20"
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  });
