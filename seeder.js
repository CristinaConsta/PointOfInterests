const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");

/**
 * constants
 */
 const { PORT} = process.env;
 const db=require("./config/configdb.js");
 
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
    const results = await db.collection("users").find({}).count();

    /**
     * If existing records then delete the current collections
     */
    if (results) {
      console.info("deleting collection");
      await db.collection("users").drop();
      await db.collection("pointsofinterest").drop();
    }

    /**
     * This is just a fun little loader module that displays a spinner
     * to the command line
     */
    const load = loading("importing users").start();

    /**
     * Import the JSON data into the database
     */

    const usersdata = await fs.readFile(path.join(__dirname, "users.json"), "utf8");
    await db.collection("users").insertMany(JSON.parse(usersdata));

    const poidata = await fs.readFile(path.join(__dirname, "POI.json"), "utf8");
    await db.collection(PointOfInterest).insertMany(JSON.parse(poidata));
} catch (error) {
    console.error("error:", error);
    process.exit();
    }
}
main();
