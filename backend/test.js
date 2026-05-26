const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb+srv://pkkaktan_db_user:IROv9H6her5HAOlh@cluster0.rf15i6g.mongodb.net/runnerGame?retryWrites=true&w=majority";

async function run() {
    try {
        const client = new MongoClient(uri);

        await client.connect();

        console.log("Connected Successfully");

        await client.close();
    } catch (err) {
        console.error(err);
    }
}

run();