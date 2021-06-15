class CreateQuizzes < ActiveRecord::Migration[6.1]
  def change
    create_table :quizzes do |t|
      t.text :title, null: false
      t.string :slug, null: false
      t.integer :user_id
      t.timestamps
    end
  end
end
