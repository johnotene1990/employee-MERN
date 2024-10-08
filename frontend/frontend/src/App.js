import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signup from "./component/signup";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./component/login";
import Home from "./component/home";
import Create from "./component/create";
import Update from "./component/update";
import Detail from "./component/detail";
import Image from "./component/image"



function App() {
  return (
     <BrowserRouter>
        <Routes>
           <Route>
              <Route path="/" element={<Signup/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/create" element={<Create/>}/>
              <Route path="/update/:id" element={<Update/>}/>
              <Route path="/detail/:id" element={<Detail/>}/>
              <Route path="/image" element={<Image/>}/>
           </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
