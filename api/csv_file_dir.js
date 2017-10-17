
//const csvFilePath='"C:/Users/riste/Desktop/testReact/reactjs-basics-master/uploads'


  exports.method =function(req , res){
    var homedir = "C:/Users/riste/Desktop/testReact/reactjs-basics-master/uploads"
    var files = fs.readdirSync(homedir);

    console.log('tsr')
      if(path.extname(files[files.length-1]) === ".csv") {
          //do something
          fs.readFile('uploads/' + files[files.length-1], 'utf8', function (err,data) {
            if (err) {
               console.log(err);
            }
          // return data
          csv({noheader:true})
          .fromString(data)
          .on('csv',(csvRow)=>{
  // this func will be called 3 times
               // => [1,2,3] , [4,5,6]  , [7,8,9]
               res.json(csvRow)
               console.log(csvRow)

          })
          .on('done',(csvRow)=>{
              //parsing finished

          })
          })
      }

      }
//console.log(modules.method())
