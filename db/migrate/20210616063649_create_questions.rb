class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.text :title, null: false
      t.integer :quiz_id
      t.integer :user_id
      t.timestamps
    end
  end
end
