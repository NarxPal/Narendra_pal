import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the CSS
import styles from "@/styles/modal.module.css";
import Image from "next/image";

const CarouselComponent = ({ selectedProject }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openFullScreen = (index) => {
    setInitialIndex(index);
    setCurrentIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleModalClick = () => {};

  return (
    <>
      {selectedProject.images.length === 0 ? (
        <div className={styles.imgText}>
          <Image
            src="/img.png"
            alt="img"
            height={30}
            width={30}
            priority={true}
          />

          <div className={styles.text}>No image uploaded</div>
        </div>
      ) : (
        <div className={styles.carousel}>
          <div className={styles.column}>
            {selectedProject.images.slice(0, 1).map((imgUrl, index) => (
              <div
                key={index}
                className={styles.imgDiv}
                onClick={() => openFullScreen(index)}
              >
                <img
                  alt={`project image ${index + 1}`}
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${imgUrl.replace(
                    /^\//,
                    ""
                  )}`}
                  className={styles.img}
                />
              </div>
            ))}
          </div>
          <div className={styles.column2}>
            {selectedProject.images.slice(1, 2).map((imgUrl, index) => (
              <div
                key={index}
                className={styles.imgDiv2}
                onClick={() => openFullScreen(index + 1)}
              >
                <img
                  alt={`project image ${index + 2}`}
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${imgUrl.replace(
                    /^\//,
                    ""
                  )}`}
                  className={styles.img2}
                />
              </div>
            ))}
            {selectedProject.images.length === 1 ? (
              <div
                className={styles.showcaseBox}
                onClick={() => openFullScreen(0)}
              >
                <div className={styles.text}>View Image</div>
              </div>
            ) : selectedProject.images.length === 2 ? (
              <div
                className={styles.showcaseBox}
                onClick={() => openFullScreen(1)}
              >
                <div className={styles.text}>View Images</div>
              </div>
            ) : (
              selectedProject.images.length > 2 && (
                <div
                  className={styles.showcaseBox}
                  onClick={() => openFullScreen(2)}
                >
                  <div className={styles.text}>
                    +({selectedProject.images.length - 2}) more
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {isFullScreen && (
        <div className={styles.fsDiv}>
          <button className={styles.fsCloseBtn} onClick={closeFullScreen}>
            Close
          </button>
          <div className={styles.fullScreenModal} onClick={handleModalClick}>
            <button className={styles.prevButton} onClick={handlePrev}>
              Prev
            </button>
            <div className={styles.fullImgDiv}>
              <img
                alt={`project image ${currentIndex + 1}`}
                src={`${
                  process.env.NEXT_PUBLIC_IMG_URL
                }/${selectedProject.images[currentIndex].replace(/^\//, "")}`}
                className={styles.fullImg}
              />
            </div>
            <button className={styles.nextButton} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CarouselComponent;
