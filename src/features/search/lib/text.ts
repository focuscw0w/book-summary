export function truncateDescription(
  text: string | undefined,
  maxLength: number
) {
  if (!text) return "No description available.";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export function formatAuthors(
  authors: string[] | undefined,
  maxAuthors: number = 2
): string {
  if (!authors || authors.length === 0) return "N/A";

  return authors.length > maxAuthors
    ? `${authors.slice(0, maxAuthors).join(", ")}...`
    : authors.join(", ");
}
