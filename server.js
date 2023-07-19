const path = require('path');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const host = 'localhost';
const port = 3000;
const clientApp = path.join(__dirname, 'client');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(clientApp, { extensions: ['html'] }));
app.use(cors())

app.listen(port, () => {
	console.log(`${new Date()}  App Started. Listening on ${host}:${port}, serving ${clientApp}`);
});

const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'yourpassword',
	database: 'recipe'
});

connection.connect((error) => {
	if (error) {
		console.error('Failed to connect to MySQL server:', error);
		return;
	}
	console.log('Connected to MySQL server');
});

connection.query('CREATE DATABASE IF NOT EXISTS mysqldb', (error, result) => {
	if (error) {
		console.log('Error creating database:', error);
	} else {
		console.log('Database created or already exists');
	}
});



app.route('/api/users')
	.post(function (req, res, next) {
		console.log('post users');
		var jsonBody = req.body;
		console.log(jsonBody);
		var input = 'SELECT Name FROM USER WHERE ID = ?';
		connection.query(input, [jsonBody.ID], (error, results) => {
			if (error) {
				console.error('Error executing SQL query:', error);
				res.status(500).send('Internal Server Error');
				return;
			}
			if (results.length > 0) {
				res.json(results);
			} else {
				res.status(400).send('User does not exist');
			}
		});
	});


// app.get('/api/recipe', function (req, res) {
// 	console.log('get recipe');
// 	var jsonBody = req.body;
// 	var input = "SELECT Name FROM Recipe"
// 	var input2 = "SELECT Difficulty FROM Recipe"
// 	var input3 = "SELECT Name, Difficulty FROM Recipe"
// 	if(jsonBody.Name == 1) var realinput = 
// 	connection.query(input,[jsonBody.Culture,jsonBody.FoodType], function (error, result, fields) {
// 		if(error) {
// 			console.error('Error executing SQL query:', error);
// 			res.status(500).send('No matchning Eatery');
// 		}
// 		else {
// 			res.send(result);
// 		}
// 	});
// });



app.get('/api/ingredient', function (req, res) {
	console.log('get ingredient');
	var jsonBody = req.body;
	var input = 'SELECT * FROM Ingredient ';
	connection.query(input, function (error, result, fields) {
		if(error) {
			console.error('Error executing SQL query:', error);
			res.status(500).send('Unable to load ingredient');
		}
		else {
			res.send(result);
		}
	});
});

app.post('/api/possess', function (req, res) {
    console.log('get ingredients from user');
    var jsonBody = req.body;
    console.log(jsonBody);
    var input = 'SELECT IngName FROM possess P, user U where U.ID = P.ID AND U.ID = ?';
    connection.query(input, [jsonBody.ID], function (error, result, fields) {
        if (error) {
            console.error('Error executing SQL query: ', error);
            res.status(500).send('Unable to get ingredients');
        } else {
            console.log("Ingredients retrived");
            res.send(result);
        }
    });
});

// app.post('/api/ingredient', function (req, res) {
//     console.log('post ingredient');
//     var jsonBody = req.body;
//     console.log(jsonBody);
//     var input = 'INSERT INTO Ingredient VALUES (?, ?)';
//     connection.query(input, [jsonBody.Name, jsonBody.Origin], function (error, result, fields) {
//         if (error) {
//             console.error('Error executing SQL query: ', error);
//             res.status(500).send('Unable to insert new ingredient / already exist');
//         } else {
//             console.log("Ingredient inserted");
//             res.sendStatus(200);
//         }
//     });
// });

app.delete('/api/possess', function (req, res) {
    console.log('delete ingredient');
    var jsonBody = req.body;
    console.log(jsonBody);
    var input = 'DELETE FROM Possess WHERE ID = ? AND IngName = ?';
    connection.query(input, [jsonBody.ID, jsonBody.IngName], function (error, result, fields) {
        if (error) {
            console.error('Error executing SQL query: ', error);
            res.status(500).send('Unable to delete ingredient');
        } else {
            console.log("ingredient deleted");
            res.sendStatus(200);
        }
    });
});

app.post('/api/possess/add', function (req, res) {
    console.log('add ingredient');
    var jsonBody = req.body;
    console.log(jsonBody);
    var input = 'INSERT INTO Possess VALUES (?, ?)';
    connection.query(input, [jsonBody.ID, jsonBody.IngName], function (error, result, fields) {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).send('Unable to insert new Ingredient / already exist');
        } else {
            console.log("Ingredient inserted");
            res.sendStatus(200);
        }
    });
});

