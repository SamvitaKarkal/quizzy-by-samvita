import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import { getFromLocalStorage } from "helpers/storage";
import { setAuthHeaders } from "apis/axios";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import quizzesApi from "apis/quizzes";
import ListQuizzes from "components/Quizzes/ListQuizzes";

const Dashboard = ({ history }) => {
  const [quizzes, setQuizzes] = useState([]);
  const userId = getFromLocalStorage("authUserId");
  const isLoggedIn = !either(isNil, isEmpty)(userId);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      setAuthHeaders();
      const response = await quizzesApi.list();
      setQuizzes(response.data.quizzes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createQuiz = () => {
    history.push(`/quizzes/create`);
  };

  const destroyQuiz = async slug => {
    try {
      await quizzesApi.destroy(slug);
      await fetchQuizzes();
    } catch (error) {
      logger.error(error);
    }
  };

  // const updateQuiz = slug => {
  //   history.push(`/quizzes/${slug}/edit`);
  // };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex justify-between items-center">
        <h1 className="text-black text-3xl font-medium">List of Quizzes</h1>
        {isLoggedIn && (
          <Button
            type="button"
            buttonText="Create new Quiz"
            loading={false}
            onClick={createQuiz}
          />
        )}
      </div>
      {either(isNil, isEmpty)(quizzes) ? (
        <div className="flex inline-block h-screen text-xl leading-5 text-bb-gray-600">
          <h1 className="m-auto">You have not created any quiz</h1>
        </div>
      ) : (
        <ListQuizzes
          quizzes={quizzes}
          history={history}
          isLoggedIn={isLoggedIn}
          // showQuiz={showQuiz}
          //updateQuiz={updateQuiz}
          destroyQuiz={destroyQuiz}
        />
      )}
    </Container>
  );
};

export default Dashboard;
