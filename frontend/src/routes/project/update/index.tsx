import { h } from "preact";

interface Props {
  projectid: string;
}

const ProjectUpdate = ({ projectid }: Props) => {
  return (
    <div class="container-lg">
      <h1>Update project: {projectid}</h1>
    </div>
  );
};

export default ProjectUpdate;
