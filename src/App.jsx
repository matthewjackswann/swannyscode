import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuBar from './MainComponents/MenuBar';
import Home from './Pages/Home';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div className='bg-background dark:bg-background-dark min-h-screen'>
      <div className='max-w-7xl items-center mx-auto'>
        <BrowserRouter>
          <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
