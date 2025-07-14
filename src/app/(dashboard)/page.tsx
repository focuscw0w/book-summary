import type { Metadata } from "next";
import Introduction from "./introduction";

export const metadata: Metadata = {
  title: "Book Summary",
  description: "Summarize your favorite book easily!",
};

export default function Home() {
  return <Introduction />;
}
