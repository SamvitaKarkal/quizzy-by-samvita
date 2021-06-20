require "test_helper"

class OptionTest < ActiveSupport::TestCase
  setup do
    @user = User.create(first_name: 'Sam',
                        last_name: 'Smith',
                        role: 'administrator',
                        email: 'sam@example.com',
                        password: 'welcome',
                        password_confirmation: 'welcome')

    @quiz = Quiz.create(title: "Quiz1", user_id: 1)

    @question = Question.create(title: 'Q1',
                                quiz_id: 1, 
                                answer: "2")

    @option = Option.create(content: 'A', question_id: 1)
  end

  #option validation
  test "option_should_be_valid" do
    assert @option.valid?
  end

  test "invalid_option_content" do
    @option.content = ""
    assert_not @option.valid?
    assert_equal ["Content can't be blank"], @option.errors.full_messages
  end
end
