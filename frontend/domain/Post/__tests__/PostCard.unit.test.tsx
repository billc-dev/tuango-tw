import { render } from "@testing-library/react";

import { expectedPosts } from "domain/Post/__mock__/post.mock";

import PostCard from "../PostCards/PostCard";
import { IPostCard } from "../types";

const renderComponent = () =>
  render(<PostCard post={expectedPosts.posts[0]} />);

describe("PostCard", () => {
  let expectedPost: IPostCard;

  beforeEach(() => {
    expectedPost = expectedPosts.posts[0];
  });

  it("renders title", () => {
    const { getByText } = renderComponent();
    const title = getByText(expectedPost.title);
    expect(title).toBeInTheDocument();
  });

  it("renders first image", () => {
    const { getByAltText } = renderComponent();
    const image = getByAltText("product");
    expect(image).toHaveAttribute(
      "src",
      // @ts-expect-error
      expectedPost.imageUrls[0].sm
    );
  });

  it("renders seller displayName", () => {
    const { getByText } = renderComponent();
    const displayName = getByText(expectedPost.displayName);
    expect(displayName).toBeInTheDocument();
  });

  it("renders orderCount", () => {
    const { getByLabelText } = renderComponent();
    const orderCount = getByLabelText("orderCount");
    expect(orderCount).toBeInTheDocument();
    expect(orderCount.textContent).toEqual(`${expectedPost.orderCount} 訂單`);
  });
});
