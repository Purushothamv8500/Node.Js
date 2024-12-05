const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const ejs = require('ejs')

const app = express()
const PORT = 4000

app.use(express.json())
dotenv.config()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

const secretKey = process.env.mySecretKey

const users = [{
        id: "1",
        username: "purush",
        password: "purush",
        isAdmin: true
    },
    {
        id: "2",
        username: "vikas",
        password: "vikas",
        isAdmin: false
    }
]

const verifyUser = (req, res, next) => {
    const userToken = req.headers.authorization
    if (userToken) {
        const token = userToken.split(" ")[1]
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ err: "token is not valid" })
            }
            req.user = user
            next()
        })

    } else {
        res.status(401).json("you are not authenticated")
    }
}



app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find((person) => {
        return person.username === username && person.password === password
    })
    if (user) {
        const accessToken = jwt.sign({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
        }, secretKey)
        res.json({
            username: user.username,
            isAdmin: user.isAdmin,
            accessToken
        })
    } else {
        res.status(401).json("user crential not matched")
    }

})

app.delete('/api/users/:userId', verifyUser, (req, res) => {

    if (req.user.id === req.params.userId || req.user.isAdmin) {
        res.status(200).json("user is deleted successfull")
    } else {
        res.status(401).json("you are not allowed to delete")
    }

})
app.get("/purush", (req, res) => {
    res.render("purush")
})
app.get("/vikas", (req, res) => {
    res.render("vikas")
})

app.get('/api/login/:userId', (req, res) => {
    const userId = req.params.userId
    if (userId) {
        if (userId === "1") {
            res.redirect('/purush')
        } else if (userId === "2") {
            res.redirect("/vikas")
        }
    } else {
        res.status(403).json("user not found")
    }
})

app.post("/api/logout", (req, res) => {
    const userTokens = req.headers.authorization
    if (userTokens) {
        const token = userTokens.split(" ")[1]
        if (token) {
            let allTokens = []
            const tokenIndex = allTokens.indexOf(token)
            if (tokenIndex !== -1) {
                allTokens.splice(tokenIndex, 1)
                res.status(200).json("Logout Succesfully!")
                res.redirect("/")
            } else {
                res.status(400).json("you are not valied use")
            }

        } else {
            res.status(400).json("token not found")
        }

    } else {
        res.status(400).json("You are not authenitcated")
    }

})

app.get('/api/logout', (req, res) => {
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render('welcome')
})


app.listen(PORT, () => {
    console.log(`Server started and running @ ${PORT}`)
})