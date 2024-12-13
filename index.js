const express = require('express');
const myParser = require("body-parser");
const { swaggerDocs, swaggerUi } = require('./swagger');


const app = express();
const port = 5000;

app.use(myParser.json({limit: '200mb'}));
app.use(myParser.urlencoded({limit: '200mb', extended: true}));

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/position', require('./routes/position.js'))

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });