import * as React from "react";

import { useProjects } from "../api/get-projects";

const ProjectsList = () => {
  const projects = useProjects();

  return (
    <div>
      {projects.data?.map((project) => (
        <div key={project.id}>
          <p>
            <b>Project name: </b>
            {project.name}
          </p>
          <p>
            <b>Project Organization: </b>
            {project.organization}
          </p>
        </div>
      ))}
    </div>
  );
};

export { ProjectsList };
