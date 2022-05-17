import React, { FC } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {}

const TableHead: FC<Props> = ({ children }) => {
  return <thead className="border-b">{children}</thead>;
};

export default TableHead;
