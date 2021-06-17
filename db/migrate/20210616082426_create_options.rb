class CreateOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :options do |t|
      t.text :content, null: false
      t.integer :question_id
      t.timestamps
    end
  end
end
