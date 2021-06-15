require "test_helper"

class UserTest < ActiveSupport::TestCase
  setup do
    @user = User.create(first_name: 'Sam',
                        last_name: 'Smith',
                        email: 'sam@example.com',
                        password: 'welcome',
                        password_confirmation: 'welcome'
                        )
  end

  #user and username
  test "user_should_be_valid" do
    assert @user.valid?
  end

  test "invalid_user_first_name" do
    @user.first_name = ""
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  test "invalid_user_last_name" do
    @user.last_name = ""
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end

  test "first_name_should_be_of_valid_length" do
    @user.first_name = 'a' * 60
    assert_not @user.valid?
    assert_equal ["First name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  test "last_name_should_be_of_valid_length" do
    @user.last_name = 'b' * 60
    assert_not @user.valid?
    assert_equal ["Last name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  #user email tests
  test "invalid_email" do
    @user.email = ""
    assert_not @user.valid?
    assert_equal ["Email can't be blank", "Email is invalid"], @user.errors.full_messages
  end

  test "user_should_not_be_valid_and_saved_if_email_not_unique" do
    @user.save!
  
    test_user = @user.dup
    assert_not test_user.valid?
  
    assert_equal ['Email has already been taken'], test_user.errors.full_messages
  end

  test "validation_should_accept_valid_addresses" do
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org first.last@example.in user+one@example.ac.in]
  
    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  test "email validation should reject invalid emails" do
    invalid_emails = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com]
    invalid_emails.each do |invalid_email|
      @user.email = invalid_email
      assert_not @user.valid?, "#{invalid_email.inspect} should be invalid"
    end
  end

  test "user_should_have_valid_role" do
    valid_roles = %w[standard administrator]
    valid_roles.each do |valid_role|
      @user.role = valid_role
    assert @user.valid?
    end
  end

  #user password
  test "password should be present (nonblank)" do
    @user.password = @user.password_confirmation = " " * 6
    assert_not @user.valid?
  end

  test "password should have a minimum length" do
    @user.password = @user.password_confirmation = "a" * 5
    assert_not @user.valid?
  end

  test "password and password_confirmation should match" do
    @user.password_confirmation = "123456"
    assert_not @user.valid?
    assert_equal @user.errors.messages, { :password_confirmation => ["doesn't match Password"] }
  end

end
