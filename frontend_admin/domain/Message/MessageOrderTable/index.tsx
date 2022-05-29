import React, { useState } from "react";

import Checkbox from "components/Checkbox";
import LoadingIndicator from "components/Indicator/LoadingIndicator";
import Select from "components/Select";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableHead from "components/Table/TableHead";
import { useOrders } from "domain/Order/hooks";
import { storageTypeOptions } from "domain/Post/services";
import { getYesterday } from "services/date";

import { MessageOrderQuery } from "../types";
import MessageOrderHead from "./MessageOrderHead";
import MessageOrderQueryRow from "./MessageOrderQueryRow";
import MessageOrderRow from "./MessageOrderRow";
import Messager from "./Messager";

const MessageOrderTable = () => {
  const [userIds, setUserIds] = useState<string[]>([]);
  const [query, setQuery] = useState<MessageOrderQuery>({
    deliveredAt: getYesterday(),
  });
  const ordersQuery = useOrders(query);
  return (
    <div className="col-span-full md:col-span-2 md:h-[90vh] md:overflow-y-auto">
      <LoadingIndicator loading={ordersQuery.isLoading} />
      <Messager {...{ userIds, setUserIds, query, setQuery }} />
      <div className="my-2 flex">
        <p className="whitespace-nowrap">
          儲存方式:
          <Select
            height="normal"
            className="w-24 ml-2"
            options={[{ value: "", label: "全部" }, ...storageTypeOptions]}
            onChange={(e) =>
              setQuery((query) => ({ ...query, storageType: e.target.value }))
            }
          />
        </p>
        <label className="flex items-center ml-2">
          <Checkbox
            checkboxSize="large"
            checked={!!query.deliveredAt}
            onChange={(e) => {
              if (e.target.checked) {
                setQuery((query) => ({
                  ...query,
                  deliveredAt: getYesterday(),
                }));
              } else {
                setQuery((query) => ({ ...query, deliveredAt: "" }));
              }
            }}
          />
          <span className="ml-2">昨天到貨</span>
        </label>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <MessageOrderHead />
            <MessageOrderQueryRow
              {...{ query, setQuery, setUserIds, orders: ordersQuery.data }}
            />
          </TableHead>
          <TableBody>
            {ordersQuery.data?.map((order) => (
              <MessageOrderRow
                key={order._id}
                {...{ order, userIds, setUserIds }}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MessageOrderTable;
