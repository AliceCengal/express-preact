import { h } from "preact"
import { FC } from "utils/FC"

interface Props {
  userid: string
}

const UserView: FC<Props> = ({ userid }) => {

  return (
    <div class="container-lg">
      <h1>View user: {userid}</h1>
    </div>
  )

}

export default UserView
