// import axios from "axios";

// export function fetchOrders(post, setOrders) {
//   axios
//     .get(`/post/${post._id}/orders`)
//     .then((res) => {
//       if (res.data.error) throw new Error(res.data.error);
//       setOrders(res.data);
//     })
//     .catch((err) => console.log(err));
// }

// export function orderSum(order) {
//   return order.reduce((sum, item) => sum + item.price * item.qty, 0);
// }

// export function setHasName(order, boolean, setOrders, setLoading) {
//   setLoading(true);
//   axios
//     .patch(`/order/${order._id}/setHasName`, { hasName: boolean })
//     .then((res) => {
//       setOrders((orders) => {
//         if (res.data.error) throw new Error(res.data.error);
//         const index = orders.findIndex((o) => o._id === order._id);
//         orders[index].hasName = res.data;
//         return [...orders];
//       });
//       setLoading(false);
//     })
//     .catch((err) => console.log(err));
// }

// export function sendMessage(post, users, message, setLoading, setOpen) {
//   setLoading(true);
//   axios
//     .post(`/notify/${post._id}/sendMessage`, { users: users, message: message })
//     .then((res) => {
//       if (res.data.error) throw new Error(res.data.error);
//       setLoading(false);
//       setOpen(false);
//     })
//     .catch((err) => console.log(err));
// }

// export function fetchUserOrders(status, page, setData, setLoading) {
//   setLoading(true);
//   axios
//     .get(`/user/orders/${status}/${page}`)
//     .then((res) => {
//       if (res.data.error) throw new Error(res.data.error);
//       setData((data) => {
//         const { docs, nextPage, hasNextPage } = res.data;
//         const orders = [];
//         docs.forEach((order) => {
//           const index = data.orders.findIndex(
//             (currentOrder) => currentOrder._id === order._id
//           );
//           if (index === -1) orders.push(order);
//         });
//         return {
//           ...data,
//           orders: [...data.orders, ...orders],
//           page: nextPage,
//           hasNextPage: hasNextPage,
//         };
//       });
//       setLoading(false);
//     })
//     .catch((err) => console.log(err));
// }
// export function fetchCompleted(id, setComplete, setLoading) {
//   setLoading(true);
//   axios
//     .get(`/user/order/completed/${id}`)
//     .then((res) => {
//       if (res.data.error) throw new Error(res.data.error);
//       setComplete(res.data);
//       setLoading(false);
//     })
//     .catch((err) => console.log(err));
// }

// export function fetchPostOrders(post, setOrders, setLoading) {
//   setLoading(true);
//   axios
//     .get(`/seller/orders/${post._id}/ordered`)
//     .then((res) => {
//       if (res.data.error) throw new Error(res.data.error);
//       setOrders(res.data);
//       setLoading(false);
//     })
//     .catch((err) => console.log(err));
// }

// export function fetchExtraOrders(page, setData, setLoading) {
//   setLoading(true);
//   axios
//     .get(`/extra/${page}`)
//     .then((res) => {
//       if (res.data.error) throw new Error(res.data.error);
//       const { docs, nextPage, hasNextPage } = res.data;
//       setData((data) => ({
//         orders: [...data.orders, ...docs],
//         page: nextPage,
//         hasNextPage: hasNextPage,
//       }));
//       setLoading(false);
//     })
//     .catch((err) => console.log(err));
// }

// export function fetchSellerPosts(sellerId, data, setData, query) {
//   axios
//     .post(`/seller/${sellerId}/${data.page}`, { query })
//     .then((res) => {
//       if (res.data.error) throw new Error(res.data.error);
//       setData((data) => {
//         const postsToAdd = [];
//         res.data.docs.forEach((post) => {
//           const index = data.posts.findIndex((p) => p._id === post._id);
//           if (index === -1) postsToAdd.push(post);
//         });
//         data.page = res.data.nextPage;
//         data.hasNextPage = res.data.hasNextPage;
//         return { ...data, posts: [...data.posts, ...postsToAdd] };
//       });
//     })
//     .catch((err) => console.log(err));
// }
