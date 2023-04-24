require('dotenv').config(); // this is important!

const http = require('http')

require('./config/dbConnect')

const app = require('./app/app');

const PORT = process.env.PORT || 4000;


//============Server=================//
const server = http.createServer(app)
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});