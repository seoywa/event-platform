// cache database connection (mongodb connection via mongoose) across multiple invocations of serverless api routes in nextjs
// in serverless environments like nextjs where your code could be executed multiple times but not in a single continuous server process you need to manage db connection efficiently, as each serverless function could result in a new connection to the db which could exhause db resources.

// in simple terms, if we dont cache, we'll be making new connection to the db again and again

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

//initialize 'cached' variable and attempt to retrieve mongoose property from the global object. this cached variable is intent to hold a cached connection to our database
let cached = (global as any).mongoose || { conn: null, promise: null};

export const connectToDatabase = async () => {
  // check if cached is connected 
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error('Missing MongoDB URI')

  // here we're either connected to a cached connection or we create a new database
  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'evently',
    bufferCommands: false
  })

  cached.conn = await cached.promise;
}
