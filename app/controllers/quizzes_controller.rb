class QuizzesController < ApplicationController
    before_action :authenticate_user, except: :index
    before_action :load_quiz, only: %i[show update destroy]

    def index
        quizzes = Quiz.all.order('created_at DESC')
        render status: :ok, json: { quizzes: quizzes }
    end

    def create
        @quiz = Quiz.new(load_params.merge(user_id: @current_user.id))
        if @quiz.save
        render status: :ok, json: { notice: t('successfully_created', entity: 'Quiz') }
        else
        render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
        end
        rescue ActiveRecord::RecordNotUnique => e
        render status: :unprocessable_entity, json: { errors: e.message }
    end

    def show
        render status: :ok, json: {quiz: @quiz}
    end

    def update
        if @quiz.update(load_params)
        render status: :ok, json: {notice: t('successfully_updated', entity: 'Quiz') }
        else
        render status: :unprocessable_entity, 
        json: { errors: @quiz.errors.full_messages }
        end
    end

    def destroy
        if @quiz.destroy
        render status: :ok, json: { notice: t('successfully_deleted', entity: 'Quiz') }
        else
        render status: :unprocessable_entity, 
        json: { errors: @quiz.errors.full_messages}
        end
    end

    private

    def load_quiz
        @quiz = Quiz.find_by_slug!(params[:slug])
        render json: {error: @quiz.errors.full_messages.to_sentence} unless @quiz
        rescue ActiveRecord::RecordNotFound => e
        render json: { error: e }, status: :not_found
    end

    def load_params
        params.require(:quiz).permit(:title)
        #, :user_id)
    end 
end
