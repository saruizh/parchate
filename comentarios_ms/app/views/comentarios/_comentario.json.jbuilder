json.extract! comentario, :id, :id_plan, :nickname, :cuerpo, :rating, :created_at, :updated_at
json.url comentario_url(comentario, format: :json)
