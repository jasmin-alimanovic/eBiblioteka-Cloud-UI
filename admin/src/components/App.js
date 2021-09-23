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
            <Route path="/admin/login" component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/403" component={Error403} />
            <Route path="/" exact render={() => <div>Home</div>} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/admin/knjige" component={Books} />
            <PrivateRoute path="/admin/korisnici" component={Users} />
            <PrivateRoute path="/admin/zaposlenici" component={Zaposlenici} />
            <PrivateRoute path="/admin/zaduzbe" component={Zaduzbe} />
            <PrivateRoute path="/admin/autori" component={Autori} />
            <PrivateRoute path="/admin/izdavaci" component={Izdavaci} />
            <PrivateRoute path="/admin/zanrovi" component={Zanrovi} />
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
