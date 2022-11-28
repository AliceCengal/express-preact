import { getProfile, postLogout } from 'controllers/auth';
import { h, Fragment } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import { useQuery, useQueryClient } from 'react-query';
import style from './style.css';

const Header = () => {
  const queryClient = useQueryClient()

  const { isLoading, isError: notLoggedIn, data: profile } = useQuery(
    ['/api/auth'],
    getProfile, {
      retry: false
    }
  )

  function doLogout() {
    postLogout()
      .then(res => {
        console.log(res)
        queryClient.invalidateQueries(['/api/auth'])
        route("/login")
      })
      .catch(err => alert(err))
  }

  return (
    <header class={style.header}>
      <span>Workpack</span>
      <nav>
        <Link activeClassName={style.active} href="/">Projects</Link>
        {
          isLoading || notLoggedIn ?
            <Link activeClassName={style.active} href="/login">Login</Link> :
            <>
              <Link activeClassName={style.active} href="/profile">Profile</Link>
              <a href="#" onClick={doLogout}>Logout</a>
            </>
        }
      </nav>
    </header>
  )
}

export default Header;
