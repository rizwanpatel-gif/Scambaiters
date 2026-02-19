import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

declare global {
  var mongoose: CachedConnection | undefined;
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  bucket: GridFSBucket | null;
}

let cached: CachedConnection = global.mongoose ?? { conn: null, promise: null, bucket: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (cached.conn) {
    return cached;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    const mongooseInstance = await cached.promise;
    cached.conn = mongooseInstance;
    
    // Initialize GridFS bucket
    const db = mongooseInstance.connection.db;
    if (!db) {
      throw new Error('Database connection failed');
    }
    cached.bucket = new GridFSBucket(db, {
      bucketName: 'uploads'
    });
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached;
}

export default connectDB; 