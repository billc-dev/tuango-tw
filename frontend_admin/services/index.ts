import toast from "react-hot-toast";

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("已複製");
};
