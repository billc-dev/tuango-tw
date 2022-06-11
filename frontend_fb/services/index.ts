import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

export const copyToClipboard = (text: string, toastMessage?: string) => {
  copy(text);
  toast.success(`已複製${toastMessage ?? ""}`);
};
