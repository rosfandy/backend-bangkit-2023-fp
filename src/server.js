const express   = require('express')
const app       = express()
const http      = require("http");
const morgan    = require('morgan'); 
const cors      = require('cors')

const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
const articleRoutes = require('./routes/article.routes')
const predictRoutes = require('./routes/predict.routes')
// const paymentRoutes = require('./routes/payment.routes')
const forumRoutes = require('./routes/forum.routes')

const corsConfig = {
  credentials: true,
  origin: true,
};

// konfigurasi express
app.use(cors(corsConfig));
app.use(express.json());
app.enable("trust proxy");
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes-module : endpoint
app.use(userRoutes)
app.use(articleRoutes)
app.use(predictRoutes)
// app.use(paymentRoutes)
app.use(forumRoutes)


// init server
const init = ()=>{
  let port = process.env.PORT || 8080;
  app.set("port", port);
  let server = http.createServer(app);
  server.listen(port, '0.0.0.0'); 
  server.on("listening", () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();