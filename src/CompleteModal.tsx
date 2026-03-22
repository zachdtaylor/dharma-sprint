import { TextAttributes } from "@opentui/core";

interface Props {
  onNewSprint: () => void;
}

export function CompleteModal({ onNewSprint }: Props) {
  return (
    <box
      width={50}
      flexDirection="column"
      gap={3}
      padding={4}
      borderStyle="rounded"
      alignItems="center"
      justifyContent="center"
    >
      <text attributes={TextAttributes.BOLD}>Sprint Complete</text>

      <text>Your time of dedication has ended.</text>

      <text attributes={TextAttributes.DIM}>Take a moment to reflect on your sprint.</text>

      <box marginTop={2}>
        <select
          options={[{ name: "Start New Sprint", description: "Begin another sprint" }]}
          onSelect={(index) => {
            if (index === 0) onNewSprint();
          }}
        />
      </box>
    </box>
  );
}
