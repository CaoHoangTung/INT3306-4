import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Main from "./pages/main";
import Test from "./pages/test";
import {getLocalCredential} from "./utils/auth"

/**
 * List of routers and their corresponding components
 * Consist of 3 item: route string, component, exact
 */
const commonRouters = [
  ["/", <Main />, true]
];

function App() {

  const userRouters = [
    ["/my-profile", <p>Profile</p>, true]
  ];

  const adminRouters = [
    ["/manage/user", <p>Manage User</p>, true]
  ];



  return (
    <Router>
      <div>
        <Switch>
          /**
          Admin router
          */
          {getLocalCredential()?.is_admin &&
           adminRouters.map(item => (
            <Route path={item[0]} exact={item[2]}>
              {item[1]}
            </Route>
            )
          )}

          /**
          User router
            */
          {getLocalCredential() !== null &&
           userRouters.map(item => (
            <Route path={item[0]} exact={item[2]}>
              {item[1]}
            </Route>
            )
          )}       

          /**
          Normal router
            */
          {commonRouters.map(item => (
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
