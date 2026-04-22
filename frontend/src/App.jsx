import { Route, Routes} from "react-router";
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={true} />
      <Routes>
        <Route path = "/login" element = {<LoginPage/>} />;
        <Route path = "/register" element = {<SignupPage/>} />;
      </Routes> 
    </div>
  ) 
}

export default App