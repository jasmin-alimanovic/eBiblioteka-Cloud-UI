import Signup from "./Signup";
import Dashboard from "./Dashboard";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { Container } from "react-bootstrap";
import Books from "./Books";
import Error403 from "./error/403";
import Users from "./Users";
import Zaposlenici from "./Zaposlenici";
import Zaduzbe from "./Zaduzbe";
import Autori from "./Autori";
import Izdavaci from "./Izdavaci";
import Zanrovi from "./Zanrovi";

function App() {
  return (
    <Container className="p-0 m-0 w-100 d-flex justify-content-center">
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/admin/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/403" exact component={Error403} />
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/dashboard" exact>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/admin/knjige">
              <Books />
            </PrivateRoute>
            <PrivateRoute path="/admin/korisnici">
              <Users />
            </PrivateRoute>
            <PrivateRoute path="/admin/zaposlenici">
              <Zaposlenici />
            </PrivateRoute>
            <PrivateRoute path="/admin/zaduzbe">
              <Zaduzbe />
            </PrivateRoute>
            <PrivateRoute path="/admin/autori">
              <Autori />
            </PrivateRoute>
            <PrivateRoute path="/admin/izdavaci">
              <Izdavaci />
            </PrivateRoute>
            <PrivateRoute path="/admin/zanrovi">
              <Zanrovi />
            </PrivateRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
