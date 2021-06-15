task :populate_with_sample_data do
  puts 'Seeding with sample data...'
  user_details = { first_name: 'Sam',
                   last_name: 'Smith',
                   email: 'Sam@example.com',
                   password: 'welcome',
                   password_confirmation: 'welcome' }
  User.create! user_details
  puts 'Done! Now you can login with "sam@example.com" using password "welcome"'
end

desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task :populate_with_sample_data do
  create_sample_data!
end

def create_sample_data!
puts 'Seeding with sample data...'
create_user! email: 'sam@example.com', first_name: 'Sam', last_name: 'Smith'
puts 'Done! Now you can login with "sam@example.com", using password "welcome"'
end

def create_user!(options = {})
user_attributes = { password: 'welcome', password_confirmation: 'welcome' }
attributes = user_attributes.merge options
User.create! attributes
end