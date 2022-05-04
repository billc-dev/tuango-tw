import React from "react";
import { FC } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {}

const TableRow: FC<Props> = ({ children, className }) => {
  return <tr className={`border-b ${className}`}>{children}</tr>;
};

export default TableRow;
