import { h } from "preact"
import { FC } from "utils/FC"
import { Project } from "controllers/project"

import style from './style.css'

export type Props = {
  project: Project
}

export const ProjectCard: FC<Props> = ({ project }) => {
  return (
    <div class={style.profile_card + ' card-1'}>
      <label>Title</label>
      <span>{project.title}</span>
      <label>Description</label>
      <span>{project.description}</span>
      <label>Owner</label>
      <a href={'/profile/' + project.ownerid}>
        <span>{project.owner?.name || "N/A"}</span>
      </a>
    </div>
  )
}
