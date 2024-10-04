const express = require('express');

const bodyParser = require('body-parser');
const v1ClientRouter = require('./v1/routes/clientRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/v1/clients', v1ClientRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    console.log(`Running at http://localhost:3000/`)
})