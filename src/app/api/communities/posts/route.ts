import connectDB from "../../../lib/db";
import { Community } from "../../../Models/Community";
import { Post } from "../../../Models/Post";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { communityId } = reqBody;

    if (!communityId || !mongoose.Types.ObjectId.isValid(communityId)) {
      return NextResponse.json({
        message: "Valid communityId is required",
        status: 400
      });
    }

    const community = await Community.findById(communityId).select("_id name email descripton place");
    if (!community) {
      return NextResponse.json({
        message: "Community not found",
        status: 404
      });
    }

    const posts = await Post.find({ communitid: communityId }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      message: "Successfully retrieved the community data",
      data: {
        _id: community._id,
        name: community.name,
        descripton: community.descripton,
        place: community.place,
        posts,
      },
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "The request for community failed",
      error: error?.message || error,
      status: 500
    });
  }
}