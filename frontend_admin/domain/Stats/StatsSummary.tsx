import { useRouter } from "next/router";
import React, { useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Checkbox from "components/Checkbox";
import Select from "components/Select";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import { getMonthAndDate } from "services/date";
import { getNumberWithCommas, getPercentage } from "services/math";

import { useStats } from "./hooks";
import { getSummaryStats } from "./services";

const StatsSummary = () => {
  const router = useRouter();
  const { startDate, endDate } = router.query;
  const [name, setName] = useState("Bill");
  const [totalBar, setTotalBar] = useState(false);
  const statsQuery = useStats({
    startDate: startDate as string,
    endDate: endDate as string,
  });
  if (!statsQuery.data) return null;
  const { summaryDelivers, userDelivers } = getSummaryStats(statsQuery.data);
  const total = () =>
    userDelivers.reduce((sum, deliver) => (sum += deliver.total), 0);
  const fee = () =>
    userDelivers.reduce((sum, deliver) => (sum += deliver.fee), 0);
  return (
    <div>
      <label className="flex items-center">
        <Checkbox
          checked={totalBar}
          onChange={(e) => setTotalBar(e.target.checked)}
        />
        <span className="ml-2">總計</span>
      </label>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={summaryDelivers}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {totalBar && <Bar dataKey="total" name="總計" fill="blue" />}
          <Bar dataKey="fee" name="服務費" fill="green" />
        </BarChart>
      </ResponsiveContainer>
      <Table>
        <TableHead>
          <TableRow className="font-medium">
            <TableCell>開單者</TableCell>
            <TableCell align="right">金額</TableCell>
            <TableCell align="right">服務費</TableCell>
            <TableCell align="right">毛利率</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDelivers.map((userDeliver, index) => {
            const { name, total, fee } = userDeliver;
            return (
              <TableRow key={index}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">
                  ${getNumberWithCommas(total)}
                </TableCell>
                <TableCell align="right">${getNumberWithCommas(fee)}</TableCell>
                <TableCell align="right">{getPercentage(fee, total)}</TableCell>
              </TableRow>
            );
          })}
          <TableRow className="font-medium">
            <TableCell>總計</TableCell>
            <TableCell align="right">${getNumberWithCommas(total())}</TableCell>
            <TableCell align="right">${getNumberWithCommas(fee())}</TableCell>
            <TableCell align="right">{getPercentage(fee(), total())}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Select
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-28"
        options={[
          { label: "Bill", value: "Bill" },
          { label: "Andy", value: "Andy" },
          { label: "Candy", value: "Candy" },
          { label: "May", value: "May" },
        ]}
      />
      <Table>
        <TableHead>
          <TableRow className="font-medium">
            <TableCell>流水編號</TableCell>
            <TableCell>進貨日</TableCell>
            <TableCell>團購主題</TableCell>
            <TableCell align="right">金額</TableCell>
            <TableCell align="right">服務費</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDelivers
            .find((d) => d.name === name)
            ?.delivers.map((deliver) => {
              const { postNum, createdAt, title } = deliver;
              const { normalTotal, normalFee } = deliver;
              const { extraTotal, extraFee } = deliver;
              return (
                <TableRow key={deliver._id}>
                  <TableCell>{postNum}</TableCell>
                  <TableCell>{getMonthAndDate(createdAt)}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell align="right">
                    ${getNumberWithCommas(normalTotal + extraTotal)}
                  </TableCell>
                  <TableCell align="right">
                    ${getNumberWithCommas(normalFee + extraFee)}
                  </TableCell>
                </TableRow>
              );
            })}
          <TableRow className="font-medium">
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right">
              $
              {getNumberWithCommas(
                userDelivers.find((d) => d.name === name)?.total
              )}
            </TableCell>
            <TableCell align="right">
              $
              {getNumberWithCommas(
                userDelivers.find((d) => d.name === name)?.fee
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default StatsSummary;
