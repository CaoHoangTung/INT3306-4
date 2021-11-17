import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from "./pages/main";
import Home from "./pages/home";
import { getLocalCredential } from "./utils/auth"


function App() {
  /**
   * List of routers and their corresponding components
   * Consist of 3 item: route string, component, exact
   */
  const commonRouters = [
    ["/", <Home/>, true]
  ];
  
  const userRouters = [
    ["/my-profile", <p>Profile</p>, true],
    ["/", <Main />, true]
  ];

  const adminRouters = [
    ["/manage/user", <p>Manage User</p>, true]
  ];

  return (
    <Router>
      <div>
        <Switch>
          {getLocalCredential()?.is_admin &&
            /**
            Admin router
            */
            adminRouters.map(item => (
              <Route path={item[0]} exact={item[2]}>
                {item[1]}
              </Route>
            )
          )}

          {!!getLocalCredential() &&
            /**
            User router
            */
            userRouters.map(item => (
              <Route path={item[0]} exact={item[2]}>
                {item[1]}
              </Route>
            )
          )}       

          {commonRouters.map(item => (
            /**
            Normal router
            */
            <Route path={item[0]} exact={item[2]}>
              {item[1]}
            </Route>
            )
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
