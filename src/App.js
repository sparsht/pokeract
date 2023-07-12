import { Routes, Route } from 'react-router-dom';
import AuthGuard from './auth.guard';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
function App() {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route path='/home' element={<><NavBar/><Home /></>} />
        <Route path='/' element={<Home />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;