const {GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLSchema} = require('graphql');
const axios = require('axios');

//define your schema here
//launch type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: {
            type: GraphQLInt
        },
        mission_name: {
            type: GraphQLString
        },
        launch_year: {
            type: GraphQLString
        },
        launch_success: {
            type: GraphQLBoolean
        },
        rocket: {
            type: RocketType
        }
    })
});
//rocket type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {
            type: GraphQLString
        }
    })
});
//end of schema definition

//root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve: async (parent, args) => {
                const res = await axios.get('https://api.spacexdata.com/v3/launches');
                return res.data;
            } 
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});