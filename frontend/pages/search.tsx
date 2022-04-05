import type { NextPage } from "next";
import { useRouter } from "next/router";

import Container from "components/Container";
import PostDialog from "domain/Post/PostDialog";
import SearchComponent from "domain/Search";
import LoginOverlay from "domain/User/LoginOverlay";
import NotifySetup from "domain/User/NotifySetup";

const Search: NextPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <>
      <NotifySetup />
      <LoginOverlay />
      <Container>
        <SearchComponent />
      </Container>
      {typeof postId === "string" && <PostDialog postId={postId} />}
    </>
  );
};

export default Search;
