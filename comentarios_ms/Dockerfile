# Usa una imagen base de Ruby
FROM ruby:3.2.3

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el Gemfile y el Gemfile.lock al contenedor
COPY Gemfile Gemfile.lock ./

# Instala las dependencias usando Bundler
RUN bundle install

# Copia el resto de la aplicación al contenedor
COPY . .

# Expone el puerto 3001 para que pueda ser accesible desde fuera del contenedor
EXPOSE 3001

# Comando para iniciar el servidor Rails
CMD ["rails", "server", "-b", "0.0.0.0"]