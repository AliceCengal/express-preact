import { h } from "preact";
import style from "./style.css";

export default function ProjectSearchBar() {
  return (
    <div class={style.main + " card-1"}>
      <input type="text" placeholder=" Search projects" />
      <span class="material-icons">search</span>
    </div>
  );
}
