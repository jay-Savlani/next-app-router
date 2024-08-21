/**
 * API route : /login
 */

import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const secretKey = process.env.SECRECT_KEY;

export async function POST(request) {
  const { username, password } = await request.json();

  console.log("[username password]", username, password);

  try {
    await client.connect();

    const database = client.db("todo_db");
    const users = database.collection("users");

    const foundUser = await users.findOne({ username });

    console.log("found user", foundUser);

    if (foundUser && foundUser.password === password) {
      console.log("inside here");
      // generate jwt token
      // send response

      // genreate JWT token
      const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });

      // enter json data into response
      const response = Response.json({
        message: "Logged in successfully!",
        username,
      });

      // set cookie for authentication
      // httpOnly will prevent client javascript to access this cookie
      cookies().set("authToken", token, { httpOnly: true });

      return response;
    } else {
      return Response.json({ message: "No user found" }, { status: 401 });
    }
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
