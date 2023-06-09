import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || "";

const client = new MongoClient(uri);

export const getClient = async () => {
    await client.connect();
    return client;
}