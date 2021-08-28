import Signup from "./Signup";
import Dashboard from "./Dashboard";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import MenuComponent from "./Menu";

function App() {
  return (
    <div className="p-0 m-0 w-100">
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/signup" exact component={Signup} />
            <PrivateRoute path="/" exact component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/menu" component={MenuComponent} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
