
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Cards from './Components/Cards';
import { CreateQuestion } from './Components/CreateQuestion';
import EditQuestion from './Components/EditQuestion';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
export const url = "https://loginform124.herokuapp.com"
function App() {
  return (
    <div className="App">
      <Navbar/>
     
      <Routes>
      
        <Route path='/' element={<Cards/>}/>
        <Route path='/EditQuestion' element={<EditQuestion/>}/>
        <Route path='/createQuestion' element={<CreateQuestion/>}/>
        <Route path='/Login' element={<Login/>}/>
        </Routes>
    </div>
  );
}

export default App;
