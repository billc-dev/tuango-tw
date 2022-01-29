import axios from 'axios';

export function fetchComments(post, setComments) {
  axios
    .get(`/post/${post._id}/comment`)
    .then((res) => {
      if (res.data.error) throw new Error(res.data.error);
      setComments(res.data);
    })
    .catch((err) => console.log({ error: err }));
}

export function createReply(
  comment,
  reply,
  setLoading,
  setComments,
  setReply,
  setOpen
) {
  setLoading(true);
  axios
    .patch(`/post/comment/${comment._id}/reply`, { reply: reply })
    .then((res) => {
      if (res.data.error) throw new Error(res.data.error);
      setComments((comments) => {
        const index = comments.findIndex((c) => c._id === res.data._id);
        comments[index] = res.data;
        return [...comments];
      });
      setLoading(false);
      setReply('');
      setOpen(false);
    })
    .catch((err) => console.log(err));
}
