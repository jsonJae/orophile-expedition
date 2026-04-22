import { Route, Routes} from "react-router";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = "/login" element = {<LoginPage/>} />;
        <Route path = "/register" element = {<SignupPage/>} />;
      </Routes> 
    </div>
  )
}

export default App