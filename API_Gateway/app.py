from flask import Flask
from flask_graphql import GraphQLView
from schema import schema

app = Flask(__name__)
app.add_url_rule('/api_gateway', view_func=GraphQLView.as_view('api_gateway', schema=schema, graphiql=True))

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
