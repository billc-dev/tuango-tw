import React, { FC } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {}

const TableBody: FC<Props> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export default TableBody;
