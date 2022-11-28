import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
  <header class={style.header}>
    <span>Workpack</span>
    <nav>
      <Link activeClassName={style.active} href="/">Projects</Link>
      <Link activeClassName={style.active} href="/profile">Profile</Link>
      <Link activeClassName={style.active} href="/login">Login</Link>
    </nav>
  </header>
);

export default Header;
