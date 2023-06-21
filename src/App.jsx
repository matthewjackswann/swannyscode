import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuBar from './MainComponents/MenuBar';
import Home from './Pages/Home';
import PageNotFound from './Pages/PageNotFound';
import Updates from './Pages/Updates';
import UpdateContent from './Updates/UpdateContent';

function App() {
  return (
    <div className='bg-background dark:bg-background-dark min-h-screen'>
      <div className='max-w-7xl items-center mx-auto'>
        <BrowserRouter>
          <MenuBar />
          <div className='p-5 mx-2'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/updates/:id" element={<UpdateContent />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
