import React, { useState } from "react";
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

interface FormState {
  playerCount: string;
  duration: string;
  gameType: string;
  complexity: string;
  requirements: string;
  theme: string;
}

const SurveyForm = ({
  onSubmit = () => {},
  isLoading = false,
}: SurveyFormProps) => {
  const [formData, setFormData] = useState<FormState>({
    playerCount: "2-4",
    duration: "medium",
    gameType: "strategy",
    complexity: "medium",
    requirements: "",
    theme: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.playerCount) newErrors.playerCount = "Required";
    if (!formData.complexity) newErrors.complexity = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="w-full max-w-[800px] p-6 bg-white">
      <form
        className="space-y-8"
        onSubmit={handleSubmit}
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
            <Select
              value={formData.playerCount}
              onValueChange={(v) => setFormData(p => ({...p, playerCount: v}))}
            >
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
            {errors.playerCount && <p className="text-red-500 text-sm">{errors.playerCount}</p>}
          </div>

          {/* Game Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Estimated game duration</Label>
            <Select
              value={formData.duration}
              onValueChange={(v) => setFormData(p => ({...p, duration: v}))}
            >
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
            <Select
              value={formData.complexity}
              onValueChange={(v) => setFormData(p => ({...p, complexity: v}))}
            >
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
              value={formData.requirements}
              onChange={(e) => setFormData(p => ({...p, requirements: e.target.value}))}
            />
          </div>

          {/* Theme/Setting */}
          <div className="space-y-2">
            <Label htmlFor="theme">Preferred Theme or Setting</Label>
            <Input
              id="theme"
              placeholder="e.g., Fantasy, Sci-fi, Historical, etc."
              value={formData.theme}
              onChange={(e) => setFormData(p => ({...p, theme: e.target.value}))}
            />
            {errors.theme && <p className="text-red-500 text-sm">{errors.theme}</p>}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          {isLoading ? "Generating Game..." : "Generate Game"}
        </Button>
      </form>
    </Card>
  );
};

export default SurveyForm;
