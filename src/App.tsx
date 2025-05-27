import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App
