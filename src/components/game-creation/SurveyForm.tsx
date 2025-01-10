import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SurveyFormProps {
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
}

const SurveyForm = ({
  onSubmit = () => {},
  isLoading = false,
}: SurveyFormProps) => {
  return (
    <Card className="w-full max-w-[800px] p-6 bg-white">
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({});
        }}
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Game Creation Survey
          </h2>

          {/* Player Count Section */}
          <div className="space-y-2">
            <Label htmlFor="playerCount">
              How many players is the game designed for?
            </Label>
            <Select defaultValue="2-4">
              <SelectTrigger id="playerCount">
                <SelectValue placeholder="Select player count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Single Player</SelectItem>
                <SelectItem value="2-4">2-4 Players</SelectItem>
                <SelectItem value="5-8">5-8 Players</SelectItem>
                <SelectItem value="8+">8+ Players</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Game Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Estimated game duration</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select game duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quick">Quick (5-15 minutes)</SelectItem>
                <SelectItem value="medium">Medium (15-45 minutes)</SelectItem>
                <SelectItem value="long">Long (45+ minutes)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Game Type */}
          <div className="space-y-2">
            <Label>Game Type</Label>
            <RadioGroup
              defaultValue="strategy"
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="strategy" id="strategy" />
                <Label htmlFor="strategy">Strategy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="party" id="party" />
                <Label htmlFor="party">Party Game</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="educational" id="educational" />
                <Label htmlFor="educational">Educational</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Card Game</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Complexity Level */}
          <div className="space-y-2">
            <Label htmlFor="complexity">Game Complexity</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="complexity">
                <SelectValue placeholder="Select complexity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple - Easy to learn</SelectItem>
                <SelectItem value="medium">
                  Medium - Some strategy required
                </SelectItem>
                <SelectItem value="complex">
                  Complex - Deep strategic elements
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Special Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements">
              Special Requirements or Components
            </Label>
            <Textarea
              id="requirements"
              placeholder="Enter any special components or materials needed for the game..."
              className="min-h-[100px]"
              defaultValue="Standard playing cards, dice, or common household items"
            />
          </div>

          {/* Theme/Setting */}
          <div className="space-y-2">
            <Label htmlFor="theme">Preferred Theme or Setting</Label>
            <Input
              id="theme"
              placeholder="e.g., Fantasy, Sci-fi, Historical, etc."
              defaultValue="Fantasy"
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Generating Game..." : "Generate Game"}
        </Button>
      </form>
    </Card>
  );
};

export default SurveyForm;
