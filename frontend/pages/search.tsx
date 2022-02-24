import type { NextPage } from "next";
import { useRouter } from "next/router";

import Container from "components/Container";
import PostDialog from "domain/Post/PostDialog";
import SearchComponent from "domain/Search";

const Search: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Container>
        <SearchComponent />
      </Container>
      {typeof id === "string" && <PostDialog id={id} />}
    </>
  );
};

export default Search;
