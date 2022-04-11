const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once("open", () => console.log(`Connected to mongo`));
