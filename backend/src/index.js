import dotenv from "dotenv";
import connectToDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectToDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Error while talking with db");
    });
    app.listen(process.env.PORT, () => {
      console.log("Server is active at: ", process.env.PORT);
    });
  })
  .catch((error) => console.log("Connection to db failed"));
