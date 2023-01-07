import { h, Fragment } from "preact";
import { route } from "preact-router";
import { Link } from "preact-router/match";
import { postLogout, useProfile } from "controllers/auth";
import style from "./style.css";

export default function Header() {
  const { data: profile, mutate } = useProfile();

  function doLogout() {
    postLogout()
      .then((res) => {
        console.log(res);
        mutate();
        route("/login");
      })
      .catch((err) => alert(err));
  }

  return (
    <header class={style.header}>
      <span>Workpack</span>
      <nav>
        <Link activeClassName={style.active} href="/">
          Projects
        </Link>
        {!profile ? (
          <Link activeClassName={style.active} href="/login">
            Login
          </Link>
        ) : (
          <>
            <Link activeClassName={style.active} href="/profile">
              Profile
            </Link>
            <a href="#" onClick={doLogout}>
              Logout
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
