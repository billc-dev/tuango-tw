import React from "react";
import { FC } from "react";

interface Props {
  children?: React.ReactNode;
}
const Table: FC<Props> = ({ children }) => {
  return <table className="table-auto w-full mx-auto">{children}</table>;
};

export default Table;
