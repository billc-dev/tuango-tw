import React from "react";

import Button from "components/Button";

const deliver = () => {
  return (
    <div className="px-2 pt-2">
      <p className="text-xl">送貨步驟:</p>
      <p>1.到總覽→訂單 截圖要送貨的單子</p>
      <p>2.將截圖傳給我們並附上希望的送貨日</p>
      <p>3.標記商品</p>
      <p className="text-xl pt-2">標記商品規則</p>
      <table className="table-auto">
        <thead>
          <tr className="border-b">
            <td className="py-2">狀況</td>
            <td className="py-2">人數少於5</td>
            <td className="py-2">人數大於5</td>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2">A項</td>
            <td className="py-2">
              將每一樣商品貼上流水編號，序號和名稱
              <br />
              <Button className="mb-1">#13955 1.Andy</Button>
              <Button className="mb-1">#13955 2.May</Button>
            </td>
            <td className="py-2">
              貼上一個流水編號
              <Button>#13955</Button>
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2">B項以上並能容易分辨</td>
            <td className="py-2">
              把訂購人的商品打包並將每一樣商品貼上流水編號，序號和名稱
              <br />
              <Button className="mb-1">#13955 1.Andy</Button>
              <Button className="mb-1">#13955 2.May</Button>
            </td>
            <td className="py-2">
              一項商品貼上一個流水編號
              <br />
              <Button className="mb-1">#13955A</Button>
              <Button className="mb-1">#13955B</Button>
              <Button className="mb-1">#13955C</Button>
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2">複雜的商品例:多種顏色尺寸</td>
            <td className="py-2" colSpan={2}>
              把訂購人的商品打包並將每一樣商品貼上流水編號，序號和名稱
              <br />
              <Button className="mb-1">#13955 1.Andy</Button>
              <Button className="mb-1">#13955 2.May</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default deliver;
