//Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

//Routes
//v1
const v1ClientRouter = require('./v1/routes/clientRoutes');
const v1EventRouter = require('./v1/routes/eventRoutes');
const v1MonthRouter = require('./v1/routes/monthRouter');
const v1SocialStatsRouter = require('./v1/routes/socialStatsRouter');
const v1DepositRouter = require('./v1/routes/depositRouter');
const v1TaxRouter = require('./v1/routes/taxRouter');

const v1EarningRouter = require('./v1/routes/earningRoutes');
const v1SummaryRouter = require('./v1/routes/summaryRouter');

const v1AuthRouter = require('./v1/routes/authRouter');

//Settings
const app = express();
const PORT = process.env.PORT || 3000;

//Early init
const auth = require('./auth');
app.use(cors());
app.use(bodyParser.json());

//Auth settings

//Init
//MiddleWare
app.use((req, res, next) => {
    const _date = new Date();
    const date = _date.toLocaleDateString();
    const time = (_date.getHours().toString() + ":" + _date.getMinutes().toString() + ":" + _date.getSeconds().toString()); 
    console.log(`[${date} at ${time}] | Recieved ${req.method} request for ${req.url}`);
    if (auth.auth(req, res) && req.url != "/api/v1/auth") {
        next();
    } else if (req.url == "/api/v1/auth") {
        next();
    } else {
        res.status(401).send({
            data: {
                message: "Authentification failed",
            }
        });
    }
});

app.use('/api/v1/clients', v1ClientRouter);
app.use('/api/v1/events', v1EventRouter);
app.use('/api/v1/month', v1MonthRouter);
app.use('/api/v1/social_stats', v1SocialStatsRouter);
app.use('/api/v1/deposits', v1DepositRouter);
app.use('/api/v1/taxes', v1TaxRouter);;

app.use('/api/v1/earning', v1EarningRouter);
app.use('/api/v1/summary', v1SummaryRouter);

app.use('/api/v1/auth', v1AuthRouter);

//Start
app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    console.log(`Running at http://localhost:3000/`);
});