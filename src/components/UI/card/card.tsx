"use client";

import Image from "next/image";
import { MdClose } from "react-icons/md";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ComponentProps,
} from "react";
import { motion } from "framer-motion";
import { scaleFadeVariants } from "./animation";
import { truncateDescription } from "@/lib/text";
import Modal from "@/components/UI/modal/modal";
import classes from "./card.module.css";

interface CardContextType<T> {
  data: T;
}

const CardContext = createContext<CardContextType<unknown> | undefined>(
  undefined
);

function useCardContext<T>() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }

  return useContext(CardContext) as CardContextType<T>;
}

interface CardProps<T> extends ComponentProps<typeof motion.div> {
  data: T;
  children: ReactNode;
  controls?: boolean;
  onClick?: () => void;
}

export function Card<T>({
  data,
  children,
  onClick,
  controls,
  ...rest
}: CardProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <CardContext.Provider value={{ data }}>
      <motion.div
        onClick={onClick}
        className={classes.card}
        variants={scaleFadeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        {...rest}
      >
        {children}
        {controls && (
          <button
            className={classes.controls}
            onClick={() => setIsModalOpen(true)}
          >
            <MdClose size={30} color="#dc2626" />
          </button>
        )}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <p>popup</p>
        </Modal>
      </motion.div>
    </CardContext.Provider>
  );
}

export function CardTitle() {
  const { data } = useCardContext<{ title?: string }>();
  const title = data.title || "No title available";

  return <h1 className={classes.title}>{title}</h1>;
}

export function CardDescription() {
  const { data } = useCardContext<{ description?: string }>();
  const maxDescriptionLength = 150;

  const description = truncateDescription(
    data.description,
    maxDescriptionLength
  );

  return <p className={classes.description}>{description}</p>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className={classes.content}>{children}</div>;
}

export function CardImage() {
  const { data } = useCardContext<{ image?: string; title?: string }>();
  const imageSrc = data.image || "";
  const title = data.title || "No title available";

  return (
    <div className={classes.image}>
      <Image src={imageSrc} alt={title} fill />
    </div>
  );
}
