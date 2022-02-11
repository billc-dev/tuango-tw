// const serverless = require("serverless-http");
// const express = require("express");
import * as serverless from "serverless-http";
import * as express from "express";
import { Post } from "./postDB";
const app = express();

app.get("/posts", async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort("-postNum").limit(20);
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(404).json({
      error: "Could not get posts",
    });
  }
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
