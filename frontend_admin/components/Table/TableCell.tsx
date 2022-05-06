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

const TableCell: FC<Props> = ({
  children,
  className,
  noPadding,
  center,
  ...props
}) => {
  return (
    <td
      className={`${!noPadding ? "py-1 xl:py-2 px-0.5 xl:px-1" : "p-0"} ${
        center && "text-center"
      } ${className}`}
      {...props}
    >
      {children}
    </td>
  );
};

export default TableCell;
