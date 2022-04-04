import Menu from './Menu';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Projects from './Projects';
import ProjectViewer from './ProjectViewer';
import Contact from "./Contact";
import NotFound from './NotFound';
import CTF from './CTF';
import WriteUp from './WriteUp';
import { Link } from 'react-router-dom';
import DiscoZoo from './extraComponents/DiscoZoo/DiscoZoo';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/projects">
              <Projects />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route path="/projects/:id">
              <ProjectViewer />
            </Route>
            <Route exact path = "/ctf">
              <CTF />
            </Route>
            <Route exact path = "/discozoo">
              <DiscoZoo />
            </Route>
            <Route path="/ctf/:id">
              <WriteUp />
            </Route>
            <Route path="*">
              <NotFound>
                <h1>Page not found</h1>
                <h2><Link to="/">Go to home</Link></h2>
              </NotFound>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
