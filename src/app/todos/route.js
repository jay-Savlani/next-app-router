/**
 * API route : /todos
 */

import { MongoClient } from "mongodb";
import { headers } from "next/headers";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function GET(request) {
  try {
    await client.connect();

    const database = client.db("todo_db");

    const collection = database.collection("todos");

    const todos = await collection.find({}).toArray();

    return Response.json(todos);
  } catch (error) {
    console.log("Something went wrong", error.message);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(request) {
  const res = await request.json();
  const { todo, completed } = res;

  try {
    await client.connect();

    const database = client.db("todo_db");
    const collection = database.collection("todos");

    await collection.insertOne({ todo, completed });

    return Response.json({ message: "Added successfully!" });
  } catch (error) {
    console.log("Something went wrong", error.message);
    return Response.json({ message: "Failed to add todo!" }, { status: 500 });
  }
}
