export function truncateDescription(
  text: string | undefined | null,
  maxLength: number
) {
  if (!text || text.trim() === "") return "No description available.";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
