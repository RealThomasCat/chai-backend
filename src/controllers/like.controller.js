import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video

  // if videoId does not exist, throw error
  if (!videoId) {
    throw new ApiError(400, "videoId is required");
  }

  // TODO: check if video exists

  // check if like exists
  const existingLike = await Like.findOne({ videoId, userId: req.user._id });

  // if like exists, remove it
  if (existingLike) {
    await existingLike.remove();
    return new ApiResponse(res).success("Like removed");
  }

  // if like does not exist, create it
  const like = await Like.create({ videoId, userId: req.user._id });

  // return success response
  return res.status(201).json(new ApiResponse(200, like, "Like added"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
