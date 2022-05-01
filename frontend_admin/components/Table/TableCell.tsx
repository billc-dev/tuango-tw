import React from "react";
import { FC } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {
  center?: boolean;
  noPadding?: boolean;
}

const TableCell: FC<Props> = ({ children, className, noPadding, center }) => {
  return (
    <td
      className={`${!noPadding && "py-1 lg:py-2 pr-1 lg:pr-2"} ${
        center && "text-center"
      } ${className}`}
    >
      {children}
    </td>
  );
};

export default TableCell;