// app.post('/api/ingredient/update', function (req, res) {
//     console.log('update ingredient');
//     var jsonBody = req.body;
//     console.log(jsonBody);
//     var input = 'UPDATE Ingredient SET Origin = ? WHERE Name = ?';
//     connection.query(input, [jsonBody.Origin, jsonBody.Name], function (error, result, fields) {
//         if (error) {
//             console.error('Error executing SQL query: ', error);
//             res.status(500).send('Unable to update ingredient');
//         } else {
//             console.log("ingredient updated");
//             console.log(result);			
//             res.sendStatus(200);
//         }
//     });
// });

app.post('/api/Recipe/project', function (req, res) {
    console.log('recipescontain 1. name, 2. difficulty, 3. name+difficulty');
    var jsonBody = req.body;
    console.log(jsonBody);
    var input = `SELECT ` +jsonBody.columns+ ` FROM recipescontain JOIN nutritionvalue ON recipescontain.NutID = nutritionvalue.ID`;
    connection.query(input, function (error, result) {
        if (error) {
            console.error('Error executing SQL query: ', error);
            res.status(500).send('Unable to project recipescontain');
        } else {
            console.log('recipescontain projected');
            console.log(input);
            res.json(result);
        }
    });
});

app.get('/api/ingredient/number', function (req, res) {
    console.log('total number of ingredient by user ID');
    var jsonBody = req.body;
    console.log(jsonBody);
    var input = `SELECT COUNT(*), ID FROM Possess GROUP BY ID`;
    connection.query(input, function (error, result) {
        if (error) {
            console.error('Error executing SQL query: ', error);
            res.status(500).send('Unable to ingredient number');
        } else {
            console.log('returning  ingredient number');
            console.log(input);
            res.json(result);
        }
    });
});

// app.get('/api/Recipe/nutrition', function (req, res) {
//     console.log('recipe and nutrition');
//     var jsonBody = req.body;
//     console.log(jsonBody);
//     var input = "SELECT recipescontain.name, nutritionvalue.Calories, nutritionvalue.Fat, nutritionvalue.Protein FROM recipescontain JOIN nutritionvalue ON recipescontain.NutID = nutritionvalue.ID";
//     connection.query(input, function (error, result) {
//         if (error) {
//             console.error('Error executing SQL query: ', error);
//             res.status(500).send('Unable to get nutrtionvalue');
//         } else {
//             console.log('receiving nutritionvalue');
//             console.log(input);
//             res.json(result);
//         }
//     });
// });

app.post('/api/Recipe/highCalories', function (req, res) {
    console.log('recipe caloreis > 200');
    var jsonBody = req.body;
    console.log(jsonBody);
    
    var input = "SELECT " + jsonBody.columns + " FROM recipescontain JOIN nutritionvalue ON recipescontain.NutID = nutritionvalue.ID HAVING nutritionvalue.Calories > 200";
    connection.query(input, [jsonBody.String],function (error, result) {
        if (error) {
            console.error('Error executing SQL query: ', error);
            res.status(500).send('Unable to get nutrtionvalue');
        } else {
            console.log('receiving nutritionvalue');
            console.log(input);
            res.json(result);
        }
    });
});

app.get('/api/ingredient/mostused', function (req, res) {
    console.log('ingredient - most used');
    var jsonBody = req.body;
    console.log(jsonBody);
    var input = "SELECT IngName, COUNT(*) FROM Cook GROUP BY IngName HAVING COUNT(*) >= ALL (SELECT COUNT(*) FROM Cook GROUP BY IngName)";
    connection.query(input, function (error, result) {
        if (error) {
            console.error('Error executing SQL query: ', error);
            res.status(500).send('Unable to get ingredient');
        } else {
            console.log('receiving ingredient - most used');
            console.log(input);
            res.json(result);
        }
    });
});

app.post('/api/recipe/haveall', function (req, res) {
    console.log('recipe - haveall');
    var jsonBody = req.body;
    console.log(jsonBody);
    var input = "SELECT " + jsonBody.columns + " FROM recipescontain JOIN nutritionvalue ON recipescontain.NutID = nutritionvalue.ID WHERE NOT EXISTS " +
    "(SELECT IngName FROM cook C1 WHERE recipescontain.Name = C1.RecName AND C1.IngName NOT IN (SELECT P.IngName FROM Possess P WHERE P.ID = ?))"
    connection.query(input,[jsonBody.ID], function (error, result) {
        if (error) {
            console.error('Error executing SQL query: ', error);
            res.status(500).send('Unable to get recipe');
        } else {
            console.log('receiving recipe - haveall');
            console.log(input);
            res.json(result);
        }
    });
});

