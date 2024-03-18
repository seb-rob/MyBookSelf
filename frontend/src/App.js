import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import Form from "./components/Form";
import Intro from './components/Intro';
import Home from "./pages/Home";
import Books from "./components/Books";
import Read from "./pages/Read";
import Invalid from "./components/Invalid";


function App() {
  const mode = useSelector(state => state.theme.isLight)
  return (
    <div className={` ${mode ? 'light' : 'dark'}`}>
      <Routes>
        <Route element={<Landing />}>
          <Route path="/" element={<Intro />} />
          <Route path="/signup" element={<Form />}  />
          <Route path="/login" element={<Form />}  />
          <Route path="*" element={<Invalid />}  />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route element={<Home />} >
            <Route path="/books" element={<Books />} />
            <Route path="/read/:bookId" element={<Read />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}



export default App;