var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var flash = require("connect-flash");
var Campground = require("./models/campground");
var User = require("./models/user");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
//Requiring Routes
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");


// mongoose.connect("mongodb://localhost/yelp_camp_v12");
mongoose.connect("mongodb://Ryan:Aardvark12@ds119810.mlab.com:19810/yelpcamp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION

app.use(require("express-session")({
 secret: "CooperRocks",
 resave: false,
 saveUninitialized: false
 
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
 res.locals.currentUser = req.user;
 res.locals.error = req.flash("error");
 res.locals.success = req.flash("success");
 next();
});


app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

// seedDB();




app.listen(process.env.PORT, process.env.IP, function(){
 console.log("V1 Is A Go!");
});