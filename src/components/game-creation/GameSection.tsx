import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface GameSectionProps {
  title?: string;
  content?: string;
  type?: "rules" | "setup" | "scoring" | "general";
}

const GameSection = ({
  title = "Game Section",
  content = "This section contains important game information that will help players understand and enjoy the game.",
  type = "general",
}: GameSectionProps) => {
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "rules":
        return "default";
      case "setup":
        return "secondary";
      case "scoring":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="w-full p-6 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <Badge variant={getBadgeVariant(type)}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      </div>
      <Separator className="mb-4" />
      <div className="text-gray-700 whitespace-pre-wrap">{content}</div>
    </Card>
  );
};

export default GameSection;
