import { h } from 'preact';
import ProjectSearchBar from 'components/project/project-search-bar';
import { ProjectTableHeader } from 'components/project/listing';

import style from './style.css';

const Home = () => (
  <div class={style.home + " container-lg"}>
    <h2>Projects</h2>
    <div class={style.action}>
      <button>new project</button>
      <ProjectSearchBar />
    </div>
    <table class={style.projects + " card-1"}>
      <ProjectTableHeader />
      <tr>
        <td>1</td>
        <td>
          <a href="/project/1234">Pipe Ultrasonic cleaning</a>
        </td>
        <td>Mat</td>
        <td>{new Date().toDateString()}</td>
        <td>{new Date().toDateString()}</td>
      </tr>
    </table>
  </div>
);



export default Home;
