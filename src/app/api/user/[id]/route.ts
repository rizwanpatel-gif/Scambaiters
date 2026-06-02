import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { User } from "../../../Models/User";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id: userId } = await context.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({
        message: "Valid user ID is required",
        status: 400
      });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404
      });
    }

    return NextResponse.json({
      message: "User found",
      data: user,
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching user",
      error: error?.message || error,
      status: 500
    });
  }
} 