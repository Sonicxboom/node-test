const   express = require("express")
const   hbs = require("hbs")
const   app = express();
const   fs = require("fs")

// Helpers and Partials
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getYear", () => {
    return `Copyright ${ new Date().getFullYear() }`
});


// MiddleWare
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = ` ${now}, ${req.method}, ${req.url})`
    fs.appendFile("server.log", log + "\n", err => {
        if (err){
            console.log(err);
        }
    });
    next();
});
app.use((req, res, next) => {
    res.render("maintenance.hbs");
});
app.use(express.static(__dirname + "/public"));


app.set("view engine", hbs);


// Routes
app.get("/",  (req, res) => {
    res.render("index.hbs", {
        title: "Home Page"
    })
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        title: "About Page"
    })
});

app.get("/bad", function (req, res){
    res.json({errorMessage: "Not found!"})
});
// Listen
app.listen(3000, function (err){
    if (err){
        console.log(err);
    } else {
        console.log("Server is running on port 3000")
    }
});