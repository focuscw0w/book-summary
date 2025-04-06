"use client";

import { createContext, useContext, ReactNode, ComponentProps } from "react";
import { motion } from "framer-motion";
import { scaleFadeVariants } from "./animation";
import classes from "./card.module.css";

interface CardContextType<T> {
  data?: T;
}

const CardContext = createContext<CardContextType<unknown>>({});

function useCardContext<T>() {
  return useContext(CardContext) as CardContextType<T>;
}

interface CardProps<T> extends ComponentProps<typeof motion.div> {
  data?: T;
  children: ReactNode;
}

export function Card<T>({ data, children, ...rest }: CardProps<T>) {
  return (
    <CardContext.Provider value={{ data }}>
      <motion.div
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
      </motion.div>
    </CardContext.Provider>
  );
}

Card.Header = function Title({ children }: { children: ReactNode }) {
  return <h1 className={classes.header}>{children}</h1>;
};

Card.Description = function Description({ children }: { children: ReactNode }) {
  return <p className={classes.description}>{children}</p>;
};

Card.Image = function Image({ children }: { children: ReactNode }) {
  return <div className={classes.image}>{children}</div>;
};

export { useCardContext };
