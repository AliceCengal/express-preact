import { h } from "preact"
import { FC } from "utils/FC"

interface Props {
  projectid: string
}

const ProjectView: FC<Props> = ({ projectid }) => {

  return (
    <div class="container-lg">
      View project: {projectid}
    </div>
  )

}

export default ProjectView