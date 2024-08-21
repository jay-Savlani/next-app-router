/**
 * API route : /todos
 */

import { MongoClient } from "mongodb";

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
    console.log("Something went wrong", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(request) {
  const res = await request.json();
  console.log("response from POST", res);
  return Response.json({ res });
}
