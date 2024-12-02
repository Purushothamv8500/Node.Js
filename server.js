const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection URL
const mongoUrl = "mongodb+srv://purushothamv8500:Rohith@143.u6gpr.mongodb.net/yourDatabaseName";

// GET: /users (Reads users from a local file)
app.get("/users", (request, response) => {
    fs.readFile("./01Tut/users.js", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            response.status(500).send({ status: "error", msg: "Internal Server Error" });
            return;
        }

        const results = {
            users: JSON.parse(data),
            status: "success",
            code: 101,
        };
        console.log("Users:", data);
        response.send(results);
    });
});

// POST: /createUser
app.post("/createUser", (request, response) => {
    const { name, password } = request.body;

    if (name && password) {
        if (name === "purush" && password === "123") {
            response.send({
                status: "success",
                code: 101,
                msg: "You are a valid user",
            });
        } else {
            response.send({
                status: "error",
                code: 103,
                msg: "Invalid credentials",
            });
        }
    } else {
        response.send({
            status: "error",
            code: 102,
            msg: "Name or password cannot be empty",
        });
    }
});

// Function to fetch data from MongoDB
function getProduct(action, callback) {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.error("MongoDB connection error:", err);
            callback({ status: "error", msg: "Database connection failed" });
            return;
        }

        const db = client.db("todoapp");
        const collection = db.collection("products");

        // Example query based on action
        if (action === "login") {
            collection.find({}).toArray((err, records) => {
                if (err) {
                    console.error("Error fetching records:", err);
                    callback({ status: "error", msg: "Failed to fetch records" });
                } else {
                    callback(records);
                }
                client.close();
            });
        } else {
            callback({ status: "error", msg: "Invalid action" });
            client.close();
        }
    });
}

// GET: /Products (Fetch products from MongoDB)
app.get("/Products", (request, response) => {
    getProduct("login", (records) => {
        if (records.status === "error") {
            response.status(500).send(records);
        } else {
            response.send({ status: "success", products: records });
        }
    });
});

// POST: /login
app.post("/login", (request, response) => {
    const { user, password } = request.body;
    console.log("Input:", user, password);

    getProduct("login", (records) => {
        if (records.status === "error") {
            response.status(500).send(records);
            return;
        }

        const userRecord = records.find(record => record.username === user && record.password === password);

        if (userRecord) {
            const token = Math.random().toString(36).substr(2);
            response.send({
                status: "success",
                token: token,
                msg: "Login successful"
            });
        } else {
            response.send({
                status: "error",
                msg: "Invalid credentials"
            });
        }
    });
});

// PUT: /updateUser
app.put("/updateUser", (request, response) => {
    const { id, email } = request.body;

    if (id && email) {
        response.send({
            status: "success",
            code: 101,
            msg: "User updated successfully",
        });
    } else {
        response.send({
            status: "error",
            code: 102,
            msg: "ID and email are required",
        });
    }
});

// DELETE: /deleteUser
app.delete("/deleteUser", (request, response) => {
    const { id } = request.body;

    if (!id || id <= 0) {
        return response.status(400).send({
            status: "error",
            code: 102,
            msg: "Valid ID is required to delete a user",
        });
    }

    fs.readFile("./01Tut/users.js", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return response.status(500).send({ status: "error", msg: "Internal Server Error" });
        }

        let users = JSON.parse(data);
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return response.status(404).send({
                status: "error",
                code: 103,
                msg: "User not found",
            });
        }

        // Remove the user from the array
        users.splice(userIndex, 1);

        // Write the updated list of users back to the file
        fs.writeFile("./01Tut/users.js", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return response.status(500).send({ status: "error", msg: "Failed to delete user" });
            }

            return response.send({
                status: "success",
                code: 101,
                msg: "User deleted successfully",
            });
        });
    });
});
app.post("/login", (request, response) => {
    const { user, password } = request.body;

    if (user === "purush" && password === "123") {
        const token = Math.random().toString(36).substr(2);
        response.send({
            status: "success",
            token: token,
        });
    } else {
        response.status(401).send({
            status: "error",
            msg: "Invalid credentials",
        });
    }
});


