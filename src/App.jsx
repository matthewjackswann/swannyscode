import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuBar from './MainComponents/MenuBar';
import Home from './Pages/Home';
import PageNotFound from './Pages/PageNotFound';
import Updates from './Pages/Updates';
import UpdateContent from './Updates/UpdateContent';
import Projects from './Pages/Projects';
import ProjectContent from './Projects/ProjectContent';
import { useEffect } from 'react';
import Footer from './MainComponents/Footer';
import 'react-photo-view/dist/react-photo-view.css';

function App() {

  // for links to page using # at end of url
  useEffect(() => {
    let path = window.location.href.split('#');
    if (path.length > 1) {
      const onPageLoad = () => {
        let element = document.getElementById(path[1]);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      if (document.readyState === 'complete') {
        onPageLoad();
      } else {
        window.addEventListener('load', onPageLoad);
        return () => window.removeEventListener('load', onPageLoad);
      }
    }
  }, []);

  return (
    <div className='max-w-5xl items-center mx-auto'>
      <BrowserRouter>
        <MenuBar />
        <div className='p-5 mx-2'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/updates/:id" element={<UpdateContent />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectContent />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
