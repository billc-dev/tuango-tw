import React from "react";
import { FC } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {}

const TableRow: FC<Props> = ({ children, className }) => {
  return (
    <tr className={`border-b ${className} last:border-b-0`}>{children}</tr>
  );
};

export default TableRow;
