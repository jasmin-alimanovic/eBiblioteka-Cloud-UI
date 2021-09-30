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
import Jezici from "./Jezici";
import Home from "./Home";
import UserLogin from "./UserLogin";
import PrivateUserRoute from "./PrivateUserRoute";
import Knjige from "./user/Knjige";
import Postavke from "./Postavke";
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <Container className="p-0 m-0 w-100 h-100 d-flex justify-content-center">
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/admin/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/403" exact component={Error403} />
            <Route path="/" exact component={Home} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/admin/knjige" component={Books} />
            <PrivateRoute path="/admin/korisnici" component={Users} />
            <PrivateRoute path="/admin/zaposlenici" component={Zaposlenici} />
            <PrivateRoute path="/admin/zaduzbe" component={Zaduzbe} />
            <PrivateRoute path="/admin/autori" component={Autori} />
            <PrivateRoute path="/admin/izdavaci" component={Izdavaci} />
            <PrivateRoute path="/admin/zanrovi" component={Zanrovi} />
            <PrivateRoute path="/admin/jezici" component={Jezici} />
            <PrivateRoute path="/admin/postavke" component={Postavke} />
            <Route path="/login">
              <UserLogin />
            </Route>
            <PrivateUserRoute path="/knjige" comp={Knjige} />
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
