import React, { useState } from "react";

import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableHead from "components/Table/TableHead";
import TablePagination from "components/Table/TablePagination";

import { useOrders } from "../hooks";
import { OrderQuery } from "../types";
import OrderHead from "./OrderHead";
import OrderQueryRow from "./OrderQueryRow";
import OrderRow from "./OrderRow";

const limit = 20;

const OrderTable = () => {
  const [query, setQuery] = useState<OrderQuery>({ page: 0 });
  const { data, isFetching } = useOrders(limit, query);
  const { page } = query;
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
            <OrderHead />
            <OrderQueryRow {...{ setQuery }} />
          </TableHead>
          <TableBody>
            {data?.orders &&
              data.orders.map((order) => (
                <OrderRow key={order._id} {...{ order }} />
              ))}
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

export default OrderTable;
