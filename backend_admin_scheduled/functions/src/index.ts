import * as functions from "firebase-functions";
import axios from "axios";

export const ping_backend = functions
  .region("asia-east1")
  .pubsub.schedule("every minute")
  .onRun(async () => {
    try {
      await axios.get(
        "https://asia-east1-tuango-admin-api.cloudfunctions.net/api_backend_admin/orders/ping"
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  });
