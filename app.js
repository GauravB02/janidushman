const express = require("express");
const app = express();

const hbs = require("hbs");
const path = require("path");


const port = process.env.PORT || 8000;

const staticpath = path.join(__dirname, "../public");
const partialpath = path.join(__dirname, "../templates/partials");
const viewspath = path.join(__dirname, "../templates/views");

app.use(express.static(staticpath));
app.set()

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const usermail = await User.findOne({ email: email });

        if (usermail.password === password) {
            res.status(201).render("index");
        } else {
            res.send("invalid login cradiantials");
        }

    } catch (error) {
        res.status(401).send(error);
    }

})


app.post("/register", async(req, res) => {
    try {
        const userData = new User(req.body);

        await userData.save();
        res.status(201).render("home");

    } catch (error) {
        res.status(401).send(error);
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})