import { h, Fragment } from "preact"
import ProfileCard from "components/profile/card"
import { useFetchUser } from "controllers/profile"
import { FC } from "utils/FC"

interface Props {
  userid: string
}

const UserView: FC<Props> = ({ userid }) => {

  const profile = useFetchUser(userid)
  // console.log(profile.data)
  
  return (
    <div class="container-sm" style={{ paddingTop: '1rem' }}>
      <h1>Profile</h1>
      {
        profile.isLoading || profile.isError || !profile.data ?
          <div>Loading profile for {userid}...</div> :
          <ProfileCard user={profile.data} />
      }

    </div>
  )

}

export default UserView
