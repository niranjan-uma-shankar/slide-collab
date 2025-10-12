import { LiveList } from "@liveblocks/client";

export type Document = {
  id: string;
  name: string;
  createdAt: string;
  slideCount?: number;
};

export type TextElement = {
  id: string;
  type: "text";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  color: string;
  listItems?: string[]; // For list types
};

export type Slide = {
  id: string;
  elements: LiveList<TextElement>;
};
