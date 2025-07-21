import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import DesignPage from './pages/DesignPage';
import SuccessPage from './pages/SuccessPage'
import Tabone from './pages/Tabone';
import TabTwo from './pages/TabTwo';
function App() {
 return (

   <Router>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path='/success' element={<SuccessPage/>}/>
         <Route path="/designPage" element={<DesignPage/>} />
         <Route path='/tabone' element={<Tabone/>}/>
         <Route path='/tabtwo' element={<TabTwo/>}/>
       </Routes>
    </Router>

 )
}

export default App
