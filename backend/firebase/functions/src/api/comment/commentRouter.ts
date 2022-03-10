import { Post } from "api/post";
import * as express from "express";
import asyncWrapper from "middleware/asyncWrapper";
import { isAuthorized } from "middleware/auth";
import * as postService from "api/post/postService";
import { Comment } from "./commentDB";
import * as commentService from "./commentService";

const router = express.Router();

router.get(
  "/post/:postId",
  asyncWrapper(async (req, res) => {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ comments });
  })
);

router.post(
  "/comment",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const commentForm = await commentService.validateCommentForm(
      req.body.commentForm
    );

    const post = await Post.findById(commentForm.postId);
    if (!post) throw "post not found";

    const comment = await commentService.createNewComment(
      post,
      commentForm,
      res.locals.user
    );

    const updatedPost = await postService.incrementCommentCount(1, post._id);

    if (post.userId !== res.locals.user.username) {
      commentService.notifyCommentOrReply(
        "comment",
        res.locals.user.displayName,
        comment.comment,
        post._id,
        res.locals.user.username
      );
    }

    return res.json({ comment, post: updatedPost });
  })
);

router.post(
  "/reply",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const replyForm = await commentService.validateReplyForm(
      req.body.replyForm
    );

    const comment = await commentService.createReply(
      replyForm,
      res.locals.user
    );

    if (!comment) throw "comment not found";

    const userIds = commentService.getUserIdsToBeNotified(comment);

    userIds?.forEach((userId) => {
      commentService.notifyCommentOrReply(
        "reply",
        res.locals.user.displayName,
        replyForm.reply,
        comment.postId,
        userId
      );
    });

    return res.json({ comment });
  })
);

export default router;
