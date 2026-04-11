import { useState, useCallback } from "react";
import { TextAttributes } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import type { SprintConfig } from "./types";
import { parseDuration } from "./utils/duration";

interface Props {
  onStart: (config: SprintConfig) => void;
}

type FocusTarget = "intention" | "duration" | "start";

export function SetupScreen({ onStart }: Props) {
  const [intention, setIntention] = useState("");
  const [duration, setDuration] = useState("");
  const [focused, setFocused] = useState<FocusTarget>("intention");

  const focusOrder: FocusTarget[] = ["intention", "duration", "start"];

  useKeyboard((key) => {
    if (key.name === "tab") {
      const currentIndex = focusOrder.indexOf(focused);
      const nextIndex = key.shift
        ? (currentIndex - 1 + focusOrder.length) % focusOrder.length
        : (currentIndex + 1) % focusOrder.length;
      setFocused(focusOrder[nextIndex]!);
    }
  });

  const handleStart = useCallback((intentionValue: string, durationValue: string) => {
    const seconds = parseDuration(durationValue);
    if (intentionValue.trim() && seconds !== null) {
      onStart({ intention: intentionValue.trim(), durationSeconds: seconds });
    }
  }, [onStart]);

  return (
    <box
      width={60}
      flexDirection="column"
      gap={2}
      padding={4}
      borderStyle="rounded"
    >
      <text attributes={TextAttributes.BOLD}>Dharma Sprint</text>

      <box flexDirection="column" gap={1}>
        <text attributes={TextAttributes.BOLD}>What is your intention?</text>
        <input
          placeholder="Enter your intention..."
          value={intention}
          onChange={setIntention}
          focused={focused === "intention"}
          onSubmit={(value) => {
            const v = typeof value === "string" ? value : String(value);
            handleStart(v, duration);
          }}
        />
      </box>

      <box flexDirection="column" gap={1}>
        <text attributes={TextAttributes.BOLD}>Duration</text>
        <input
          placeholder="25, 1h30m, 90m, 2h, 30s"
          value={duration}
          onChange={setDuration}
          focused={focused === "duration"}
          onSubmit={(value) => {
            const v = typeof value === "string" ? value : String(value);
            handleStart(intention, v);
          }}
        />
      </box>

      <box marginTop={2}>
        <select
          options={[{ name: "Begin Sprint", description: "Start your sprint" }]}
          focused={focused === "start"}
          onChange={(index) => {
            if (index === 0) handleStart(intention, duration);
          }}
        />
      </box>

      <text attributes={TextAttributes.DIM}>Press Enter to start sprint</text>
    </box>
  );
}
