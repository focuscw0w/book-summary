"use client";

import { useState } from "react";
import classes from "./accordion.module.css";

interface AccordionItem<T> {
  id: string;
  title: string;
  content: T;
}

interface AccordionProps<T> {
  items: AccordionItem<T>[];
  allowMultiple?: boolean;
}

export function Accordion<T extends string | JSX.Element>({
  items,
  allowMultiple = false,
}: AccordionProps<T>) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  function toggleItem(id: string) {
    setOpenItems((prev) => {
      const isOpen = prev.includes(id);

      if (allowMultiple) {
        return isOpen ? prev.filter((item) => item !== id) : [...prev, id];
      }

      return isOpen ? [] : [id];
    });
  }

  return (
    <div className={classes.accordion}>
      {items.map(({ id, title, content }) => (
        <div key={id} className={classes.item}>
          <button className={classes.header} onClick={() => toggleItem(id)}>
            {title}
            <span className={classes.icon}>
              {openItems.includes(id) ? "▲" : "▼"}
            </span>
          </button>
          {openItems.includes(id) && (
            <div className={classes.content}>{content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
