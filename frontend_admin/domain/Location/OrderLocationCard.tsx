import React, { FC, useEffect, useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

import Button from "components/Button";
import IconButton from "components/Button/IconButton";
import Card from "components/Card";
import Checkbox from "components/Checkbox";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";
import { getPostTitle } from "domain/Post/services";
import { ILocationPost } from "domain/Post/types";

import LocationSelectorButton from "./LocationSelectorButton";
import { useUpdateLocationOrders } from "./hooks";
import {
  handleCheckAllItems,
  handleCheckedLocation,
  handleItemCheck,
  handleItemLocation,
  handleSingleCheck,
} from "./services";

interface Props {
  post: ILocationPost;
}

const OrderLocationCard: FC<Props> = ({ post }) => {
  const updateLocationOrders = useUpdateLocationOrders();
  const [allLocation, setAllLocation] = useState("");
  const [postItems, setPostItems] = useState(
    post.items
      .sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
      .map((item) => {
        return {
          ...item,
          qty: post.orderItems.reduce((sum, orderItem) => {
            if (orderItem.id === item.id) return sum + orderItem.qty;
            return sum;
          }, 0),
        };
      })
  );
  const [orderItems, setOrderItems] = useState(post.orderItems);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOrderItems(post.orderItems);
  }, [post.orderItems]);
  return (
    <Card className="p-2 bg-white ring-1 ring-zinc-300">
      <div className="flex justify-between items-center cursor-pointer">
        <p onClick={() => !open && setOpen(!open)}>{getPostTitle(post)}</p>
        <div>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </IconButton>
        </div>
      </div>
      {open && (
        <>
          <Button
            fullWidth
            variant="primary"
            disabled={!orderItems.some((item) => item.checked)}
            loading={updateLocationOrders.isLoading}
            onClick={() =>
              updateLocationOrders.mutate({ postItems, orderItems })
            }
          >
            更改位置
          </Button>
          <Table className="text-sm">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checkboxSize="large"
                    onChange={handleCheckAllItems(setPostItems, setOrderItems)}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>商品名稱</TableCell>
                <TableCell>數量</TableCell>
                <TableCell noPadding className="flex">
                  <TextField
                    className="w-32"
                    variant="standard"
                    noLabel
                    placeholder="位置"
                    value={allLocation}
                    onChange={handleCheckedLocation(
                      setAllLocation,
                      setPostItems
                    )}
                  />
                  <LocationSelectorButton
                    setLocation={(loc) => {
                      const e = {
                        target: {
                          value: !!allLocation ? `${allLocation}/${loc}` : loc,
                        },
                      };
                      handleCheckedLocation(setAllLocation, setPostItems)(e);
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checkboxSize="large"
                      checked={item.checked}
                      onChange={handleItemCheck(
                        index,
                        setPostItems,
                        setOrderItems
                      )}
                    />
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell noPadding className="flex">
                    <TextField
                      value={item.location}
                      className="w-32"
                      variant="standard"
                      noLabel
                      placeholder="位置"
                      onChange={handleItemLocation(index, setPostItems)}
                    />
                    <LocationSelectorButton
                      setLocation={(loc) => {
                        if (item.location.match(loc)) return;
                        const value = item.location
                          ? `${item.location}/${loc}`
                          : loc;

                        const e = { target: { value } };
                        handleItemLocation(index, setPostItems)(e);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table className="text-sm">
            <TableHead>
              <TableRow className="whitespace-nowrap">
                <TableCell></TableCell>
                <TableCell>序號</TableCell>
                <TableCell>訂單</TableCell>
                <TableCell>名稱</TableCell>
                <TableCell className="min-w-[60px]">位置</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.map((order, index) => (
                <TableRow key={order.orderNum}>
                  <TableCell>
                    <Checkbox
                      checkboxSize="large"
                      checked={order.checked}
                      onChange={handleSingleCheck(index, setOrderItems)}
                    />
                  </TableCell>
                  <TableCell>{order.orderNum}</TableCell>
                  <TableCell>
                    {order.id}+{order.qty}
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-1">{order.displayName}</p>
                  </TableCell>
                  <TableCell>{order.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Card>
  );
};

export default OrderLocationCard;
