import axios from "axios";

export function sharePost(post, message, setLoading, setShared, setOpen) {
  setLoading(true);
  axios
    .post(`/notify/group`, { post: post, message: message })
    .then((res) => {
      if (res.data.error) throw new Error(res.data.error);
      setLoading(false);
      setShared(true);
      setOpen(false);
    })
    .catch((err) => console.log(err));
}

export function checkCreated(setCreated, setOpen, setLoading) {
  setLoading(true);
  axios
    .get("/post/check")
    .then((res) => {
      if (res.data.error) throw new Error(res.data.error);
      setCreated(res.data);
      setOpen(true);
      setLoading(false);
    })
    .catch((err) => console.log(err));
}

export function price(post) {
  let price;
  if (post.items.length > 1) {
    const min = post.items.reduce(
      (min, b) => Math.min(min, b.price),
      post.items[0].price
    );
    const max = post.items.reduce(
      (min, b) => Math.max(min, b.price),
      post.items[0].price
    );
    if (min === max) price = post.items[0].price;
    else price = `${min}~$${max}`;
  } else price = post.items[0].price;
  return price;
}

export function fetchSellerPosts(sellerId, page, setData, setLoading) {
  setLoading(true);
  axios
    .get(`/seller/${sellerId}/${page}`)
    .then((res) => {
      if (res.data.error) throw new Error(res.data.error);
      const { docs, nextPage, hasNextPage } = res.data;
      setData((data) => ({
        ...data,
        loading: false,
        posts: [...data.posts, ...docs],
        page: nextPage,
        hasNextPage: hasNextPage,
      }));
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}
