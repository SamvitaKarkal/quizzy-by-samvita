import React from "react";
import Input from "components/Input";
import Button from "components/Button";

const QuizForm = ({ type, title, setTitle, loading, handleSubmit }) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div className="w-full">
        <h2>{type === "create" ? "" : title}</h2>
        <Input
          label="Title"
          placeholder="enter Title"
          //value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Quiz" : "Update Quiz"}
        loading={loading}
      />
    </form>
  );
};

export default QuizForm;
