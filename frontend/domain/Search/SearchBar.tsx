import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Button from "components/Button";
import TabButton from "components/Tab/TabButton";
import TabContainer from "components/Tab/TabContainer";
import TextField from "components/TextField";
import { getFormattedDate } from "services/date";

import { QueryTypes } from "./types";

const types = {
  text: { label: "關鍵字", type: "text" },
  postNum: { label: "流水編號", type: "number" },
  deadline: { label: "結單日", type: "date" },
  deliveryDate: { label: "到貨日", type: "date" },
};

const SearchBar = () => {
  const router = useRouter();
  const type = router.query.type as QueryTypes;
  const [value, setValue] = useState<string | number>("");
  const isQueryType = (type: string) =>
    ["text", "postNum", "deadline", "deliveryDate"].includes(type);
  const handleChange = (type: string) => {
    if (!isQueryType(type)) {
      router.push({ query: { type: "text" } }, undefined, { shallow: true });
      return;
    }
    router.push({ query: { type } }, undefined, { shallow: true });
    if (type === "text" || type === "postNum") setValue("");
    else setValue(getFormattedDate());
  };
  const handleQuickDate = (days: number) => {
    const date = getFormattedDate(days);
    setValue(date);
    router.push(
      { query: { ...router.query, type: "deadline", value: date } },
      undefined,
      { shallow: true }
    );
  };
  useEffect(() => {
    if (!router.isReady) return;
    if (typeof router.query.value === "string") setValue(router.query.value);
    if (type) return;
    router.push({ query: { type: "text" } }, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div>
      <div>
        <TabContainer>
          <TabButton
            selected={type === "text"}
            onClick={() => handleChange("text")}
          >
            {types.text.label}
          </TabButton>
          <TabButton
            selected={type === "postNum"}
            onClick={() => handleChange("postNum")}
          >
            {types.postNum.label}
          </TabButton>
          <TabButton
            selected={type === "deadline"}
            onClick={() => handleChange("deadline")}
          >
            {types.deadline.label}
          </TabButton>
          <TabButton
            selected={type === "deliveryDate"}
            onClick={() => handleChange("deliveryDate")}
          >
            {types.deliveryDate.label}
          </TabButton>
        </TabContainer>
      </div>
      <div className="mt-1 mb-2 flex justify-around">
        <Button onClick={() => handleQuickDate(0)}>今天結單</Button>
        <Button onClick={() => handleQuickDate(1)}>明天結單</Button>
        <Button onClick={() => handleQuickDate(2)}>後天結單</Button>
      </div>
      {isQueryType(type) && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(
              { query: { ...router.query, type, value } },
              undefined,
              { shallow: true }
            );
          }}
        >
          <div className="px-1.5">
            <TextField
              type={types[type].type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`搜尋${types[type].label}`}
            />
            <Button
              disabled={!value}
              variant="primary"
              fullWidth
              size="lg"
              type="submit"
            >
              搜尋
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
