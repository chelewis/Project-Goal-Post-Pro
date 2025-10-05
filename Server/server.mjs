import express from "express";
import mysql from "mysql";

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
});

let users = [
    {
        id: 1,
        name: "John Doe",
        email: "",
        password: "password"
    }
];

app.get("/", (req, res) => {
    res.send("Welcome To Goal Post Pro");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to database");
    //------------- Create database and tables if they don't exist -------------
    db.query("CREATE DATABASE IF NOT EXISTS goalpostpro", (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Database created");
    });
    db.query("USE goalpostpro", (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Using database");
    });
    db.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Users table created");
    });
    db.query(`CREATE TABLE IF NOT EXISTS personnel (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        first_name VARCHAR(255) NOT NULL, 
        last_name VARCHAR(255) NOT NULL, 
        email VARCHAR(255),
        phone VARCHAR(255),
        personnel_type ENUM('athlete', 'admin', 'support') NOT NULL,
        height INT,
        weight INT,
        date_of_birth DATE,
        age INT,
        joined_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err, result) => {
        if (err) {
            throw err;
        }
        console.log("appraisal_attributes table created");
    });
    db.query("CREATE TABLE IF NOT EXISTS attributes (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, short_name VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", (err, result) => {
        if (err) {
            throw err;
        }
        console.log("attributes table created");
    });
    db.query("CREATE TABLE IF NOT EXISTS appraisals (id INT AUTO_INCREMENT PRIMARY KEY, scout_id INT NOT NULL, subject_id INT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", (err, result) => {
        if (err) {
            throw err;
        }
        console.log("appraisals table created");
    });
    db.query(`CREATE TABLE IF NOT EXISTS appraisal_attributes (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        attribute_id INT NOT NULL, 
        appraisal_id INT NOT NULL,
        score INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err, result) => {
        if (err) {
            throw err;
        }
        console.log("appraisal_attributes table created");
    });
    //create drill/test table
    db.query("CREATE TABLE IF NOT EXISTS drills (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", (err, result) => {
        if (err) {
            throw err;
        }
        console.log("drills table created");
    });
    //create personnel_drill table
    db.query(`CREATE TABLE IF NOT EXISTS personnel_drills (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        drill_id INT NOT NULL, 
        personnel_id INT NOT NULL,
        score INT NOT NULL,
        date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err, result) => {
        if (err) {
            throw err;
        }
        console.log("personnel_drills table created");
    });
    //create events table
    db.query("CREATE TABLE IF NOT EXISTS events (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", (err, result) => {
        if (err) {
            throw err;
        }
        console.log("events table created");
    });
    //create personnel_events table
    db.query(`CREATE TABLE IF NOT EXISTS personnel_events (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        event_id INT NOT NULL, 
        personnel_id INT NOT NULL,
        date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err, result) => {
        if (err) {
            throw err;
        }
        console.log("personnel_events table created");
    });
    //create countries table
    db.query("CREATE TABLE IF NOT EXISTS countries (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, iso2 VARCHAR(255), iso3 VARCHAR(255), local_name VARCHAR(225), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", (err, result) => {
        if (err) {
            throw err;
        }
        console.log("countries table created");
    });
    //create continents table
    db.query("CREATE TABLE IF NOT EXISTS continents (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, code VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", (err, result) => {
        if (err) {
            throw err;
        }
        console.log("continents table created");
    });

    // -----------------  -----------------

    // getDBUsers();
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            throw err;
        }
        users = result;
        console.log(result);
    });
});

app.get("/users", (req, res) => {
    res.json(users);
});
app.get("/users/:id", (req, res) => {
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.json(user);
});
app.post("/users", (req, res) => {
    const user = {
        // id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    users.push(user);
    res.json(user);
});
app.put("/users/:id", (req, res) => {
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send("User not found");
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    res.json(user);
});
app.delete("/users/:id", (req, res) => {
    const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).send("User not found");
    }
    users.splice(userIndex, 1);
    res.json(users);
});

