import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import DBConnection from './components/DBConnection';
import Navbar from './components/Navbar';
import Catalog from'./components/Catalog';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div>
      <BrowserRouter>
       <Routes>
         <Route path='/' element={<DBConnection></DBConnection>}/>
         <Route path='/home' element={<Catalog></Catalog>}/>
       </Routes>
      </BrowserRouter> 
      </div>

    </div>
  );
}

export default App;
