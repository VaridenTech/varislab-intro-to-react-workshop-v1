export function formatTotalTime(
  prepMinutes: number,
  cookMinutes: number,
): string {
  const total = prepMinutes + cookMinutes;

  if (total < 60) {
    return `${total} min`;
  }

  const hours = Math.floor(total / 60);
  const minutes = total % 60;

  return minutes === 0 ? `${hours} hr` : `${hours} hr ${minutes} min`;
}
