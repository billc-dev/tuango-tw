import { ILocationOrderItem, ILocationPostItem } from "domain/Post/types";

export const handleCheckAllItems = (
  setPostItems: React.Dispatch<React.SetStateAction<ILocationPostItem[]>>,
  setOrderItems: React.Dispatch<React.SetStateAction<ILocationOrderItem[]>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostItems((postItems) => {
      postItems.forEach((postItem) => {
        postItem.checked = e.target.checked;
      });
      return [...postItems];
    });
    setOrderItems((orderItems) => {
      orderItems.forEach((orderItem) => {
        orderItem.checked = e.target.checked;
      });
      return [...orderItems];
    });
  };
};

export const handleCheckedLocation = (
  setAllLocation: React.Dispatch<React.SetStateAction<string>>,
  setPostItems: React.Dispatch<React.SetStateAction<ILocationPostItem[]>>
) => {
  return (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | {
          target: {
            value: string;
          };
        }
  ) => {
    setPostItems((postItems) => {
      setAllLocation(e.target.value);
      postItems.forEach((postItem) => {
        if (postItem.checked) postItem.location = e.target.value;
      });
      return [...postItems];
    });
  };
};

export const handleSingleCheck = (
  index: number,
  setOrderItems: React.Dispatch<React.SetStateAction<ILocationOrderItem[]>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderItems((orderItems) => {
      orderItems[index].checked = e.target.checked;
      return [...orderItems];
    });
  };
};

export const handleItemCheck = (
  index: number,
  setPostItems: React.Dispatch<React.SetStateAction<ILocationPostItem[]>>,
  setOrderItems: React.Dispatch<React.SetStateAction<ILocationOrderItem[]>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostItems((postItems) => {
      postItems[index].checked = e.target.checked;
      setOrderItems((orderItems) => {
        orderItems.forEach((orderItem) => {
          if (orderItem.id === postItems[index].id) {
            orderItem.checked = e.target.checked;
          }
        });
        return [...orderItems];
      });
      return [...postItems];
    });
  };
};

export const handleItemLocation = (
  index: number,
  setPostItems: React.Dispatch<React.SetStateAction<ILocationPostItem[]>>
) => {
  return (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | {
          target: {
            value: string;
          };
        }
  ) => {
    setPostItems((postItems) => {
      postItems[index].location = e.target.value;
      return [...postItems];
    });
  };
};
