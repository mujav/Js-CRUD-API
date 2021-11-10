let express = require('express')
let mongoose = require('mongoose'),

app = express()

const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const router = require('./routes/index')
const User = require('./models/user')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/blogs', {
    useUnifiedTopology: true,
    useNewUrlParser:true
});



app.use(express.json())

app.use(cookieParser('myblog'))
app.use(expressSession({
    secret: 'myblog',
    saveUninitialized: true,
    resave: true,
    cookie: {maxAge: 6000}
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/', router)

app.listen(3000, () => {
    console.log("express has started !")
})