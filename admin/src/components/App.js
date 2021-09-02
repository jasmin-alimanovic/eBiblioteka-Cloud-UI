import Signup from "./Signup";
import Dashboard from "./Dashboard";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import MenuComponent from "./Menu";
import { Container } from "react-bootstrap";
import Books from "./Books";
import Book from "./Book";

function App() {
  return (
    <Container className="p-0 m-0 w-100 h-100">
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/menu" component={MenuComponent} />
            <Route path="/signup" exact component={Signup} />
            <PrivateRoute path="/" exact component={Dashboard} />
            <PrivateRoute path="/knjige" component={Books} />
            <PrivateRoute path="/knjiga" component={Book} />
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
