import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw, Download } from "lucide-react";
import GameSection from "./GameSection";

interface GeneratedGameDisplayProps {
  gameTitle?: string;
  rules?: string;
  setup?: string;
  scoring?: string;
  onRegenerateClick?: () => void;
  onExportClick?: () => void;
}

const GeneratedGameDisplay = ({
  gameTitle = "Space Explorer Card Game",
  rules = "Players take turns drawing cards and moving their spaceship tokens across the galaxy board. Collect resource cards and avoid space hazards. First player to reach the destination planet wins!",
  setup = "1. Shuffle the deck of space cards\n2. Each player gets a spaceship token\n3. Place tokens on the start planet\n4. Deal 5 cards to each player",
  scoring = "Players earn points for:\n- Collecting resource cards: 2 points each\n- Avoiding hazards: 1 point each\n- Reaching checkpoints: 5 points\n- First to destination: 10 bonus points",
  onRegenerateClick = () => console.log("Regenerate clicked"),
  onExportClick = () => console.log("Export clicked"),
}: GeneratedGameDisplayProps) => {
  return (
    <Card className="w-full h-full max-w-[800px] mx-auto bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{gameTitle}</h2>
        <div className="space-x-4">
          <Button variant="outline" size="sm" onClick={onRegenerateClick}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          <Button variant="default" size="sm" onClick={onExportClick}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-4rem)] pr-4">
        <div className="space-y-6">
          <GameSection title="Game Rules" content={rules} type="rules" />
          <GameSection
            title="Setup Instructions"
            content={setup}
            type="setup"
          />
          <GameSection
            title="Scoring System"
            content={scoring}
            type="scoring"
          />
        </div>
      </ScrollArea>
    </Card>
  );
};

export default GeneratedGameDisplay;
