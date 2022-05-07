const express = require("express");
require("./dbConnection.js");
const backendCollection = require("./dbSchema.js");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("hello world");
});

// get method --- get all the data in the collection of mongodb
app.get("/posts", async (req, res) => {
	const data = await backendCollection.find();
	res.send(data);
});

// post method --- send the data to server and then it is used to store the data in the server ie mongodb
app.post("/posts", async (req, res) => {
	const togiveData = new backendCollection({
		title: req.body.title,
		content: req.body.content,
		tej: req.body.tej,
		gender: req.body.gender,
	});
	await togiveData.save();
	res.send(togiveData);
});

// patch method -- this method is used to update the data in server ie mongodb
app.patch("/posts/:id", async (req, res) => {
	try {
		const data = await backendCollection.findOne({ _id: req.params.id });
		if (req.body.title) {
			data.title = req.body.title;
		}

		if (req.body.content) {
			data.content = req.body.content;
		}
		if (req.body.tej) {
			data.tej = req.body.tej;
		}
		if (req.body.gender) {
			data.gender = req.body.gender;
		}
		await data.save();
		res.send(data);
	} catch (error) {
		res.status(404).send("data doesnt exists");
	}
});

// delete -- used to delete the data in the mongodb

app.delete("/posts/:id", async (req, res) => {
	try {
		await backendCollection.deleteOne({ _id: req.params.id });
		res.send("Deleted");
	} catch (error) {
		res.send("Posts doesnot found");
	}
});
app.listen(3000, function () {
	console.log("Listening to port 3000");
	console.log("hello");
});
