import { h } from "preact"
import { FC } from "utils/FC"

interface Props {
  projectid: string
}

const ProjectUpdate: FC<Props> = ({ projectid }) => {

  return (
    <div class="container-lg">
      <h1>Update project: {projectid}</h1>
    </div>
  )

}

export default ProjectUpdate
