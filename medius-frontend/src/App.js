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
import TopicManager from "./pages/admin/TopicManager";
import PostManager from "./pages/admin/postmanager";
import ViewProfile from "./pages/profile/view_profile";
import ViewSearch from "./pages/search/view_search";
import EditPost from "./pages/editpost";


function App() {
  /**
   * List of routers and their corresponding components
   * Consist of 3 item: route string, component, exact
   */
  const commonRouters = [
    ["/", <Home />, true],
    ["/login", <Home isLoggingIn={true} />, true],
  ];

  const userRouters = [
    ["/my-profile", <Profile userId={getCurrentUser()} />, true],
    ["/profile/:userId", <ViewProfile />, true],
    ["/", <Main />, true],
    ["/topic/:topicId", <TopicPage />, true],
    ["/edit-post/:postId", <EditPost />, true],
    ["/post/:postId", <ViewPost />, true],
    ["/new-story", <WritePost />, true],
    ["/topicPage", <TopicPage />, true],
    ["/setting", <ChangeProfile />, true],
    ["/saved", <Saved />, true],
    ["/search/:queryString", <ViewSearch />, true]
  ];

  const adminRouters = [
    ["/admin/user", <UserManager />, true],
    ["/admin/topic", <TopicManager />, true],
    ["/admin/post", <PostManager />, true]
  ];

  const api_regex = /^\/api\/.*/
  // if using "/api/" in the pathname, don't use React Router
  if (api_regex.test(window.location.pathname)) {
    return <div /> // must return at least an empty div
  } else {
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
}

export default App;
