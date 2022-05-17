import Resizer from "react-image-file-resizer";

export const resizeImage = (file: File, type: "sm" | "md") => {
  const size = type === "sm" ? 300 : 1500;
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      size,
      size,
      "JPEG",
      50,
      0,
      (uri) => resolve(uri),
      "file"
    );
  });
};
