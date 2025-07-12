"use client";

import { useState } from "react";
import { Book } from "@/features/books/models/Book";
import { VolumeInfo } from "../../lib/definitions";
import { mapVolumeInfoToCardData } from "../../lib/card-data";
import { formatAuthors } from "../../lib/text";
import {
  Card,
  CardTitle,
  CardDescription,
  CardImage,
  CardContent,
} from "@/components/UI/card/card";
import Spinner from "@/components/UI/spinner/spinner";
import Modal from "../../../../components/UI/modal/modal";
import SearchDetail from "../search-detail/search-detail";
import classes from "./search-results.module.css";

interface SearchResultsProps {
  data: { items: Book[] } | undefined;
  error: unknown;
  isLoading: boolean;
}

export default function SearchResults({
  data,
  error,
  isLoading,
}: SearchResultsProps) {
  const [selectedBook, setSelectedBook] = useState<VolumeInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal(book: VolumeInfo) {
    setIsModalOpen(true);
    setSelectedBook(book);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedBook(null);
  }

  if (isLoading) return <Spinner variant="Lines" color="#000000" />;
  if (error instanceof Error)
    return (
      <p className={classes.error}>
        Unfortunately, we could not find your desired book. Please, try again
        later. {error.message}
      </p>
    );

  if (!data) {
    return null;
  }

  return (
    <>
      <div className={classes.container}>
        <ul>
          {data.items.map((book: Book) => {
            const volumeInfo = book.volumeInfo;
            return (
              <Card
                data={mapVolumeInfoToCardData(volumeInfo)}
                key={book.id}
                onClick={() => openModal(volumeInfo)}
              >
                <CardContent>
                  <CardTitle />
                  <p>Authors: {formatAuthors(volumeInfo.authors)}</p>
                  {volumeInfo.publishedDate && (
                    <p>Published: {volumeInfo.publishedDate}</p>
                  )}
                  <CardDescription />
                </CardContent>
                <CardImage />
              </Card>
            );
          })}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedBook && <SearchDetail bookInfo={selectedBook} />}
      </Modal>
    </>
  );
}
