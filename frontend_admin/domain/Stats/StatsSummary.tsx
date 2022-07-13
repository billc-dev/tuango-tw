import { useRouter } from "next/router";
import { useState } from "react";

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

import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Select from "components/Select";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableCell from "components/Table/TableCell";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import { useEditDeliverUserId } from "domain/Deliver/hooks";
import PostChangeTotalButton from "domain/Post/PostTable/PostChangeTotalButton";
import { getMonthAndDate } from "services/date";
import { getNumberWithCommas, getPercentage } from "services/math";

import { useStats } from "./hooks";
import { getSummaryStats } from "./services";

const StatsSummary = () => {
  const router = useRouter();
  const { startDate, endDate } = router.query;
  const [name, setName] = useState("Bill");
  const [userId, setUserId] = useState("Uff198d960ec3bc20513bfc583a09dde3");
  const [totalBar, setTotalBar] = useState(false);
  const [deliverIds, setDeliverIds] = useState<string[]>([]);
  const editDeliverUserId = useEditDeliverUserId();
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
          checkboxSize="large"
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
        onChange={(e) => {
          setName(e.target.value);
          setDeliverIds([]);
        }}
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
            <TableCell></TableCell>
            <TableCell>流水編號</TableCell>
            <TableCell>進貨日</TableCell>
            <TableCell>團購主題</TableCell>
            <TableCell align="right">金額</TableCell>
            <TableCell align="right">服務費</TableCell>
            <TableCell className="min-w-[48px] w-12" center>
              更改金額
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deliverIds.length > 0 && (
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <strong>更改團主</strong>
              </TableCell>
              <TableCell colSpan={5}>
                <div className="flex">
                  <Select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-20"
                    options={[
                      {
                        label: "Bill",
                        value: "Uff198d960ec3bc20513bfc583a09dde3",
                      },
                      {
                        label: "Andy",
                        value: "Ua98233a523a24bdf724a6385c01a51c4",
                      },
                    ]}
                  />
                  <Button
                    variant="primary"
                    loading={editDeliverUserId.isLoading}
                    onClick={() => {
                      if (deliverIds.length < 0) return;
                      editDeliverUserId.mutate({ deliverIds, userId });
                    }}
                  >
                    更改
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
          {userDelivers
            .find((d) => d.name === name)
            ?.delivers.map((deliver) => {
              const { postNum, createdAt, title } = deliver;
              const { normalTotal, normalFee } = deliver;
              const { extraTotal, extraFee } = deliver;
              return (
                <TableRow key={deliver._id}>
                  <TableCell>
                    <Checkbox
                      checkboxSize="large"
                      onChange={(e) => {
                        const { checked } = e.target;
                        if (checked)
                          setDeliverIds((checkedDeliverIds) => [
                            ...checkedDeliverIds,
                            deliver._id,
                          ]);
                        else
                          setDeliverIds((checkedDeliverIds) =>
                            checkedDeliverIds.filter(
                              (deliverId) => deliverId !== deliver._id
                            )
                          );
                      }}
                      checked={deliverIds.some(
                        (deliverId) => deliverId === deliver._id
                      )}
                    />
                  </TableCell>
                  <TableCell>{postNum}</TableCell>
                  <TableCell>{getMonthAndDate(createdAt)}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell align="right">
                    ${getNumberWithCommas(normalTotal + extraTotal)}
                  </TableCell>
                  <TableCell align="right">
                    ${getNumberWithCommas(normalFee + extraFee)}
                  </TableCell>
                  <TableCell>
                    <PostChangeTotalButton postId={deliver.postId} />
                  </TableCell>
                </TableRow>
              );
            })}
          <TableRow className="font-medium">
            <TableCell colSpan={4} />
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
