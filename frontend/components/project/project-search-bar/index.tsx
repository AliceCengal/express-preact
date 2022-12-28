import { h } from "preact";
import style from "./style.css";

const ProjectSearchBar = () => {
  return (
    <div class={style.main + " card-1"}>
      <input type="text" placeholder=" Search projects" />
      <span class="material-icons">search</span>
    </div>
  );
};

export default ProjectSearchBar;
