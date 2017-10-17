var express = require ("express");
var multer = require("multer");
var app = express();
var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
var csvjson = require("csvjson");
var json2xls = require('json2xls');
const csv=require('csvtojson')
var jsonfile = require('jsonfile')


var ejs = require("ejs");


app.set("view engine", "ejs");
var jsonParser       = bodyParser.json({limit:1024*1024*40, type:'application/json'});
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding' })

app.use(jsonParser);
app.use(urlencodedParser); 


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


//app.post('/upload')
app.post("/uploads",function(req,res,next){
	
	//console.log(req.body);
	
	fs.writeFile(__dirname+"/uploads/post"+Math.random() * 1000 +".json", JSON.stringify(req.body), function(err) {
		if(err) {
		   return console.log(err);
		}
		
	  res.sendStatus(200)
		//res.json(req.body)
		//console.log(' save file');
		
	  });
	}) 
 app.get("/uploads",function(req,res,next){
	fs.readdir("uploads", function(err, filenames){
		if(err){
			console.log(err)
		}
		console.log(filenames[filenames.length-1])
		var temp = filenames[filenames.length-1]
		var data = fs.readFileSync(path.join("uploads/" +  temp), { encoding : "utf8"})
	
		res.json(JSON.parse(data))
		res.sendStatus(201)
	})
	// var homedir = path.join(__dirname + "/uploads");
	// var files = fs.readdirSync(homedir);
	// var data = fs.readFileSync(path.join("uploads/" +  files[files.length-1]), { encoding : "utf8"});
	// console.log(data)
});	  
	// var csvData= req.body;
	// /*
	// {
	// 	delimiter : <String> optional default is ","
	// 	quote     : <String|Boolean> default is null
	// }
	// */
	// var options = {
	//   delimiter : ',', // optional 
	//   quote     : '"' // optional 
	// };
	// // for multiple delimiter you can use regex pattern like this /[,|;]+/ 
	 
	// /* 
	//   for importing headers from different source you can use headers property in options 
	//   var options = {
	// 	headers : "sr,name,age,gender"
	//   };
	// */
	 
	// console.log(csvjson.toObject(csvData, options));
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
	
//});
// app.use(json2xls.middleware);
// app.post("/alldata",function(req,res,next){
// 	var homedir = path.join(__dirname + "/uploads");
// 	var files = fs.readdirSync(homedir);
// //console.log(files)
// 	if(files.length == 0){
// 	next()
// 	}else{
// 		var data = fs.readFileSync(path.join("uploads/" +  files[files.length-1]), { encoding : "utf8"});
		
// 		console.log('here')
// 		var options = {
// 			delimiter : ',', // optional 
// 			quote     : '"' // optional 
// 		  };
		   
// 		  // for multiple delimiter you can use regex pattern like this /[,|;]+/ 
		   
// 		 // csvjson.toArray(data, options);
// 		  csvjson.toSchemaObject(data, options)
// 		var xls = json2xls(csvjson.toSchemaObject(data, options));
// 	//console.log(data)
	
// 	fs.writeFileSync('fake.xlsx', xls, 'binary');
// 	}
	
// });




var port = process.env.PORT || 8000;
app.listen(port, function () {
	console.log("Node.js listening on port " + port);
});
