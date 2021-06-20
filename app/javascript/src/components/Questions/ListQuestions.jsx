import React from "react";
import Button from "components/Button";

const ListQuestions = ({ questions, history, isLoggedIn, destroyQuestion }) => {
  const routeHandler = (id, target) => {
    if (isLoggedIn) history.push(`/questions/${id}/${target}`);
    else history.push("/login");
  };

  return (
    <ul className="bg-white mt-4">
      {questions?.map(question => (
        <li key={question.id} className="py-1">
          {isLoggedIn && (
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-8 mt-5 pt-4 text-xl font-medium">
                <span>
                  Q{question.id}. {question.title}
                </span>
              </div>
              <div className="col-span-2">
                <Button
                  type="button"
                  buttonText="Edit"
                  onClick={() => routeHandler(question.id, "edit")}
                />
              </div>
              <div className="col-span-2">
                <Button
                  type="button"
                  buttonText="Delete"
                  onClick={() => {
                    confirm("Are you sure you wish to delete this item?")
                      ? destroyQuestion(question.id)
                      : history.push("/");
                  }}
                />
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListQuestions;
