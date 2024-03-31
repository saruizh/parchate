class Comentario
  include Mongoid::Document
  include Mongoid::Timestamps
  field :id_plan, type: Integer
  field :nickname, type: String
  field :comentario, type: String
  field :rating, type: Integer
end
