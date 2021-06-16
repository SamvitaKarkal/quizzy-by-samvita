import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { either, isEmpty, isNil } from "ramda";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import { ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "helpers/storage";
import PrivateRoute from "components/Common/PrivateRoute";
import PageLoader from "components/PageLoader";

import Login from "components/Authentication/Login";
import Dashboard from "components/Dashboard";
import Navbar from "components/NavBar/index";
import CreateQuiz from "components/Quizzes/CreateQuiz";
import EditQuiz from "components/Quizzes/EditQuiz";
import ShowQuiz from "components/Quizzes/ShowQuiz";

const App = () => {
  const [loading, setLoading] = useState(true);
  const userId = getFromLocalStorage("authUserId");
  const isLoggedIn = !either(isNil, isEmpty)(userId) && userId !== "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
        <PrivateRoute
          path="/quizzes/:id/show"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={ShowQuiz}
        />
        <PrivateRoute
          path="/quizzes/create"
          redirectRoute="/login"
          git
          condition={isLoggedIn}
          component={CreateQuiz}
        />
        <PrivateRoute
          path="/quizzes/:id/edit"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={EditQuiz}
        />
      </Switch>
    </Router>
  );
};

export default App;
