import React, { useState } from "react";
import styles from "../src/app/style.module.css";

const Faq = ({ faqData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleQuestionClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={styles.faq_flex}>
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`${styles.faqItem} ${
            activeIndex === index ? styles.opened : ""
          }`}
        >
          <div
            className={`${styles.question} ${
              activeIndex === index ? styles.active : ""
            } ${activeIndex === index ? styles.clicked : ""}`}
            onClick={() => handleQuestionClick(index)}
          >
            <h2> {item.question}</h2>
            <div>{activeIndex === index ? "-" : "+"}</div>
          </div>
          {activeIndex === index && (
            <div
              className={styles.answer}
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
