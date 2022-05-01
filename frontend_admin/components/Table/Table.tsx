import React from "react";
import { FC } from "react";

interface Props {
  children?: React.ReactNode;
}
const Table: FC<Props> = ({ children }) => {
  return (
    <table className="table-auto w-full overflow-y-auto mx-auto mt-2">
      {children}
    </table>
  );
};

export default Table;
