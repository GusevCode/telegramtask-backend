//Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

//Routes
const v1ClientRouter = require('./v1/routes/clientRoutes');
const v1EventRouter = require('./v1/routes/eventRoutes');

//Settings
const app = express();
const PORT = process.env.PORT || 3000;

//Early init
app.use(cors());
app.use(bodyParser.json());

//Init
app.use('/api/v1/clients', v1ClientRouter);
app.use('/api/v1/events', v1EventRouter);

//Start
app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    console.log(`Running at http://localhost:3000/`)
})