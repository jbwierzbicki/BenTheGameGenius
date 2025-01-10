import React from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Wand2 } from "lucide-react";

interface DescriptionInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onGenerate?: () => void;
  isGenerating?: boolean;
  placeholder?: string;
}

const DescriptionInput = ({
  value = "",
  onChange = () => {},
  onGenerate = () => {},
  isGenerating = false,
  placeholder = 'Describe your dream game! For example: "A cooperative card game where players work together to build a magical garden. Players can collect different types of seeds, plant them, and help them grow while dealing with weather challenges..."',
}: DescriptionInputProps) => {
  return (
    <Card className="w-full p-6 bg-white">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Describe Your Game
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onGenerate}
                  disabled={isGenerating}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate Game"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to generate your game based on the description</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px] text-base"
        />

        <div className="flex items-center justify-between text-sm text-gray-500">
          <p>
            Be as detailed as you'd like - describe theme, mechanics, player
            count, or anything else!
          </p>
          <p>{value.length} characters</p>
        </div>
      </div>
    </Card>
  );
};

export default DescriptionInput;
