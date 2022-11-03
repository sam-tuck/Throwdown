import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from './context/auth';
import Title from './pages/title';
import Page from './pages/page';
import Post from './pages/post';
import NewUser from './pages/signup';


const ProtectedRoute = () => {
  const {auth} = useAuth();

  if (!auth) {
    return <Navigate to="/" replace/>;
  }
  return <Outlet/>
}


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Title/>}/>
        <Route path="/user" element={<ProtectedRoute/>}>
          <Route path="page" element={<Page/>}/>
          <Route path="post" element={<Post/>}/>
        </Route>
        <Route path="/signup" element={<NewUser/>}/>
      </Routes>
    </div>
  );
}

export default App;
