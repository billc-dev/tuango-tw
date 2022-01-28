import axios from "axios";
import Resizer from "react-image-file-resizer";
import { nanoid } from "nanoid";

// export const uploadImage = async (e, setUploading, setForm) => {
//   setUploading(true);
//   let promises = [];
//   for (let image of e.target.files) {
//     const formdata = new FormData();
//     formdata.append("image", image);
//     const config = {
//       method: "POST",
//       body: formdata,
//       redirect: "follow",
//     };
//     promises.push(
//       fetch(
//         "https://api.imgbb.com/1/upload?key=da80f776348690fe9dc6d0d7b51721d9",
//         config
//       )
//         .then((response) => response.text())
//         .then((result) => {
//           const { thumb, medium, image } = JSON.parse(result).data;
//           const mediumUrl = medium ? medium.url : image.url;
//           return { sm: thumb.url, md: mediumUrl, lg: image.url };
//         })
//         .catch((error) => console.log("error", error))
//     );
//   }
//   try {
//     const imageUrls = [];
//     const images = await Promise.all(promises);
//     images.forEach((image) => {
//       if (image) imageUrls.push(image);
//     });
//     setForm((form) => ({
//       ...form,
//       post: { ...form.post, imageUrls: [...form.post.imageUrls, ...imageUrls] },
//     }));
//     setUploading(false);
//   } catch (err) {
//     console.log(err);
//     setUploading(false);
//   }
// };

export const uploadMessageImage = async (
  e,
  sendChatMessage,
  handleClose,
  chatSendingMessage
) => {
  handleClose();
  chatSendingMessage();
  const promises = [];
  for (let image of e.target.files) {
    const data = new FormData();
    data.append("image", image);
    const config = { method: "POST", body: data, redirect: "follow" };
    promises.push(
      fetch(
        "https://api.imgbb.com/1/upload?key=da80f776348690fe9dc6d0d7b51721d9",
        config
      )
        .then((response) => response.text())
        .then((result) => {
          const { thumb, medium, image } = JSON.parse(result).data;
          const mediumUrl = medium ? medium.url : image.url;
          return { sm: thumb.url, md: mediumUrl, lg: image.url };
        })
        .catch((error) => console.log("error", error))
    );
  }
  try {
    const images = await Promise.all(promises);
    sendChatMessage({ images: images }, "images");
  } catch (err) {
    console.log(err);
  }
};

export const uploadVideo = (e, setUploading, setForm) => {
  if (e.target.files[0]) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "video_upload");
    const config = { method: "POST", body: formData };
    fetch("https://api.cloudinary.com/v1_1/tuango-tw/video/upload", config)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        if (data.secure_url) {
          setForm((form) => ({
            ...form,
            post: {
              ...form.post,
              videoUrl: data.secure_url,
            },
          }));
        }
        setUploading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setUploading(false);
      });
  }
};

export const uploadImageFirebase = async (e, setUploading, setForm) => {
  setUploading(true);
  let promises = [];
  let index = 0;
  for (let image of e.target.files) {
    const thumbnail = await createThumbnail(image);
    const resizedImage = await resizeImage(image);
    postImage(promises, thumbnail, index, "sm");
    postImage(promises, resizedImage, index, "md");
    index++;
  }
  try {
    const imageUrls = [];
    const images = await Promise.all(promises);
    images.forEach((image) => {
      if (imageUrls.length === image.index) {
        imageUrls.push({ sm: image.url });
      } else {
        imageUrls[image.index].md = image.url;
        imageUrls[image.index].lg = image.url;
      }
    });
    setForm((form) => ({
      ...form,
      post: { ...form.post, imageUrls: [...form.post.imageUrls, ...imageUrls] },
    }));
    setUploading(false);
  } catch (err) {
    console.log(err);
    setUploading(false);
  }
};

const createThumbnail = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      50,
      0,
      (uri) => resolve(uri),
      "file"
    );
  });

const resizeImage = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1500,
      1500,
      "JPEG",
      50,
      0,
      (uri) => resolve(uri),
      "file"
    );
  });

const postImage = (promises, image, index, type) => {
  const formData = new FormData();
  formData.append("image", image);
  promises.push(
    axios
      .post("/uploadImage", formData)
      .then((res) => {
        console.log(res.data.imageUrl);
        return { index, type, url: res.data.imageUrl };
      })
      .catch((err) => console.log(err))
  );
};

const postImageAWS = (promises, image, index, type, filename) => {
  promises.push(
    axios
      .put(
        `https://4tr9p3bu1e.execute-api.ap-east-1.amazonaws.com/prod/upload-image?bucket=tuango-tw-images&key=${filename}/${type}.jpeg`,
        image,
        {
          headers: {
            "Content-Type": "image/jpeg",
          },
        }
      )
      .then((res) => {
        return {
          index,
          type,
          url: `https://d2lduww19xwizo.cloudfront.net/${filename}/${type}.jpeg`,
        };
      })
      .catch((err) => console.log(err))
  );
};

export const uploadImageS3 = async (e, setUploading, setForm, userId) => {
  setUploading(true);
  let promises = [];
  let index = 0;
  for (let image of e.target.files) {
    const thumbnail = await createThumbnail(image);
    const resizedImage = await resizeImage(image);
    const id = nanoid();
    const filename = `${userId}/${id}`;
    postImageAWS(promises, thumbnail, index, "sm", filename);
    postImageAWS(promises, resizedImage, index, "md", filename);
    index++;
  }
  try {
    const imageUrls = [];
    const images = await Promise.all(promises);
    images.forEach((image) => {
      if (imageUrls.length === image.index) {
        imageUrls.push({ sm: image.url });
      } else {
        imageUrls[image.index].md = image.url;
        imageUrls[image.index].lg = image.url;
      }
    });
    setForm((form) => ({
      ...form,
      post: { ...form.post, imageUrls: [...form.post.imageUrls, ...imageUrls] },
    }));
    setUploading(false);
  } catch (err) {
    console.log(err);
    setUploading(false);
  }
};
