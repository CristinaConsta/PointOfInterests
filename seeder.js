const { MongoClient} = require("mongodb");
const mongoose=require("mongoose");
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");

/**
 * constants
 */
 const { PORT} = process.env;
 const db=require("./config/configdb.js");
 const client = new MongoClient(db.url);
 
 mongoose.connect(db.url, { useNewUrlParser: true },  {autoIndex: false});
 mongoose.connection.on("error", (err) => {
   console.error(err);
   console.log(
     "MongoDB connection error. Please make sure MongoDB is running.",
   );
   process.exit();
 });


async function main() {
  try {
    await client.connect();
    const db = client.db();
    const userresults = await db.collection("users").find({}).count();
    const poiresults = await db.collection("pointsofinterests").find({}).count();
    /**
     * If existing records then delete the current collections
     */
    if (userresults) {
      console.info("deleting collection users");
      await db.collection("users").drop();
    }
    if (poiresults){
      console.info("deleting collection pointsofinterests");
      await db.collection("pointsofinterests").drop();
    }
     /**
     * This is just a fun little loader module that displays a spinner
     * to the command line
     */
    const load = loading("importing initial data").start();
    /**
     * Import the JSON data into the database
     */

    const usersdata = await fs.readFile(path.join(__dirname, "Users.json"), "utf8");
    await db.collection("users").insertMany(JSON.parse(usersdata));

    const poidata = await fs.readFile(path.join(__dirname, "POI.json"), "utf8");
    await db.collection("pointsofinterests").insertMany(JSON.parse(poidata));
    load.stop();
    console.info("initial data was imported!")
} catch (error) {
    console.error("error:", error);
    process.exit();
    }
}
main();
