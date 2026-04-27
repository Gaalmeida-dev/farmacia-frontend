import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  )
}

export default App