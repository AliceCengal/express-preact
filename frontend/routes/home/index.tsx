import { h } from "preact";
import ProjectSearchBar from "components/project/project-search-bar";
import { ProjectListing } from "components/project/listing";

import style from "./style.css";

const Home = () => (
  <div class={style.home + " container-lg"}>
    <h1>Projects</h1>
    <div class={style.action}>
      <a class="btn" href="/project/create">
        new project
      </a>
      <ProjectSearchBar />
    </div>
    <ProjectListing />
  </div>
);

export default Home;
