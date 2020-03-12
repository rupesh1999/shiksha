const express = require("express");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const port = 5000 || process.env.port;
app.use(express.static('routes/uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// initialize passport
app.use(passport.initialize());
require("./config/passport_config.js")(passport);

mongoose.connect(keys.mongodb.URI , {useNewUrlParser : true})
.then(() => console.log("connected to mongodb"))
.catch(err => console.log("error is" , err));

//routes
app.use("/users" , require("./routes/auth.js"));
app.use("/content" , require("./routes/content"));
app.use("/permissions" , require("./routes/permission"));
app.use("/lookup" , require("./routes/LookupRoutes/getBoardData"));
app.use("/lookup" , require("./routes/LookupRoutes/getClassData"));
app.use("/lookup" , require("./routes/LookupRoutes/getSubjectData"));
app.use("/lookup" , require("./routes/LookupRoutes/getImportanceLevelData"));
app.use("/lookup" , require("./routes/LookupRoutes/getDifficultyLevelData"));


app.listen(port , () => {
    console.log(`running at port ${port}`);
})