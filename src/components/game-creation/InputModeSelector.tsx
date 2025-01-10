import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Gamepad2, ClipboardList } from "lucide-react";

interface InputModeSelectorProps {
  onModeChange?: (mode: "description" | "survey") => void;
  activeMode?: "description" | "survey";
}

const InputModeSelector = ({
  onModeChange = () => {},
  activeMode = "description",
}: InputModeSelectorProps) => {
  return (
    <Card className="w-full p-4 bg-white border-b">
      <Tabs
        defaultValue={activeMode}
        className="w-full"
        onValueChange={(value) =>
          onModeChange(value as "description" | "survey")
        }
      >
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="description" className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            <span>Description</span>
          </TabsTrigger>
          <TabsTrigger value="survey" className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            <span>Survey</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="description"
          className="mt-4 text-center text-sm text-muted-foreground"
        >
          Describe your game idea in natural language
        </TabsContent>
        <TabsContent
          value="survey"
          className="mt-4 text-center text-sm text-muted-foreground"
        >
          Answer questions to shape your game
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default InputModeSelector;
