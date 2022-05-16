import React, { FC } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import IconButton from "components/Button/IconButton";
import Select from "components/Select";

interface Props {
  page: number;
  length: number;
  limit: number;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  isLoading?: boolean;
  onSetPage: (page: number) => void;
}

const TablePagination: FC<Props> = (props) => {
  const { page, length, limit, hasNextPage, isLoading } = props;
  const { onPreviousPage, onNextPage, onSetPage } = props;
  const pages = [...Array(Math.ceil(length / limit))].map((_, i) => ({
    value: i,
    label: `第${i + 1}頁`,
  }));
  return (
    <div className="flex justify-end items-center mt-2">
      <div>
        <Select
          className="w-20"
          value={page}
          options={pages}
          onChange={(e) => onSetPage(Number(e.target.value))}
        />
      </div>
      <div>
        {page * limit + 1} - {Math.min(page * limit + limit, length)} 之{" "}
        {length}
      </div>
      <IconButton disabled={page <= 0} onClick={onPreviousPage}>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        loading={isLoading}
        disabled={!hasNextPage}
        onClick={onNextPage}
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};

export default TablePagination;
