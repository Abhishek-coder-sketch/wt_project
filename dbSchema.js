const mongoose = require("mongoose");

const Schema = mongoose.Schema({
	title: String,
	content: String,
	tej:String,
	gender:String,
});

const backendCollection = mongoose.model("backendCollection", Schema);

module.exports = backendCollection;
