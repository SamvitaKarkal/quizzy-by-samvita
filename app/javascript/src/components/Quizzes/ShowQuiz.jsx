import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import { useParams } from "react-router-dom";
import { getFromLocalStorage } from "helpers/storage";
import { setAuthHeaders } from "apis/axios";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import quizzesApi from "apis/quizzes";
import questionsApi from "apis/questions";
import ListQuestions from "components/Questions/ListQuestions";

const ShowQuiz = ({ history }) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [topic, setTopic] = useState("");
  const [quizId, setQuizId] = useState(0);
  const userId = getFromLocalStorage("authUserId");
  const isLoggedIn = !either(isNil, isEmpty)(userId);
  const [loading, setLoading] = useState(true);

  const fetchQuizDetails = async () => {
    try {
      setAuthHeaders();
      const response = await quizzesApi.show(id);
      setTopic(response.data.quiz.title);
      setQuizId(response.data.quiz.id);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      setAuthHeaders();
      const resp = await questionsApi.show(id);
      setQuestions(resp.data.question);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createQuestion = quizId => {
    history.push(`/${quizId}/questions/create`);
  };

  const destroyQuestion = async id => {
    try {
      await questionsApi.destroy(id);
      await fetchQuestions();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
    fetchQuestions();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex justify-between items-center">
        <h1 className="text-gray-600 text-3xl mt-4 font-medium">{topic}</h1>
        {isLoggedIn && (
          <Button
            type="button"
            buttonText="Create new Question"
            loading={false}
            onClick={() => createQuestion(quizId)}
          />
        )}
      </div>
      {either(isNil, isEmpty)(questions) ? (
        <div className="flex inline-block h-screen text-xl leading-5 text-bb-gray-600">
          <h1 className="m-auto">You have not created any question</h1>
        </div>
      ) : (
        <ListQuestions
          questions={questions}
          history={history}
          isLoggedIn={isLoggedIn}
          destroyQuestion={destroyQuestion}
        />
      )}
    </Container>
  );
};

export default ShowQuiz;
