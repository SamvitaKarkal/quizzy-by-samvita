import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import { getFromLocalStorage } from "helpers/storage";
//import { setAuthHeaders } from "apis/axios";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import Button from "components/Button";

const Dashboard = ({ history }) => {
  const userId = getFromLocalStorage("authUserId");
  const isLoggedIn = !either(isNil, isEmpty)(userId);
  //  const [loading, setLoading] = useState(true);

  return (
    <Container>
      <div className="flex justify-between items-center">
        <h1 className="text-black text-3xl mt-8 font-medium">
          List of Quizzes
        </h1>
        {isLoggedIn && (
          <Button
            type="button"
            buttonText="Create new Quiz"
            loading={false}
            //onClick={createQuiz}
          />
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
