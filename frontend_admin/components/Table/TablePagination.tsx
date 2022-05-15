import React, { FC } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import IconButton from "components/Button/IconButton";

interface Props {
  page: number;
  length: number;
  limit: number;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  isLoading?: boolean;
}

const TablePagination: FC<Props> = (props) => {
  const { page, length, limit, hasNextPage } = props;
  const { onPreviousPage, onNextPage, isLoading } = props;
  return (
    <div className="flex justify-end items-center mt-2">
      <div>
        {page * limit + 1} - {length + page * limit} 之 {length}
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
