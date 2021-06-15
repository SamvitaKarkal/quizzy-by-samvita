import React from "react";
import Button from "components/Button";

const ListQuizzes = ({ quizzes, history, isLoggedIn, destroyQuiz }) => {
  const routeHandler = (slug, target) => {
    if (isLoggedIn) history.push(`/quizzes/${slug}/${target}`);
    else history.push("/login");
  };

  return (
    <ul className="bg-white mt-4">
      {quizzes?.map(quiz => (
        <li key={quiz.slug} className="py-1">
          {isLoggedIn && (
            <div className="grid grid-cols-12 gap-2">
              <div
                className="col-span-8 mt-5 pt-4 hover:text-purple-700 text-lg font-medium cursor-pointer"
                onClick={() => routeHandler(quiz.slug, "show")}
              >
                {quiz.title}
              </div>
              <div className="col-span-2">
                <Button
                  type="button"
                  buttonText="Edit"
                  onClick={() => routeHandler(quiz.slug, "edit")}
                />
              </div>
              <div className="col-span-2">
                <Button
                  type="button"
                  buttonText="Delete"
                  onClick={() => {
                    confirm("Are you sure you wish to delete this item?")
                      ? destroyQuiz(quiz.slug)
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

export default ListQuizzes;