require "test_helper"

class QuizTest < ActiveSupport::TestCase
  setup do
    @user = User.create(first_name: 'Sam',
    last_name: 'Smith',
    email: 'sam@example.com',
    password: 'welcome',
    password_confirmation: 'welcome')

    @quiz = Quiz.create(title: "Quiz1", user_id: 1)
  end

  #quiz validation
  test "quiz_should_be_valid" do
    assert @quiz.valid?
  end

  test "invalid_quiz_title" do
    @quiz.title = ""
    assert_not @quiz.valid?
    assert_equal ["Title can't be blank"], @quiz.errors.full_messages
  end

  test "invalid_user_id" do
    @quiz.user_id = ""
    assert_not @quiz.valid?
    assert_equal ["User must exist", "User can't be blank"], @quiz.errors.full_messages
  end
end

