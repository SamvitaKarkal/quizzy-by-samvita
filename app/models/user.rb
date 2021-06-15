class User < ApplicationRecord
    VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  
    before_save :to_lowercase

    enum role: { standard: 0, administrator: 1 }

    validates :first_name, presence: true, length: {maximum: 50}
    validates :last_name, presence: true, length: {maximum: 50}
    validates :email, presence: true,
                      length: {maximum: 255},
                      uniqueness: {case_sensitive: false},
                      format: {with: VALID_EMAIL_REGEX}
    # has_secure_password
    # validates :password, presence: true, length: { minimum: 6 }
  
    private
  
    def to_lowercase
      email.downcase!      
    end
  
  end
  