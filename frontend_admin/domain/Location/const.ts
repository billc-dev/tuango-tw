import { indexAlphabet } from "utils";

export interface ILocation {
  value: string;
  span: number;
  label?: string;
  children?: ILocation[];
}

export const locations: ILocation[] = [
  {
    value: "保",
    span: 6,
    children: [
      { value: "保", span: 6 },
      { value: "保1", span: 6 },
      { value: "保2", span: 6 },
      { value: "保3", span: 6 },
      { value: "保紅", span: 6 },
      { value: "保藍", span: 6 },
    ],
  },
  {
    value: "鐵",
    span: 6,
    children: [
      { value: "鐵", span: 12 },
      ...[...Array(5)].map((_, index) => ({
        value: `鐵${index + 1}`,
        span: 12,
      })),
    ],
  },
  {
    value: "冰",
    span: 6,
    children: [
      { value: "冰A", span: 12 },
      { value: "冰B", span: 12 },
      {
        value: "冰A1",
        span: 12,
        children: [...Array(6)].map((_, index) => ({
          value: `冰A1-${index + 1}`,
          span: 4,
        })),
      },
      {
        value: "冰A2",
        span: 12,
        children: [...Array(6)].map((_, index) => ({
          value: `冰A2-${index + 1}`,
          span: 4,
        })),
      },
      ...[...Array(5)].map((_, index) => ({
        value: `冰B${index + 1}`,
        span: 12,
      })),
    ],
  },
  {
    value: "凍",
    span: 6,
    children: [
      { value: "凍A", span: 12 },
      { value: "凍B", span: 12 },
      {
        value: "凍A1",
        span: 12,
        children: [...Array(6)].map((_, index) => ({
          value: `凍A1-${index + 1}`,
          span: 4,
        })),
      },
      {
        value: "凍A2",
        span: 12,
        children: [...Array(6)].map((_, index) => ({
          value: `凍A2-${index + 1}`,
          span: 4,
        })),
      },
      {
        value: "凍B1",
        span: 12,
        children: [...Array(4)].map((_, index) => ({
          value: `凍B1-${index + 1}`,
          span: 6,
        })),
      },
      {
        value: "凍B2",
        span: 12,
        children: [...Array(4)].map((_, index) => ({
          value: `凍B2-${index + 1}`,
          span: 6,
        })),
      },
      {
        value: "凍B3",
        span: 12,
        children: [...Array(4)].map((_, index) => ({
          value: `凍B3-${index + 1}`,
          span: 6,
        })),
      },
      {
        value: "凍B4",
        span: 12,
        children: [...Array(4)].map((_, index) => ({
          value: `凍B4-${index + 1}`,
          span: 6,
        })),
      },
      {
        value: "凍B5",
        span: 12,
        children: [...Array(4)].map((_, index) => ({
          value: `凍B5-${index + 1}`,
          span: 6,
        })),
      },
    ],
  },
  {
    value: "A-Z",
    span: 6,
    children: indexAlphabet.split("").map((char) => ({
      value: char,
      span: 4,
    })),
  },
  {
    value: "玻璃",
    span: 6,
    children: [
      { value: "玻璃", span: 12 },
      ...[...Array(6)].map((_, index) => ({
        value: `玻璃${index + 1}`,
        span: 12,
      })),
      { value: "玻璃前", span: 12 },
    ],
  },
  {
    value: "其他",
    span: 6,
    children: [
      { value: "門口", span: 6 },
      { value: "門口籃子", span: 6 },
      { value: "水架前", span: 6 },
      { value: "板凳", span: 6 },
      { value: "太陽眼鏡", span: 6 },
      { value: "童車區", span: 6 },
    ],
  },
  { value: "", label: "尚無位置", span: 6 },
];

export default locations;
