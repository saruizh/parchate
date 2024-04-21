class ComentariosController < ApplicationController
  before_action :set_comentario, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token, only: [:create]
  # GET /comentarios or /comentarios.json
  def index
    @comentarios = Comentario.all
    render json: @comentarios
  end

  # GET /comentarios/1 or /comentarios/1.json
  def show
    render json: @comentario
  end

  # GET /comentarios/new
  def new
    @comentario = Comentario.new
  end

  # GET /comentarios/1/edit
  def edit
  end

  # POST /comentarios or /comentarios.json
  def create
    @comentario = Comentario.new(comentario_params)
  
    if @comentario.save
      render json: @comentario, status: :created, location: @comentario
    else
      render json: @comentario.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comentarios/1 or /comentarios/1.json
  def update
    if @comentario.update(comentario_params)
      render json: @comentario, status: :ok
    else
      render json: @comentario.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comentarios/1 or /comentarios/1.json
  def destroy
    @comentario.destroy!
    render json: { message: 'Comentario successfully deleted' }, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comentario
      @comentario = Comentario.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comentario_params
      puts params.inspect
      if params[:comentario]
        params.require(:comentario).permit(:id_plan, :nickname, :cuerpo, :rating)
      else
        params.permit(:id_plan, :nickname, :cuerpo, :rating)
      end
    end
end


