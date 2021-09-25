import { Route, Switch } from "react-router-dom";
import Dashboard from "./DashBoard";
import SignIn from "./SignIn";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import ChangePassword from "./ChangePassword.js";
import { withRouter } from 'react-router';
import { Redirect } from "react-router-dom"
import StudentUpdateForm from "./StudentUpdateForm";
import { createContext, useEffect, useState } from "react";
export const MyContext = createContext();
function App() {
  
  const [isLoggedIn, setLogIn] = useState(false);
  
  useEffect(() => {
    setLogIn(sessionStorage.getItem("email") !== null)
  }, [])
  return (
    <MyContext.Provider value={{ isLoggedIn, setLogIn }}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/dashboard" /> : <SignIn />}
          </Route>
          <Route path="/dashboard">
            {isLoggedIn ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route path="/table" component={StudentTable} />
          <Route path="/form" component={StudentForm} />
          <Route path='/student-update/:id' component={StudentUpdateForm} />
          <Route path="/changepassword" component={ChangePassword}/>
        </Switch>
      </div>
    </MyContext.Provider>
  );
}

export default  withRouter(App);
