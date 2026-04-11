import { useState } from "react";
import type { Screen, SprintConfig } from "./types";
import { SetupScreen } from "./SetupScreen";
import { TimerScreen } from "./TimerScreen";
import { CompleteModal } from "./CompleteModal";

export function App() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [config, setConfig] = useState<SprintConfig>({
    intention: "",
    durationSeconds: 25 * 60,
  });

  const handleStart = (newConfig: SprintConfig) => {
    setConfig(newConfig);
    setScreen("timer");
  };

  const handleComplete = () => {
    setScreen("complete");
  };

  const handleNewSprint = () => {
    setConfig({ intention: "", durationSeconds: 25 * 60 });
    setScreen("setup");
  };

  return (
    <box
      width="100%"
      height="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {screen === "setup" && <SetupScreen onStart={handleStart} />}

      {screen === "timer" && (
        <TimerScreen config={config} onComplete={handleComplete} />
      )}

      {screen === "complete" && (
        <CompleteModal onNewSprint={handleNewSprint} />
      )}
    </box>
  );
}
