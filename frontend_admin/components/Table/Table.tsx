import React from "react";
import { FC } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  children?: React.ReactNode;
}
const Table: FC<Props> = ({ children, className, ...props }) => {
  return (
    <table className={`table-auto w-full mx-auto ${className}`} {...props}>
      {children}
    </table>
  );
};

export default Table;
