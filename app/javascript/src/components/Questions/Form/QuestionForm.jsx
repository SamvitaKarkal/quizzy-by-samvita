import React, { useState } from "react";
import Input from "components/Input";
import Button from "components/Button";
import Delete from "../DeleteButton";

const QuestionForm = ({
  type,
  title,
  setTitle,
  options,
  setOptions,
  handleSubmit,
}) => {
  const [count, setCount] = useState(0);

  const handleChange = (e, idx) => {
    e.preventDefault();
    setOptions(preState => {
      const curState = [...preState];
      curState[idx].content = e.target.value;
      return curState;
    });
  };

  const addOption = async () => {
    setCount(prevState => prevState + 1);
  };

  const deleteOption = async () => {
    setCount(prevState => prevState - 1);
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={e => handleSubmit(e)}>
      <div className="w-full">
        <h2>{type === "create" ? "" : title}</h2>
        <Input
          label="Question"
          placeholder="enter question"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="w-3/4">
        <Input
          label="Option A"
          placeholder="Option A"
          value={options[0].content}
          onChange={e => handleChange(e, 0)}
        />
        <Input
          label="Option B"
          placeholder="Option B"
          value={options[1].content}
          onChange={e => handleChange(e, 1)}
        />
        <>
          {count === 1 ? (
            <div className="flex inline-flex">
              <Input
                label="Option C"
                placeholder="Option C"
                value={options[2].content}
                onChange={e => handleChange(e, 2)}
              />
              <Delete deleteOption={deleteOption} />
            </div>
          ) : (
            count === 2 && (
              <>
                <div className="flex inline-flex">
                  <Input
                    label="Option C"
                    placeholder="Option C"
                    value={options[2].content}
                    onChange={e => handleChange(e, 2)}
                  />
                  <Delete deleteOption={deleteOption} />
                </div>
                <div className="flex inline-flex">
                  <Input
                    label="Option D"
                    placeholder="Option D"
                    value={options[3].content}
                    onChange={e => handleChange(e, 3)}
                  />
                  <Delete deleteOption={deleteOption} />
                </div>
              </>
            )
          )}
          {count < 2 && (
            <a
              className="flex underline text-blue-600 hover:text-purple-600"
              onClick={addOption}
            >
              + Add option
            </a>
          )}
        </>
      </div>
      <Button type="submit" buttonText="Submit" loading={false} />
    </form>
  );
};

export default QuestionForm;
