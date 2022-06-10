
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Cards from './Components/Cards';
import { CreateQuestion } from './Components/CreateQuestion';
import EditQuestion from './Components/EditQuestion';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
     
      <Routes>
        <Route path='/createQuestion' element={<CreateQuestion/>}/>
        <Route path='/' element={<Cards/>}/>
        <Route path='/EditQuestion' element={<EditQuestion/>}/>
        <Route path='/createQuestion' element={<CreateQuestion/>}/>
        </Routes>
    </div>
  );
}

export default App;
