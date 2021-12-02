import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from "./pages/main";
import Home from "./pages/home";
import ViewPost from "./pages/viewpost"
import { getLocalCredential, getCurrentUser } from "./utils/auth"
import UserManager from "./pages/admin/usermanager";
import WritePost from "./pages/newpost/index.js";
import Profile from "./pages/profile";
import TopicPage from "./pages/topic";
import ChangeProfile from "./pages/setting";
import Saved from "./pages/saved";


function App() {
  /**
   * List of routers and their corresponding components
   * Consist of 3 item: route string, component, exact
   */
  const commonRouters = [
    ["/", <Home />, true]
  ];

  const userRouters = [
    ["/my-profile", <Profile userId={getCurrentUser()} />, true],
    ["/profile/:userId", <Profile userId={3} />, true],
    ["/", <Main />, true],
    ["/topic/:topic_id", <p>Topic</p>, true],
    ["/viewpost", <ViewPost />, true],
    ["/new-story", <WritePost />, true],
    ["/topicPage", <TopicPage />, true],
    ["/setting", <ChangeProfile />, true],
    ["/saved", <Saved />, true]
  ];

  const adminRouters = [
    ["/admin/user", <UserManager />, true]
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
