import { FC } from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface TableBlockProps {
  objkey: string;
  value: any;
}

export const TableBlock = ({ objkey, value }: TableBlockProps) => {
  return (
    <tr>
      <td>{objkey}:</td>
      <td>{value}</td>
    </tr>
  );
};
