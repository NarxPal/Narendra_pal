import React, { useState, useEffect } from "react";
import styles from "@/styles/modal.module.css";
import Image from "next/image";
import CarouselComponent from "./carousel";
import { useMediaQuery } from "react-responsive";

const Modal = ({
  selectedProject,
  closeModal,
  closePfModal,
  pfModalVisible,
}) => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1393px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1392px)" });

  return (
    <>
      {isLargeScreen && selectedProject && closeModal && (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.contentBox}>
              <div>
                <button className={styles.closeBtn} onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className={styles.date}>{selectedProject.date}</div>

              <CarouselComponent selectedProject={selectedProject} />

              <div className={styles.title}>{selectedProject.title}</div>
              <div className={styles.desc}>{selectedProject.description}</div>
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewBtn}
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      )}

      {isLargeScreen && pfModalVisible && (
        <div className={styles.meContainer}>
          <div className={styles.meContent}>
            <div className={styles.meContentBox}>
              <div className={styles.pfHead}>
                <Image
                  src="/profile_pic.jpeg"
                  alt="profilepic"
                  width={100}
                  height={100}
                  priority={true}
                  className={styles.pp}
                />

                <div className={styles.headText}>Ohh!, my anonymous friend</div>
              </div>

              <div className={styles.textStackDiv}>
                <div className={styles.aboutMeText}>
                  Hey everyone! Myself Narendra Pal, a full-stack developer.Fair
                  enough to try out ml stuff with python. I usually build full
                  stack based projects, and during my spare time i try building
                  things with llm's. That's all for now, I'll add more things
                  soon. pluh.
                </div>

                <div className={styles.stackDiv}>
                  <div className={styles.techBox}>React</div>
                  <div className={styles.techBox}>JavaScript</div>
                  <div className={styles.techBox}>Python</div>
                  <div className={styles.techBox}>SQL</div>
                  <div className={styles.techBox}>MongoDB</div>
                  <div className={styles.techBox}>Django</div>
                  <div className={styles.techBox}>Express.js</div>
                  <div className={styles.techBox}>Node.js</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {isSmallScreen &&  selectedProject && closeModal && (
<div className={styles.smContainerBg}>
<div className={styles.smContainer}>













</div>
</div>
)} */}

      {isSmallScreen && selectedProject && closeModal && (
        <div className={styles.smContainerBg}>
          <div className={styles.smContainer}>
            <div>
              <button className={styles.closeBtn} onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className={styles.date}>{selectedProject.date}</div>

            <CarouselComponent selectedProject={selectedProject} />

            <div className={styles.title}>{selectedProject.title}</div>
            <div className={styles.desc}>{selectedProject.description}</div>
            <a
              href={selectedProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewBtn}
            >
              View Project
            </a>
          </div>
        </div>
      )}

      {isSmallScreen && pfModalVisible && (
        <div className={styles.smMeContainerBg}>
          <div className={styles.smMeContainer}>
            <div>
              <button className={styles.closeBtn} onClick={closePfModal}>
                &times;
              </button>
            </div>
            <div className={styles.pfHead}>
              <Image
                src="/profile_pic.jpeg"
                alt="profilepic"
                width={100}
                height={100}
                priority={true}
                className={styles.pp}
              />
              <div className={styles.headText}>Ohh!, my anonymous friend</div>
            </div>
            <div className={styles.smTextStackDiv}>
              <div className={styles.aboutMeText}>
                Hey everyone! Myself Narendra Pal, a full-stack developer. Fair
                enough to try out ml stuff with python. I usually build full
                stack based projects, and during my spare time i try building
                things with llm's. That's all for now, I'll add more things
                soon. pluh.
              </div>
              <div className={styles.stackDiv}>
                <div className={styles.techBox}>React</div>
                <div className={styles.techBox}>JavaScript</div>
                <div className={styles.techBox}>Python</div>
                <div className={styles.techBox}>SQL</div>
                <div className={styles.techBox}>MongoDB</div>
                <div className={styles.techBox}>Django</div>
                <div className={styles.techBox}>Express.js</div>
                <div className={styles.techBox}>Node.js</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
