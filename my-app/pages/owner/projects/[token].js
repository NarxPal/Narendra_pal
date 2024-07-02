import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const Code = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const [projects, setProjects] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token.token);

  // it will redirect if token found empty in the global state variable , also it'll redirect when refreshed.
  useEffect(() => {
    const redirect = async () => {
      const savedToken = localStorage.getItem("token");
      if (router.query.token && router.query.token !== savedToken) {
        router.push("/");
      }
    };
    redirect();
  }, [router.query.token]);

  const handleImageChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  const createProject = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("url", url);
    formData.append("date", date);

    images.forEach((image, index) => {
      formData.append("images", image);
    });

    const res = await fetch(process.env.NEXT_PUBLIC_CREATE_PROJECT, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Project added, keep building!");
      emtpyInputs();
    } else {
      alert("Unable to create project");
    }
  };

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

  const deleteProject = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DEL_PROJECT}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects(projects.filter((project) => project._id !== id));
        console.log("Project deleted successfully");
      } else {
        console.error("Error deleting project:", res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const emtpyInputs = () => {
    setTitle("");
    setDesc("");
    setImages([]);
    setUrl("");
  };

  return (
    <>
      <div>helooo authorizer</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createProject();
        }}
        className="flex flex-col w-1/2 gap-4 m-auto"
      >
        <input
          type="text"
          placeholder="title"
          className="h-12 text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="desc"
          className="h-12 text-black"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="url"
          className="h-12 text-black"
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          className="h-12 text-black"
          placeholder="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          className="h-12 text-white"
          onChange={handleImageChange}
        />
        <button type="submit" className="h-12 text-white bg-blue-500">
          Submit
        </button>
      </form>

      <div className="">
        <div className="text-white">
          {projects &&
            projects.map((prj, index) => (
              <div
                key={index}
                className="flex flex-col p-6 mx-auto my-8 rounded-md bg-projectBg"
              >
                <h2>{prj.title}</h2>
                <p>{prj.description}</p>
                <a href={prj.url}>Project URL</a>

                <div>
                  {prj.images.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt={`Image ${imgIndex + 1}`}
                    />
                  ))}
                </div>

                <button onClick={() => deleteProject(prj._id)}>
                  {" "}
                  delete {prj.title}{" "}
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Code;
