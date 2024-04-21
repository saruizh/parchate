import graphene
import graphql_ag.schema

class Query(graphql_ag.schema.Query, graphene.ObjectType):
    pass

class Mutation(graphql_ag.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)