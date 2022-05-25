import React, { FC, useState } from "react";

import Checkbox from "components/Checkbox";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TextField from "components/TextField";
import LocationSelectorButton from "domain/Location/LocationSelectorButton";

import { IItemLocation } from "../types";

interface Props {
  itemLocation: IItemLocation[];
  setItemLocation: React.Dispatch<React.SetStateAction<IItemLocation[]>>;
}

const ItemsTable: FC<Props> = ({ itemLocation, setItemLocation }) => {
  const [allLocation, setAllLocation] = useState("");
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemLocation((itemLocation) =>
      itemLocation.map((item) => ({
        ...item,
        checked: e.target.checked,
      }))
    );
  };
  const handleChangeCheckedLocation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemLocation((itemLocation) =>
      itemLocation.map((item) => {
        if (!item.checked) return item;
        return { ...item, location: e.target.value };
      })
    );
    setAllLocation(e.target.value);
  };
  const handleSetCheckedLocation = (loc: string) => {
    if (allLocation.match(loc)) return;
    const location = !!allLocation ? `${allLocation}/${loc}` : loc;
    setItemLocation((itemLocation) =>
      itemLocation.map((item) => {
        if (!item.checked) return item;
        return { ...item, location };
      })
    );
    setAllLocation(location);
  };
  const handleCheck = (id: string) => {
    return () => {
      setItemLocation((itemLocation) =>
        itemLocation.map((item) => {
          if (item.id !== id) return item;
          return { ...item, checked: !item.checked };
        })
      );
    };
  };
  const handleChangeItem = (id: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setItemLocation((itemLocation) =>
        itemLocation.map((item) => {
          if (item.id !== id) return item;
          return { ...item, [name]: value };
        })
      );
    };
  };
  const handleChangeLocation = (id: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setItemLocation((itemLocation) =>
        itemLocation.map((item) => {
          if (item.id !== id) return item;
          return { ...item, location: e.target.value };
        })
      );
    };
  };
  const handleSetLocation = (id: string) => {
    return (loc: string) => {
      setItemLocation((itemLocation) =>
        itemLocation.map((item) => {
          if (item.id !== id) return item;
          if (item.location.match(loc)) return item;
          const location = !!item.location ? `${item.location}/${loc}` : loc;
          return { ...item, location };
        })
      );
    };
  };
  return (
    <Table className="text-sm">
      <TableHead>
        <TableRow className="whitespace-nowrap">
          <TableCell></TableCell>
          <TableCell>ID</TableCell>
          <TableCell>商品名稱</TableCell>
          <TableCell className="text-right">數量</TableCell>
          <TableCell className="pl-2">位置</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox
              checked={!itemLocation.some((item) => !item.checked)}
              onChange={handleCheckAll}
            />
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell noPadding className="pl-2 flex">
            <TextField
              value={allLocation}
              noLabel
              className="w-full sm:w-auto"
              variant="standard"
              placeholder="位置"
              onChange={handleChangeCheckedLocation}
            />
            <LocationSelectorButton setLocation={handleSetCheckedLocation} />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {itemLocation.map((item, index) => {
          if (item.qty === 0) return null;
          return (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={item.checked}
                  onChange={handleCheck(item.id)}
                />
              </TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell noPadding>
                <TextField
                  name="item"
                  className="w-full sm:w-auto"
                  variant="standard"
                  value={item.item}
                  onChange={handleChangeItem(item.id)}
                />
              </TableCell>
              <TableCell className="text-right">{item.qty}</TableCell>
              <TableCell noPadding className="pl-2 flex">
                <TextField
                  noLabel
                  className="w-full sm:w-auto"
                  variant="standard"
                  placeholder="位置"
                  value={item.location}
                  onChange={handleChangeLocation(item.id)}
                />
                <LocationSelectorButton
                  setLocation={handleSetLocation(item.id)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ItemsTable;
