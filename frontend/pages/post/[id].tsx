import { useRouter } from "next/router";
import { useEffect } from "react";

const PostId = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    router.push(`/posts?postId=${router.query.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  return null;
};

export default PostId;