//personnel endpoints
app.get("/personnel", (req, res) => {
    db.query("SELECT * FROM personnel", (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.get("/personnel/:id", (req, res) => {
    db.query("SELECT * FROM personnel WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.post("/personnel", (req, res) => {
    const personnel = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        personnel_type: req.body.personnel_type,
        height: req.body.height,
        weight: req.body.weight,
        date_of_birth: req.body.date_of_birth,
        age: req.body.age,
        joined_at: req.body.joined_at
    };
    db.query("INSERT INTO personnel SET ?", personnel, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

//appraisals endpoints
app.get("/appraisals", (req, res) => {
    db.query("SELECT * FROM appraisals", (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.get("/appraisals/:id", (req, res) => {
    db.query("SELECT * FROM appraisals WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.post("/appraisals", (req, res) => {
    const appraisal = {
        scout_id: req.body.scout_id,
        subject_id: req.body.subject_id
    };
    db.query("INSERT INTO appraisals SET ?", appraisal, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.put("/appraisals/:id", (req, res) => {
    const appraisal = {
        scout_id: req.body.scout_id,
        subject_id: req.body.subject_id
    };
    db.query("UPDATE appraisals SET ? WHERE id = ?", [appraisal, req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.delete("/appraisals/:id", (req, res) => {
    db.query("DELETE FROM appraisals WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

//appraisal_attributes endpoints
app.get("/appraisal_attributes", (req, res) => {
    db.query("SELECT * FROM appraisal_attributes", (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.get("/appraisal_attributes/:id", (req, res) => {
    db.query("SELECT * FROM appraisal_attributes WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.post("/appraisal_attributes", (req, res) => {
    const appraisal_attribute = {
        attribute_id: req.body.attribute_id,
        appraisal_id: req.body.appraisal_id,
        score: req.body.score
    };
    db.query("INSERT INTO appraisal_attributes SET ?", appraisal_attribute, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.put("/appraisal_attributes/:id", (req, res) => {
    const appraisal_attribute = {
        attribute_id: req.body.attribute_id,
        appraisal_id: req.body.appraisal_id,
        score: req.body.score
    };
    db.query("UPDATE appraisal_attributes SET ? WHERE id = ?", [appraisal_attribute, req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.delete("/appraisal_attributes/:id", (req, res) => {
    db.query("DELETE FROM appraisal_attributes WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

//drills endpoints
app.get("/drills", (req, res) => {
    db.query("SELECT * FROM drills", (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.get("/drills/:id", (req, res) => {
    db.query("SELECT * FROM drills WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.post("/drills", (req, res) => {
    const drill = {
        name: req.body.name
    };
    db.query("INSERT INTO drills SET ?", drill, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.put("/drills/:id", (req, res) => {
    const drill = {
        name: req.body.name
    };
    db.query("UPDATE drills SET ? WHERE id = ?", [drill, req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.delete("/drills/:id", (req, res) => {
    db.query("DELETE FROM drills WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

//personnel_drills endpoints
app.get("/personnel_drills", (req, res) => {
    db.query("SELECT * FROM personnel_drills", (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.get("/personnel_drills/:id", (req, res) => {
    db.query("SELECT * FROM personnel_drills WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.post("/personnel_drills", (req, res) => {
    const personnel_drill = {
        drill_id: req.body.drill_id,
        personnel_id: req.body.personnel_id,
        score: req.body.score,
        date: req.body.date
    };
    db.query("INSERT INTO personnel_drills SET ?", personnel_drill, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.put("/personnel_drills/:id", (req, res) => {
    const personnel_drill = {
        drill_id: req.body.drill_id,
        personnel_id: req.body.personnel_id,
        score: req.body.score,
        date: req.body.date
    };
    db.query("UPDATE personnel_drills SET ? WHERE id = ?", [personnel_drill, req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.delete("/personnel_drills/:id", (req, res) => {
    db.query("DELETE FROM personnel_drills WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

//get all users from the database
function getDBUsers() {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
    return result;
};