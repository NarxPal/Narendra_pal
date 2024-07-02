import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';

const Projects = () => {
  const router = useRouter();

  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const redirect = async () => {
      if (router.query.token !== token) router.push("/");
    };
    redirect();
  }, [token]);

  return <div>add project here </div>;
};

export default Projects;
