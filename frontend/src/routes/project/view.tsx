import { ProjectCard } from "components/project/card"
import { useFetchProject } from "controllers/project"
import { h } from "preact"
import { FC } from "utils/FC"

interface Props {
  projectid: string
}

const ProjectView: FC<Props> = ({ projectid }) => {

  const project = useFetchProject(projectid)

  return (
    <div class="container-lg" style={{ paddingTop: '1rem' }}>
      {
        project.isLoading || project.isError || !project.data ?
          <div>
            View project: {projectid}
          </div> :
          <ProjectCard project={project.data} />
      }
    </div>
  )
}

export default ProjectView