// Start the server
app.listen(8502, () => {
    console.log("Server is running on http://localhost:8502");
});
// const express = require("express");
// const bodyParser = require("body-parser");
// const MongoClient = require("mongodb").MongoClient;
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const app = express();
// const PORT = 8503;

// // Replace with your MongoDB connection string
// const MONGO_URI = "mongodb+srv://purushothamv8500:Rohith%40143@cluster0.mongodb.net/todoapp?retryWrites=true&w=majority";

// const JWT_SECRET = "your_secret_key"; // Replace with your secret key



// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // MongoDB Client
// let db;
// MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((client) => {
//         console.log("Connected to Database");
//         db = client.db("myDatabase");
//     })
//     .catch((err) => console.error("Failed to connect to Database:", err));

// // Routes

// // 1. **User Registration**
// app.post("/register", async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).send({ status: "error", msg: "Username and password are required" });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await db.collection("users").insertOne({ username, password: hashedPassword });
//         res.status(201).send({ status: "success", msg: "User registered successfully" });
//     } catch (err) {
//         console.error("Error during registration:", err);
//         res.status(500).send({ status: "error", msg: "Internal Server Error" });
//     }
// });

// // 2. **User Login**
// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).send({ status: "error", msg: "Username and password are required" });
//     }

//     try {
//         const user = await db.collection("users").findOne({ username });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).send({ status: "error", msg: "Invalid credentials" });
//         }

//         const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
//         res.send({ status: "success", token });
//     } catch (err) {
//         console.error("Error during login:", err);
//         res.status(500).send({ status: "error", msg: "Internal Server Error" });
//     }
// });

// // 3. **Fetch All Users**
// app.get("/users", async (req, res) => {
//     try {
//         const users = await db.collection("users").find({}, { projection: { password: 0 } }).toArray();
//         res.send({ status: "success", users });
//     } catch (err) {
//         console.error("Error fetching users:", err);
//         res.status(500).send({ status: "error", msg: "Internal Server Error" });
//     }
// });

// // 4. **Update User**
// app.put("/updateUser", async (req, res) => {
//     const { username, newUsername } = req.body;

//     if (!username || !newUsername) {
//         return res.status(400).send({ status: "error", msg: "Username and newUsername are required" });
//     }

//     try {
//         const result = await db.collection("users").updateOne(
//             { username },
//             { $set: { username: newUsername } }
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).send({ status: "error", msg: "User not found" });
//         }

//         res.send({ status: "success", msg: "User updated successfully" });
//     } catch (err) {
//         console.error("Error updating user:", err);
//         res.status(500).send({ status: "error", msg: "Internal Server Error" });
//     }
// });

// // 5. **Delete User**
// app.delete("/deleteUser", async (req, res) => {
//     const { username } = req.body;

//     if (!username) {
//         return res.status(400).send({ status: "error", msg: "Username is required" });
//     }

//     try {
//         const result = await db.collection("users").deleteOne({ username });

//         if (result.deletedCount === 0) {
//             return res.status(404).send({ status: "error", msg: "User not found" });
//         }

//         res.send({ status: "success", msg: "User deleted successfully" });
//     } catch (err) {
//         console.error("Error deleting user:", err);
//         res.status(500).send({ status: "error", msg: "Internal Server Error" });
//     }
// });

// // 6. **Protected Route**
// app.get("/protected", (req, res) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.status(401).send({ status: "error", msg: "Authorization header is required" });
//     }

//     const token = authHeader.split(" ")[1];
//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         res.send({ status: "success", msg: "You are authorized", user: decoded });
//     } catch (err) {
//         console.error("Invalid token:", err);
//         res.status(403).send({ status: "error", msg: "Invalid or expired token" });
//     }
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

