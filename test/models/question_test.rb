require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  setup do
    @user = User.create(first_name: 'Sam',
    last_name: 'Smith',
    email: 'sam@example.com',
    password: 'welcome',
    password_confirmation: 'welcome')

    @quiz = Quiz.create!(title: "Quiz1", user_id: 1)

    @question = Question.create(title: "QfromQuiz1", quiz_id: 1, answer: 2)
  end

  #quiz validation
  test "question_should_be_valid" do
    assert @question.valid?
  end

  test "invalid_question_title" do
    @question.title = ""
    assert_not @question.valid?
    assert_equal ["Title can't be blank"], @question.errors.full_messages
  end

  test "invalid_quiz_id" do
    @question.quiz_id = ""
    assert_not @question.valid?
    assert_equal ["Quiz can't be blank"], @question.errors.full_messages
  end

  test "invalid_question_answer" do
    @question.answer = ""
    assert_not @question.valid?
    assert_equal ["Answer can't be blank"], @question.errors.full_messages
  end
end
