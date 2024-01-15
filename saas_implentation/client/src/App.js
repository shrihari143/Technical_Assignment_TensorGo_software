import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Success from './component/Success';
import Failure from './component/Failure';
import Login from './component/Login';
import Register from './component/Register';
import ProtectedRoute from './component/Register';
import PublicRoute from './component/PublicRoute';
import { Hosted } from './file/stripe/Hosted';
import Return from './file/stripe/Embedded/Return';
import Embedded from './file/stripe/Embedded';

function App() {
  return (
    <BrowserRouter>
      <div className='main'>
        <Routes>
        <Route exact path='/' element={
                  <Login />
                
                } />    
        <Route exact path='/register' element={
                  <Register />
                } />       
          <Route exact path='/hosted' element={<Hosted />} />
          <Route exact path='/success' element={<Success />} />
          <Route exact path='/failure' element={<Failure />} />         
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
