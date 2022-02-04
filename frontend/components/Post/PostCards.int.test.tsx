import { cleanup, render, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { QueryClient, QueryClientProvider } from "react-query";
import * as mockPosts from "__mock__/post.mock";
import PostCards from "./PostCards";

const mock = new MockAdapter(axios, { onNoMatch: "throwException" });

const renderComponent = (children: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("PostCards Integration", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders post cards", async () => {
    mock.onGet("/posts/paginate/initial").reply(200, mockPosts.expectedPosts);
    const { getByText, queryByTestId } = renderComponent(<PostCards />);
    expect(queryByTestId("post-card-skeletons")).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByTestId("post-cards")).toBeInTheDocument();
    });
    expect(
      getByText(mockPosts.expectedPosts.posts[0].title)
    ).toBeInTheDocument();
    expect(
      getByText(mockPosts.expectedPosts.posts[15].title)
    ).toBeInTheDocument();
  });
});
