import axios from 'axios';

export function fetchSellerOrders(data, setData, setLoading) {
  setLoading(true);
  axios
    .get(`/seller/paginate_orders/${data.page}`)
    .then((res) => {
      if (res.data.error) throw new Error(res.data.error);
      const orders = [];
      const { docs, nextPage, hasNextPage } = res.data;
      docs.forEach((order) => {
        const index = data.orders.findIndex((ord) => ord._id === order._id);
        if (index === -1) orders.push(order);
      });
      setData({
        orders: [...data.orders, ...orders],
        page: nextPage,
        hasNextPage: hasNextPage,
      });
      setLoading(false);
    })
    .catch((err) => console.log(err));
}

export function fetchSellerComments(data, setData, setComments, setLoading) {
  setLoading(true);
  axios
    .get(`/seller/paginate_comments/${data.page}`)
    .then((res) => {
      if (res.data.error) throw new Error(res.data.error);
      const { docs, nextPage, hasNextPage } = res.data.comments;
      setComments((comments) => {
        const newComments = docs.filter(
          (comment) => !comments.some((c) => c._id !== comment._id)
        );
        return [...comments, ...newComments];
      });
      const posts = res.data.posts.filter(
        (post) => !data.posts.some((p) => p._id !== post._id)
      );
      setData({
        posts: [...data.posts, ...posts],
        page: nextPage,
        hasNextPage: hasNextPage,
      });
      setLoading(false);
    })
    .catch((err) => console.log(err));
}
