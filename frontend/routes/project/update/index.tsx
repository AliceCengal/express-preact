import { h } from "preact";

interface Props {
  projectid: string;
}

export default function ProjectUpdate({ projectid }: Props) {
  return (
    <div class="container-lg">
      <h1>Update project: {projectid}</h1>
    </div>
  );
}
