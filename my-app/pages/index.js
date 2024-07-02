import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/home.module.css";
import React, { useState, useEffect } from "react";
import Modal from "../utils/modal";

export default function Index() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); //for pagination
  const [loading, setLoading] = useState(true); // for skeleton
  const [data, setData] = useState([]); // also for skeleton
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [pfModalVisible, setPfModalVisible] = useState(false);

  const textArray = ["C", "u", "r", "i", "o", "u", "s", "!"];

  const projectsPerPage = 3;

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(projects);
    }, 1000);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const paginateProjects = (projects, currentPage, projectsPerPage) => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return projects.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index < textArray.length) {
        setText(textArray.slice(0, index + 1).join(""));
        setIndex(index + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 300);
    return () => clearInterval(intervalId);
  }, [index, textArray]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_GET_PROJECT, {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        } else {
          console.error("Error fetching projects:", res.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getProject();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("narenderpal.singhnsr@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length <= wordLimit) return description;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handlePrjModal = (project) => {
    setSelectedProject(project);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProject(null);
  };

  const handleHomeBtn = () => {
    closeModal();
    setPfModalVisible(false);
  };

  return (
    <>
      <div className={styles.bg_container}>
        <div className={styles.container}>
          <div className={styles.top_bar}>
            <div className={styles.barContent}>
              <div className={styles.homeIcon}>
                <Link href="/">
                  <Image
                    src="/home.png"
                    alt="home"
                    height={25}
                    width={25}
                    priority={true}
                    className={styles.iconBtn}
                    onClick={handleHomeBtn}
                  />
                </Link>

                <Image
                  src="/profile1.png"
                  alt="profile"
                  height={25}
                  width={25}
                  priority={true}
                  className={styles.iconBtn}
                  onClick={() => setPfModalVisible(!pfModalVisible)}
                />
              </div>

              <h2 className={styles.name}>Narendra Pal</h2>
            </div>
          </div>

          <div className={styles.main_content}>
            <div className={styles.about_me}>
              <h1 className={styles.greet}>Hey {text}</h1>
              <p className={styles.aboutDesc}>
                It is an incredible pleasure to see someone landing on my web.I
                owe it to you to do something great in life, since in this
                beautiful life where u could die at any moment (may u live as
                long as u wish), u found it really important to be here.I
                welcome you to witness the progress of the responsibility I have
                taken on your behalf.
              </p>
            </div>

            <div className={styles.btnDiv}>
              <div className={styles.tipEmail}>
                {copied && <div className={styles.tooltip}>Email copied!</div>}
                <button className={styles.emailBtn} onClick={copyToClipboard}>
                  Copy Email
                </button>
              </div>

              <div className={styles.socialDiv}>
                <div>
                  <Link href="https://x.com/NarxPal">twitter</Link>
                </div>
                <div>
                  <Link href="https://github.com/NarxPal">github</Link>
                </div>
              </div>
            </div>

            <div className={styles.projects_container}>
              <div className={styles.projHead}>
                <span className={styles.bulletin}></span> projects
              </div>

              <>
                {loading ? (
                  <div className={styles.skeletonLoader}>
                    {[1, 2, 3].map((index) => (
                      <div className="flex p-6 mb-10" key={index}>
                        <div className="w-8 h-8 mr-4 rounded-full bg-grayBox"></div>
                        <div className="flex-1">
                          <div className="w-32 h-3 mb-2 rounded-sm bg-grayBox"></div>
                          <div className="w-48 h-3 rounded-sm bg-grayBox"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className={styles.projectsContent}>
                      {paginateProjects(
                        projects,
                        currentPage,
                        projectsPerPage
                      ).map((prj, index) => (
                        <div
                          className={styles.singleProj}
                          key={index}
                          onClick={() => handlePrjModal(prj)}
                        >
                          <div className={styles.dateImg}>
                            <Image
                              alt="img"
                              src="/img.png"
                              height={30}
                              width={30}
                              priority={true}
                            />

                            <div className={styles.date}>{prj.date}</div>
                          </div>

                          <div className={styles.textIcon}>
                            <div className={styles.tit_desc}>
                              <div className={styles.title}>{prj.title}</div>
                              <div className={styles.desc}>
                                {truncateDescription(prj.description, 15)}
                              </div>
                            </div>

                            <div>
                              <Image
                                alt="rightArrow"
                                src="/rightArr.png"
                                height={15}
                                width={15}
                                priority={true}
                                className={styles.arrImg}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.pagination}>
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={styles.emailBtn}
                      >
                        Prev
                      </button>

                      <div className={styles.pagelist}>
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index}
                            className={`${styles.pageBtn} ${
                              currentPage === index + 1 ? styles.activePage : ""
                            }`}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={styles.emailBtn}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </>
            </div>
          </div>
        </div>

        {modalVisible && selectedProject && (
          <Modal
            selectedProject={selectedProject}
            closeModal={closeModal}
            pfModalVisible={pfModalVisible}
          />
        )}

        {pfModalVisible && <Modal pfModalVisible={pfModalVisible} />}
      </div>
    </>
  );
}
