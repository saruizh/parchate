class Comentario
  include Mongoid::Document
  include Mongoid::Timestamps
  field :id_plan, type: Integer
  field :nickname, type: String
  field :cuerpo, type: String
  field :rating, type: Integer
end
