let express = require('express');
let app = express();
let cors = require('cors');
let bodyParser = require('body-parser');

let userRoutes = require('./routes/users.route');
let welfareRoutes = require('./routes/welfare.route');

require("dotenv").config();
const PORT = 5000;
app.use(bodyParser({ limit: '50mb' }));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', userRoutes);
app.use('/api/welfare', welfareRoutes);

app.listen(process.env.PORT || PORT, () => console.log('Server running on port ' + PORT));
module.exports = app;
