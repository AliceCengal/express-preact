import { h } from 'preact';
import ProjectSearchBar from 'components/project/project-search-bar';
import style from './style.css';

const Home = () => (
  <div class={style.home + " container-lg"}>
    <h2>Projects</h2>
    <ProjectSearchBar />
    <table class={style.projects + " card-1"}>
      <ProjectTableHeader />
      <tr>
        <td>1</td>
        <td>Pipe Ultrasonic cleaning</td>
        <td>Mat</td>
        <td>{new Date().toDateString()}</td>
        <td>{new Date().toDateString()}</td>
      </tr>
    </table>
  </div>
);

const ProjectTableHeader = () => (
  <tr>
    <th>#</th>
    <th>Project title</th>
    <th>Owner</th>
    <th>Date created</th>
    <th>Date updated</th>
  </tr>
)

export default Home;
