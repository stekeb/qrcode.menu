require('dotenv').config();
express = require ('express');
app = express();
const cors = require ('cors');
const router = require('./router')
const PORT = process.env.PORT;
const sequelize = require('./models/index')

app.use(express.json());
app.use(cors());
app.use(router);


(async () => {
  try {
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()

app.listen(PORT);
console.log(`Server is listening at http://localhost:${PORT}`)