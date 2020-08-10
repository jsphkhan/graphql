const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

app.use('/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    }),
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
