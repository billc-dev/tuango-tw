import { IDeliver } from "domain/Deliver/types";
import { getFullDate } from "services/date";

interface SummaryDeliver {
  name: string;
  total: number;
  fee: number;
}

interface UserDeliver {
  name: string;
  total: number;
  fee: number;
  delivers: IDeliver[];
}

export const getSummaryStats = (delivers: IDeliver[]) => {
  const summaryDelivers: SummaryDeliver[] = [];
  const userDelivers: UserDeliver[] = [
    {
      name: "Andy",
      total: 0,
      fee: 0,
      delivers: [],
    },
    {
      name: "Candy",
      total: 0,
      fee: 0,
      delivers: [],
    },
    {
      name: "May",
      total: 0,
      fee: 0,
      delivers: [],
    },
    {
      name: "Bill",
      total: 0,
      fee: 0,
      delivers: [],
    },
    { name: "其他", total: 0, fee: 0, delivers: [] },
  ];
  for (const deliver of delivers) {
    const { createdAt, normalTotal, extraTotal } = deliver;
    const { normalFee, extraFee } = deliver;
    const index = summaryDelivers.findIndex(
      (d) => d.name === getFullDate(createdAt)
    );
    if (index === -1) {
      summaryDelivers.push({
        name: getFullDate(createdAt),
        total: normalTotal + extraTotal,
        fee: normalFee + extraFee,
      });
    } else {
      summaryDelivers[index].total += normalTotal + extraTotal;
      summaryDelivers[index].fee += normalFee + extraFee;
    }

    if (deliver.userId === "Ua98233a523a24bdf724a6385c01a51c4") {
      userDelivers[0].total += normalTotal + extraTotal;
      userDelivers[0].fee += normalFee + extraFee;
      userDelivers[0].delivers.push(deliver);
    } else if (
      deliver.userId === "U0f16fc51aa6174d1ba5d09ddee3a58cd" ||
      deliver.userId === "145044048032078"
    ) {
      userDelivers[1].total += normalTotal + extraTotal;
      userDelivers[1].fee += normalFee + extraFee;
      userDelivers[1].delivers.push(deliver);
    } else if (deliver.userId === "U7fd5aa01607a3810204b6a13e785513c") {
      userDelivers[2].total += normalTotal + extraTotal;
      userDelivers[2].fee += normalFee + extraFee;
      userDelivers[2].delivers.push(deliver);
    } else if (deliver.userId === "Uff198d960ec3bc20513bfc583a09dde3") {
      userDelivers[3].total += normalTotal + extraTotal;
      userDelivers[3].fee += normalFee + extraFee;
      userDelivers[3].delivers.push(deliver);
    } else {
      userDelivers[4].total += normalTotal + extraTotal;
      userDelivers[4].fee += normalFee + extraFee;
    }
  }
  return { summaryDelivers, userDelivers };
};
