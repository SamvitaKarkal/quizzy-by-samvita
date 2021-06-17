class QuestionsController < ApplicationController
  before_action :authenticate_user, except: :index
  before_action :set_question, only: %i[ show update destroy]

  def index
    questions = Question.all.order('created_at DESC')
    render status: :ok, json: { questions: questions}
  end

  def create
    @question = Question.new(question_params.merge(user_id: @current_user.id))
    if @question.save
      render status: :ok, json: { notice: t('successfully_created', entity: 'Question') }
    else
      render status: :unprocessable_entity,
      json: {errors: @question.errors.full_messages }
    end
    rescue ActiveRecord::RecordNotUnique => e
      render status: :unprocessable_entity, json: { errors: e.message }
  end

  def show
    render status: :ok, json: {question: @question}
  end

  def update
    if @question.update(question_params)
      render status: :ok, json: {notice: t('successfully_updated', entity: 'Question') }
    else
      render status: :unprocessable_entity,
      json: {errors: @question.errors.full_messages }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: t('successfully_deleted', entity: 'Question') }
    else 
      render status: :unprocessabel_entity,
      json: {errors: question.errors.full_messages}
    end
  end

  private
    def set_question
      @question = Question.find(params[:id])
      render json: {error:@question.errors.full_messages.to_sentence} unless @question
      rescue ActiveRecord::RecordNotFound => e
      render json: {error: e }, status: :not_found
    end

    def question_params
      params.require(:question).permit(:title, :quiz_id, :option_attributes => [:id, :content])
    end

    def load_options
      @options = Option.where(question: @question.id)
    end
end
