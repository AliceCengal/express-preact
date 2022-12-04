import { h } from 'preact';
import { FC } from 'utils/FC';
import { Project, useFetchAllProjects } from "controllers/project"

import style from './style.css'

export const ProjectListing = () => {

  const allProjects = useFetchAllProjects()

  return (
    <table class={style.projects + " card-1"}>
      <ProjectTableHeader />
      {
        allProjects.data ?
          allProjects.data.map((p: Project, ix: number) =>
            <ProjectTableRow project={p} ix={ix + 1} />
          ) : null
      }
    </table>
  )
}

const ProjectTableHeader = () => (
  <tr>
    <th>#</th>
    <th>Project title</th>
    <th>Owner</th>
    <th>Date created</th>
    <th>Date updated</th>
  </tr>
)

const ProjectTableRow: FC<{ project: Project, ix: number }> = ({ project, ix }) => (
  <tr>
    <td>{ix}</td>
    <td>
      <a href={"/project/" + project.id}>{project.title}</a>
    </td>
    <td><a href={'/profile/' + project.ownerid}>{project.owner?.name}</a></td>
    <td>{new Date(project.cts).toDateString()}</td>
    <td>{new Date(project.uts).toDateString()}</td>
  </tr>
)