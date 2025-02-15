"use client";

import { useState } from "react";
import { Book, VolumeInfo } from "@/features/search/models/Book";
import classes from "./search-results.module.css";

import SearchItem from "../search-item/search-item";
import Spinner from "@/components/UI/spinner/spinner";
import Modal from "../modal/modal";
import ModalDetails from "../modal/modal-details";

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
          {data.items.map((book: Book) => (
            <SearchItem
              onClick={() => openModal(book.volumeInfo)}
              bookInfo={book.volumeInfo}
              key={book.id}
            />
          ))}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedBook && <ModalDetails bookInfo={selectedBook} />}
      </Modal>
    </>
  );
}
