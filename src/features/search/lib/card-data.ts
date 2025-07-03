import { VolumeInfo } from "../definitions/Book";

interface CardData {
  title: string;
  description: string;
  image: string;
}

export function mapVolumeInfoToCardData(volume: VolumeInfo): CardData {
  return {
    title: volume.title ?? "No title",
    description:
      volume.description ??
      "No description available",
    image: volume.imageLinks?.thumbnail ?? "",
  };
}
