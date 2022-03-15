import React, { FC, useState } from "react";

import { SubmitHandler, UseFormReset, useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";

import Button from "components/Button";
import Dialog from "components/Dialog";
import TextField from "components/TextField";

import { useInfiniteSellerPosts } from "../hooks";
import { PostForm } from "../schema";
import { SellerQuery } from "../types";
import TableRowSkeleton from "./TableRowSkeleton";

interface PostSearchParams {
  postNum?: number;
  title?: string;
}

interface Props {
  reset: UseFormReset<PostForm>;
}

const LoadPreviousPosts: FC<Props> = ({ reset }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<SellerQuery>();
  const { register, handleSubmit } = useForm<PostSearchParams>();
  const limit = 16;
  const { data, fetchNextPage, isFetching, isLoading, hasNextPage } =
    useInfiniteSellerPosts(limit, open, query);
  const onSubmit: SubmitHandler<PostSearchParams> = (data) => {
    setQuery({ ...data });
  };

  return (
    <>
      <Button
        type="button"
        fullWidth
        className="mb-2"
        onClick={() => setOpen(true)}
      >
        載入舊單
      </Button>
      {open && (
        <Dialog
          id="postsTable"
          title="載入舊單"
          handleClose={() => setOpen(false)}
          {...{ open }}
        >
          <div className="pt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                color="grey"
                type="number"
                placeholder="流水編號"
                {...register("postNum")}
              />
              <TextField
                color="grey"
                placeholder="團購主題"
                {...register("title")}
              />
              <Button type="submit" variant="primary" fullWidth>
                搜尋
              </Button>
            </form>
          </div>
          <InfiniteScroll
            scrollableTarget="postsTable"
            loader={isFetching && <div></div>}
            next={() => fetchNextPage()}
            hasMore={hasNextPage ?? false}
            dataLength={
              data?.pages.reduce((sum, post) => post.posts.length + sum, 0) || 0
            }
          >
            <table className="table-auto w-full mt-2 border-collapse">
              <thead className="bg-zinc-200">
                <tr className="whitespace-nowrap text-left border-b">
                  <th className="font-normal p-2">流水編號</th>
                  <th className="font-normal">團購主題</th>
                  <th className="font-normal p-2">載入貼文</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading
                  ? data?.pages.map((page) =>
                      page.posts.map((post) => {
                        const { postNum, title, storageType } = post;
                        const { body, imageUrls, items } = post;
                        return (
                          <tr key={post._id} className="border-b">
                            <td className="py-2">{postNum}</td>
                            <td className="py-2">{title}</td>
                            <td className="py-2">
                              <Button
                                className="m-auto"
                                onClick={() => {
                                  reset({
                                    title,
                                    storageType,
                                    body,
                                    imageUrls,
                                    items: items.map((item) => ({
                                      ...item,
                                      itemQty: 100,
                                    })),
                                  });
                                  setOpen(false);
                                }}
                              >
                                載入
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )
                  : [...Array(8)].map((_, i) => <TableRowSkeleton key={i} />)}
              </tbody>
            </table>
          </InfiniteScroll>
        </Dialog>
      )}
    </>
  );
};

export default LoadPreviousPosts;
