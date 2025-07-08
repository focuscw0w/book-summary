export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function formatText(text: string) {
  return text
    .replace(/#/g, "") 
    .replace(/\*\*/g, "")
    .trim();
}
