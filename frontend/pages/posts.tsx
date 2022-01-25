import type { NextPage } from "next";
import { useGetPostsQuery } from "../redux/postApi";

const Posts: NextPage = () => {
  const { data, error, isLoading } = useGetPostsQuery(1);
  console.log(data);

  return (
    <div className="flex justify-center bg-slate-200">
      <div className="max-w-4xl">
        <div className="gap-2 p-2 grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4">
          {data?.map((post) => (
            <div
              key={post._id}
              className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm"
            >
              <img
                src={post.imageUrls[0].sm}
                className="max-h-48 h-2/3 object-cover"
              />
              <div className="px-2 pt-2 pb-3">
                <div className="truncate">{post.title}</div>
                <div className="truncate text-xs">{post.displayName}</div>
                <div className="flex justify-between pt-2">
                  <div className="w-2/5 truncate">
                    {post.orderCount ? `${post.orderCount + 100} 訂單` : ""}
                  </div>
                  <div className="truncate">$100~$5000</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
