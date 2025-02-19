import * as functions from "firebase-functions";

import { DEFAULT_FUNCTIONS_LOCATION } from "./constants";
import { callGetPlayerMatches, getAndSaveAllLadders } from "./libs/ladders/ladders";

// Set max timeout we can
const runtimeOpts: Record<string, "256MB" | any> = {
  timeoutSeconds: 540,
  memory: "256MB",
};

/**
 * This function downloads all current ladders and saves them to the DB.
 */
const getCOHLadders = functions
  .region(DEFAULT_FUNCTIONS_LOCATION)
  .runWith(runtimeOpts)
  .pubsub.schedule("0 2 * * *")
  .timeZone("Etc/UTC")
  .onRun(async (_) => {
    // Downloads and saves all the ladders. Returns unique IDs across all ladders.
    const profileIDs = await getAndSaveAllLadders();

    await callGetPlayerMatches(profileIDs);
    functions.logger.info("Finished processing the COH ladders");
  });

export { getCOHLadders };
