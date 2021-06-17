import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "components/Container";
import QuestionForm from "components/Questions/Form/QuestionForm";
import questionsApi from "apis/questions";
import PageLoader from "components/PageLoader";

const CreateQuestion = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading] = useState(false);
  const { id } = useParams();
  const [options, setOptions] = useState([
    { content: "" },
    { content: "" },
    { content: "" },
    { content: "" },
  ]);

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      await questionsApi.create({
        question: { title, quiz_id: id, option_attributes: options },
      });
      history.push("/");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <QuestionForm
        type="create"
        title={title}
        setTitle={setTitle}
        options={options}
        setOptions={setOptions}
        loading={loading}
        handleSubmit={handleSubmit}
        id={id}
      />
    </Container>
  );
};

export default CreateQuestion;
