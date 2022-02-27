import type { NextPage } from "next";
import { useRouter } from "next/router";

import Container from "components/Container";
import PostDialog from "domain/Post/PostDialog";
import SearchComponent from "domain/Search";

const Search: NextPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <>
      <Container>
        <SearchComponent />
      </Container>
      {typeof postId === "string" && <PostDialog postId={postId} />}
    </>
  );
};

export default Search;
