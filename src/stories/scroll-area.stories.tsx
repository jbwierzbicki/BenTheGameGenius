// [build] library: 'shadcn'
import React from "react";
import { FixedSizeList } from 'react-window';

import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";

const meta = {
  title: "ui/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
  <div style={style} className="text-sm">
    Tag {index + 1}
    <Separator className="my-2" />
  </div>
);

export const ScrollAreaStory = () => (
  <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
    <FixedSizeList
      height={200}
      width={350}
      itemSize={35}
      itemCount={50}
    >
      {Row}
    </FixedSizeList>
  </ScrollArea>
);
