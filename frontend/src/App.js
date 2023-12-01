import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Notfound from './components/Notfound';
function App() {
  return (
   <>
      <>
        <Toaster position="top-right">
            
        </Toaster>
      </>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}> </Route>
          <Route path="/login" element={<Login/>}> </Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/file/:id" element={<Editor/>}></Route>
          <Route path="*" element={<Notfound/>} ></Route>
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
