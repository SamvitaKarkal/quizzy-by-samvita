import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import { useParams } from "react-router-dom";
import { getFromLocalStorage } from "helpers/storage";
import { setAuthHeaders } from "apis/axios";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import quizzesApi from "apis/quizzes";
import ListQuestions from "components/Questions/ListQuestions";

const ShowQuiz = ({ history }) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [topic, setTopic] = useState("");
  const userId = getFromLocalStorage("authUserId");
  const isLoggedIn = !either(isNil, isEmpty)(userId);
  const [loading, setLoading] = useState(true);

  const fetchQuestionDetails = async () => {
    try {
      setAuthHeaders();
      const response = await quizzesApi.show(id);
      setTopic(response.data.quiz.title);
      setQuestions(response.data.questions);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createQuestion = () => {
    history.push(`/questions/create`);
  };

  const destroyQuestion = async id => {
    try {
      await questionsApi.destroy(id);
      await fetchQuestionDetails();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
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
            onClick={createQuestion}
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
          //showQuestion={showQuestion}
          //updateQuestion={updateQuestion}
          destroyQuestion={destroyQuestion}
        />
      )}
    </Container>
  );
};

export default ShowQuiz;
