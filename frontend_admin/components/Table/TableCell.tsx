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
      className={`${!noPadding && "py-1 xl:py-2 pr-1 xl:pr-2"} ${
        center && "text-center"
      } ${className}`}
      {...props}
    >
      {children}
    </td>
  );
};

export default TableCell;
