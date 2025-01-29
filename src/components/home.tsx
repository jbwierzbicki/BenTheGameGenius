import { secureStorage } from "@/lib/security";
import React, { useState, useEffect } from "react";
import InputModeSelector from "./game-creation/InputModeSelector";
import DescriptionInput from "./game-creation/DescriptionInput";
import SurveyForm from "./game-creation/SurveyForm";
import ApiConfigurationPanel from "./game-creation/ApiConfigurationPanel";
import GeneratedGameDisplay from "./game-creation/GeneratedGameDisplay";

const Home = () => {
  const [activeMode, setActiveMode] = useState<"description" | "survey">(
    "description",
  );
  const [gameDescription, setGameDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedGame, setGeneratedGame] = useState(null);

  const handleGenerate = async (formData?: any) => {
    const controller = new AbortController();
    const apiKey = await secureStorage.getItem("apiKey");
    
    try {
      setIsGenerating(true);
      setError(null);

      const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
        signal: controller.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          ...(formData || { description: gameDescription }),
          testEndpoint: "/api/v1/test"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate game');
      }

      const data = await response.json();
      setGeneratedGame(data);

    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to generate game');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Add cleanup effect
  useEffect(() => {
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Ben the GameGenius
          </h1>
          <p className="text-gray-600">
            Create custom games through AI - describe your idea or take a guided
            survey
          </p>
        </header>

        <InputModeSelector
          activeMode={activeMode}
          onModeChange={setActiveMode}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {activeMode === "description" ? (
              <DescriptionInput
                value={gameDescription}
                onChange={setGameDescription}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            ) : (
              <SurveyForm onSubmit={handleGenerate} isLoading={isGenerating} />
            )}

            {showApiConfig && (
              <ApiConfigurationPanel
                isOpen={true}
                onSave={(config) => {
                  console.log("API config saved:", config);
                }}
                onTest={() => {
                  console.log("Testing API connection");
                }}
              />
            )}
          </div>

          <div className="h-full">
            <GeneratedGameDisplay
              gameTitle="Your Generated Game"
              rules="Your game rules will appear here after generation."
              setup="Setup instructions will be displayed here."
              scoring="Scoring system will be shown in this section."
              onRegenerateClick={handleGenerate}
              onExportClick={() => {
                console.log("Exporting game");
              }}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
