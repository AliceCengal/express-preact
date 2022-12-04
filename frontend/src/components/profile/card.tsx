import { h, Fragment } from "preact"
import { FC } from "utils/FC"
import { User } from "controllers/profile"

import style from './style.css'

export type Props = {
  user: User
}

const ProfileCard: FC<Props> = ({ user }) => {

  return (
    <div class={style.profile_card + " card-1"}>
      <label>Name</label>
      <span>{user.name}</span>

      <label>Email</label>
      <span>{user.email}</span>

      {
        user.Project && user.Project.length ?
          user.Project.map(({ title, id }, ix) =>
            ix == 0 ?
              <>
                <label>Projects</label>
                <a href={"/project/" + id}>{title}</a>
              </> :
              <>
                <div></div>
                <a href={"/project/" + id}>{title}</a>
              </>
          ) : null
      }
    </div>
  )
}

export default ProfileCard
