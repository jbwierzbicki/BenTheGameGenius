import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Key, Link, TestTube2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ApiConfigurationPanelProps {
  isOpen?: boolean;
  onSave?: (config: {
    apiKey: string;
    documentationUrl: string;
    testEndpoint: string;
  }) => void;
  onTest?: () => void;
}

const ApiConfigurationPanel = ({
  isOpen = true,
  onSave = () => {},
  onTest = () => {},
}: ApiConfigurationPanelProps) => {
  const [isExpanded, setIsExpanded] = React.useState(isOpen);
  const [apiKey, setApiKey] = React.useState("");
  const [documentationUrl, setDocumentationUrl] = React.useState("");
  const [testEndpoint, setTestEndpoint] = React.useState("");

  return (
    <Card className="w-full max-w-[600px] p-6 bg-white shadow-sm">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">API Configuration</h2>
            <Badge variant="outline" className="ml-2">
              Optional
            </Badge>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Key
              </Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="documentation-url"
                className="flex items-center gap-2"
              >
                <Link className="h-4 w-4" />
                Documentation URL
              </Label>
              <Input
                id="documentation-url"
                type="url"
                placeholder="https://api.example.com/docs"
                value={documentationUrl}
                onChange={(e) => setDocumentationUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="test-endpoint"
                className="flex items-center gap-2"
              >
                <TestTube2 className="h-4 w-4" />
                Test Endpoint
              </Label>
              <Input
                id="test-endpoint"
                placeholder="/api/v1/test"
                value={testEndpoint}
                onChange={(e) => setTestEndpoint(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => onTest()}
                className="w-24"
              >
                Test
              </Button>
              <Button
                onClick={() =>
                  onSave({ apiKey, documentationUrl, testEndpoint })
                }
                className="w-24"
              >
                Save
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ApiConfigurationPanel;
