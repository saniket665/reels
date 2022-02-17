import './App.css';
import Signup from './Components/Signup';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from './Components/Login';
import { AuthProvider } from './Context/AuthContext';
import Feed from "./Components/Feed";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from './Components/ForgotPassword';
import Profile from './Components/Profile';
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <PrivateRoute path="/profile/:id" component={Profile} />
      <PrivateRoute path="/" component={Feed} />
      </Switch>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
