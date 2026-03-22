export function parseDuration(input: string): number | null {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;

  let totalMinutes = 0;
  let current = "";

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i]!;
    if (/[0-9]/.test(char)) {
      current += char;
    } else if ("hms".includes(char)) {
      const value = parseInt(current, 10);
      if (isNaN(value) || value < 0) return null;

      if (char === "h") {
        totalMinutes += value * 60;
      } else if (char === "m") {
        totalMinutes += value;
      } else if (char === "s") {
        totalMinutes += Math.round(value / 60);
      }
      current = "";
    } else if (char === " ") {
      continue;
    } else {
      return null;
    }
  }

  if (current) {
    const value = parseInt(current, 10);
    if (isNaN(value) || value < 0) return null;
    totalMinutes += value;
  }

  return totalMinutes > 0 ? totalMinutes : null;
}
