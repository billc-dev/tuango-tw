import React, { useState } from "react";

import Button from "components/Button";
import LoadingIndicator from "components/Indicator/LoadingIndicator";
import TextField from "components/TextField";

import LocationSelector from "./LocationSelector";
import OrderLocationCard from "./OrderLocationCard";
import { useLocationOrders } from "./hooks";
import { LocationQuery } from "./types";

const Location = () => {
  const [query, setQuery] = useState<LocationQuery>({});
  const ordersQuery = useLocationOrders(query);
  const handleSetLocation = (location: string) => {
    setQuery((query) => ({ ...query, location }));
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const { name, value } = e.currentTarget;
    setQuery((query) => ({ ...query, [name]: value }));
  };
  return (
    <div className="max-w-sm mx-auto my-2">
      <LoadingIndicator loading={ordersQuery.isLoading} />
      {ordersQuery.data ? (
        <>
          <Button onClick={() => setQuery({})}>重置</Button>
          {ordersQuery.data.map((post) => (
            <OrderLocationCard key={post.postNum} post={post} />
          ))}
        </>
      ) : (
        <>
          <div className="flex">
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                name="postNum"
                placeholder="流水編號"
                noLabel
                variant="standard"
                type="number"
                onKeyDown={handleKeyDown}
              />
            </form>
            <TextField
              name="text"
              placeholder="關鍵字"
              noLabel
              variant="standard"
              onKeyDown={handleKeyDown}
            />
          </div>
          <LocationSelector setLocation={handleSetLocation} />
        </>
      )}
    </div>
  );
};

export default Location;
