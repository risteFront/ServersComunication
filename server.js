var express = require ("express");
var multer = require("multer");
var app = express();
var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
var csvjson = require("csvjson");
var json2xls = require('json2xls');
const csv=require('csvtojson')

var ejs = require("ejs");


app.set("view engine", "ejs");
app.use(bodyParser.json());

app.use(express.static("client"));
app.set("views", path.join(__dirname,  "/client/views"));

app.use(function(req, res, next) { 
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.static(__dirname + "/client/css"));

var convertedFile = require("./api/csv_file_dir");



app.get("/", function(req, res) {
	res.render("index",{title:"insert a csv format"});
});

app.post("/", function(req, res ,next) {
	var storage = multer.diskStorage({
		destination: function(req, file, callback) {
			callback(null, "./uploads");
		},
		filename: function(req, file, callback) {
			callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
		}
	});
	
	var upload = multer({
		storage: storage,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname);
			if (ext !== ".csv") {
				res.render("index",{title:"Only CSV file is allowed"});
				return
			}
			
			callback(null, true);
		}
	}).single("userFile");
	upload(req, res, function(err) {
		res.render("index",{title:"File is uploaded"});
	});
});

//app.post('/upload')
app.post("/uploads",function(req,res,next){
	//console.log(req.body);
	var csvData= req.body;
	/*
	{
		delimiter : <String> optional default is ","
		quote     : <String|Boolean> default is null
	}
	*/
	var options = {
	  delimiter : ',', // optional 
	  quote     : '"' // optional 
	};
	// for multiple delimiter you can use regex pattern like this /[,|;]+/ 
	 
	/* 
	  for importing headers from different source you can use headers property in options 
	  var options = {
		headers : "sr,name,age,gender"
	  };
	*/
	 
	console.log(csvjson.toObject(csvData, options));
	// var homedir = path.join(__dirname + "/uploads");
	// var files = fs.readdirSync(homedir);
	
	// if(files.length == 0){
	// next()
	// }else{
	// 	var data = fs.readFileSync(path.join("uploads/" +  files[files.length-1]), { encoding : "utf8"});
		
	// var options = {
	// 	delimiter : ",", // optional
	// 	quote     : "\"" // optional
	// };
	// var arr = [];
	// var originalProps =["ulCounter", "timestamp", "fcnt", "deui", "gw", "ftime", "ft2d", "etime", "snr", "rssi", "ant", "lsnr", "rssic", "rssis", "lat", "lon"]
	// var dataForCheck = csvjson.toObject(data, options)
	// var formatedData = Object.getOwnPropertyNames(dataForCheck[0])
	// // console.log(originalProps )
	//  //console.log(formatedData)

	// var test = originalProps.filter(val => !formatedData.includes(val));
	// console.log(test)
	//  for(var temp of test){
	//    arr.push(`Error , cannot find "${temp}" in table, please try again with valid data`)
	//  }
	// // console.log(arr)
	// // console.log(data)
	// if(arr.length>0){
	// 	res.json(arr)
	// 	return next()
	// }else{
	// 	res.json(csvjson.toObject(data, options));
	// }
	
	// }
	
});
app.use(json2xls.middleware);
app.post("/alldata",function(req,res,next){
	var homedir = path.join(__dirname + "/uploads");
	var files = fs.readdirSync(homedir);
//console.log(files)
	if(files.length == 0){
	next()
	}else{
		var data = fs.readFileSync(path.join("uploads/" +  files[files.length-1]), { encoding : "utf8"});
		
		console.log('here')
		var options = {
			delimiter : ',', // optional 
			quote     : '"' // optional 
		  };
		   
		  // for multiple delimiter you can use regex pattern like this /[,|;]+/ 
		   
		 // csvjson.toArray(data, options);
		  csvjson.toSchemaObject(data, options)
		var xls = json2xls(csvjson.toSchemaObject(data, options));
	//console.log(data)
	
	fs.writeFileSync('fake.xlsx', xls, 'binary');
	}
	
});




var port = process.env.PORT || 8000;
app.listen(port, function () {
	console.log("Node.js listening on port " + port);
});