app.post('/api/eatery', function (req, res) {
	console.log('get eatery');
	var jsonBody = req.body;
	console.log(jsonBody);
	var input = "SELECT Name FROM Eatery WHERE Culture = ? AND FoodType = ?"
	connection.query(input,[jsonBody.Culture,jsonBody.FoodType], function (error, result, fields) {
		if(error) {
			console.error('Error executing SQL query:', error);
			res.status(500).send('No matching Eatery');
		}
		else {
			res.send(result);
		}
	});
});

app.get('/api/eatery', function (req, res) {
	console.log('get eatery');
	var jsonBody = req.body;
	console.log(jsonBody);
	var input = "SELECT * FROM Eatery"
	connection.query(input, function (error, result, fields) {
		if(error) {
			console.error('Error executing SQL query:', error);
			res.status(500).send('No matching Eatery');
		}
		else {
			res.send(result);
		}
	});
});

app.delete('/api/eatery', function (req, res) {
    console.log('delete eatery');
    var jsonBody = req.body;
    console.log(jsonBody);
    var input = 'DELETE FROM Eatery WHERE Name = ?';
    connection.query(input, [jsonBody.EatName], function (error, result, fields) {
        if (error) {
            console.error('Error executing SQL query: ', error);
            res.status(500).send('Unable to delete eatery');
        } else {
            console.log("eatery deleted");
            res.sendStatus(200);
        }
    });
});


app.post('/api/eatery/branch', function (req, res) {
	console.log('get branch');
	var jsonBody = req.body;
	var input = "SELECT Street, UnitNumber,PostalCode FROM BranchHas1 WHERE EatName = ?"
	connection.query(input,[jsonBody.EatName], function (error, result, fields) {
		if(error) {
			console.error('Error executing SQL query:', error);
			res.status(500).send('No matchning Eatery');
		}
		else {
			res.send(result);
		}
	});
});

app.get('/api/eatery/branch/all', function (req, res) {
	console.log('get all branches');
	var jsonBody = req.body;
	var input = "SELECT * FROM BranchHas1"
	connection.query(input, function (error, result, fields) {
		if(error) {
			console.error('Error executing SQL query:', error);
			res.status(500).send('No matchning Eatery');
		}
		else {
			res.send(result);
		}
	});
});

app.post('/api/eatery/branch/updateStreet', function (req, res) {
	console.log('update Branch');
	var jsonBody = req.body;
	console.log(jsonBody)
	var input = "UPDATE BranchHas1 SET Street = ? Where Eatname = ? AND PostalCode = ? AND Street = ? And UnitNumber = ?"
	connection.query(input,[jsonBody.NewValue, jsonBody.EatName, jsonBody.PostalCode, jsonBody.Street, jsonBody.UnitNumber]
		, function (error, result, fields) {
		if(error) {
			console.error('Error executing SQL query:', error);
			res.status(500).send('No matchning Eatery');
		}
		else {
			res.send(result);
		}
	});
});

app.post('/api/eatery/branch/updateUnitNumber', function (req, res) {
	console.log('update Branch');
	var jsonBody = req.body;
	console.log(jsonBody)
	var input = "UPDATE BranchHas1 SET UnitNumber = ? Where Eatname = ? AND PostalCode = ? AND Street = ? And UnitNumber = ?"
	connection.query(input,[ jsonBody.NewValue, jsonBody.EatName, jsonBody.PostalCode, jsonBody.Street, jsonBody.UnitNumber]
		, function (error, result, fields) {
		if(error) {
			console.error('Error executing SQL query:', error);
			res.status(500).send('No matchning Eatery');
		}
		else {
			res.send(result);
		}
	});
});

app.post('/api/master', function (req, res) {
	console.log('master query');
	var jsonBody = req.body;
	console.log(jsonBody)
	var input = "SELECT " + jsonBody.Columns+ " FROM " + jsonBody.Table
    if (jsonBody.Condition){
        input += " WHERE " + jsonBody.Condition
    }

	connection.query(input, function (error, result, fields) {
		if(error) {
			console.error('Error executing SQL query:', error);
			res.status(500).send('No matchning Eatery');
		}
		else {
			res.send(result);
		}
	});
});