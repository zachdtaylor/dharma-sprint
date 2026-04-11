import { useState, useEffect, useRef } from "react";
import { TextAttributes } from "@opentui/core";
import { useTimeline } from "@opentui/react";
import type { SprintConfig } from "./types";

interface Props {
  config: SprintConfig;
  onComplete: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function TimerScreen({ config, onComplete }: Props) {
  const totalSeconds = config.durationSeconds;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remaining, onComplete]);

  return (
    <box
      width={70}
      flexDirection="column"
      gap={3}
      padding={5}
      borderStyle="rounded"
      alignItems="center"
    >
      <text attributes={TextAttributes.BOLD}>{config.intention}</text>

      <box flexDirection="column" alignItems="center" gap={1} marginTop={2}>
        <text attributes={TextAttributes.BOLD}>Time Remaining</text>
        <text>{formatTime(remaining)}</text>
      </box>
    </box>
  );
}
