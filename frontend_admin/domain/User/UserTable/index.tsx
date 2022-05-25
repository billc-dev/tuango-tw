import React, { useState } from "react";

import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableHead from "components/Table/TableHead";
import TablePagination from "components/Table/TablePagination";

import { usePaginateUsers } from "../hooks";
import { IUserQuery } from "../types";
import UserHead from "./UserHead";
import UserQueryRow from "./UserQueryRow";
import UserRow from "./UserRow";

const limit = 20;

const UserTable = () => {
  const [query, setQuery] = useState<IUserQuery>({ page: 0 });
  const { page } = query;
  const { data, isFetching } = usePaginateUsers(limit, query);
  const handlePage = (page: number) => {
    return () => {
      setQuery((query) => ({ ...query, page: query.page + page }));
    };
  };
  const handleSetPage = (page: number) => {
    setQuery((query) => ({ ...query, page }));
  };
  return (
    <>
      <TablePagination
        {...{
          page,
          limit,
          isLoading: isFetching,
          length: data?.length || 0,
          hasNextPage: !!data?.hasNextPage,
        }}
        onPreviousPage={handlePage(-1)}
        onNextPage={handlePage(1)}
        onSetPage={handleSetPage}
      />
      <div className="overflow-y-auto">
        <Table>
          <TableHead>
            <UserHead />
            <UserQueryRow {...{ setQuery }} />
          </TableHead>
          <TableBody>
            {data?.users &&
              data.users.map((user) => (
                <UserRow key={user._id} {...{ user }} />
              ))}
            {/* {data?.orders &&
              data.orders.map((order) => (
                <OrderRow key={order._id} {...{ order }} />
              ))} */}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        {...{
          page,
          limit,
          isLoading: isFetching,
          length: data?.length || 0,
          hasNextPage: !!data?.hasNextPage,
        }}
        onPreviousPage={handlePage(-1)}
        onNextPage={handlePage(1)}
        onSetPage={handleSetPage}
      />
    </>
  );
};

export default UserTable;
