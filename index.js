const express = require('express');
const { swaggerDocs, swaggerUi } = require('./swagger');


const app = express();
const port = 5000;

app.use(express.json())

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/position', require('./routes/position.js'))

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });