(function () {

  var app = angular
    .module('myApp', ['ui.router'])
    .controller('mainCtrl', [
      '$scope',
      '$http',
      '$state',
      function ($scope, $http, $state) {
        $(function () {
          
          
          $("#upload").bind("click", function () {
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv)$/;
            if (regex.test($("#fileUpload").val().toLowerCase())) {
                if (typeof (FileReader) != "undefined") {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var rows = e.target.result
                        var output_json = csvjson.csv2json(rows, {
                          delim: ",",
                          textdelim: "\""
                        });
                        console.log(output_json);
                         var originalData = output_json.headers;
                         var dataToCopare = ["ulCounter", "timestamp", "fcnt", "deui", "gw", "ftime", "ft2d", "etime", "snr", "rssi", "ant", "lsnr", "rssic", "rssis", "lat", "lon"];
                         console.log(originalData)
                         var filteredData = dataToCopare.filter(val => !originalData.includes(val));
                        console.log(filteredData);
                        if(filteredData.length > 0 && filteredData[0] !== "lon"){
                          for(var error of filteredData){
                            alert(`Error, field ${error} is required!`);
                          }
                          return
                        }
                        var temp = dipslayDataAfterHttp(output_json.rows);
                        console.log(temp);
                        $http({
                          url: 'http://localhost:8000/uploads',
                          method: "POST",
                          data: temp,
                          header: 'Content-Type: application/json'
                        }).success(function(data,status){
                         // console.log(data);
                        }).error(function(err){
                          alert(err)
                        })
                    }
                    reader.readAsText($("#fileUpload")[0].files[0]);
                } else {
                    alert("This browser does not support HTML5.");
                }
            } else {
                alert("Please upload a valid CSV file.");
            }
        });
      });

        //display data after callback is success
        function dipslayDataAfterHttp(data) {
          var dataFromRes = data

          function filterByID(item) {
            if (item.etime) {
              return true;
            }
            return false;
          }

          var arrByID = dataFromRes.filter(filterByID);

          var reformattedArray = arrByID.map(function (obj) {
            var rObj = {};

            rObj.ulCounter = obj.ulCounter
            rObj.etime = obj.etime
            rObj.deui = obj.deui
            rObj.gw = obj.gw
            return rObj;
          });
          var temp
          var byUlcounter
          byUlcounter = reformattedArray.slice(0);
          byUlcounter.sort(function (a, b) {
            return a.ulCounter - b.ulCounter;
          });
          return byUlcounter;
          // console.log(byUlcounter);
          // if (byUlcounter) {
          //   downloadData(byUlcounter)

          // } else {
          //   downloadData(data)
          // }
        }
        function downloadData(data) {
          var opts = [
            {
              sheetid: 'One',
              header: true
            }, {
              sheetid: 'Two',
              header: false
            }
          ];
          var res = alasql('SELECT * INTO XLSX("restest344b.xlsx",?)  FROM ?', [opts, [data]
          ]);

        }
        // $scope.uploadCsv = function () {
        //   $http
        //     .post("http://localhost:8000/uploads")
        //     .success(function (data) {
        //       downloadData(data)
        //     })
        //     .error(function (data, status) {
        //       alert(status);
        //     })
        // }
        $scope.saveFile = function () {
          $http
            .get("http://localhost:8000/uploads")
            .success(function (data) {
              $scope.loading = false;
              console.log(data)
             // var resultErrorValidation = dipslayDataAfterHttp(data);
              
            })
            .error(function (data, status) {
              alert(status);
            })
        }
        // $scope.saveFile2 = function saveFile() {
        //   $http
        //     .post("http://localhost:8000/uploads")
        //     .success(function (data) {
        //      // dipslayDataAfterHttp(data)
        //      var opts = [
        //       {
        //         sheetid: 'One',
        //         header: true
        //       }, {
        //         sheetid: 'Two',
        //         header: false
        //       }
        //     ];
        //     var res = alasql('SELECT * INTO XLSX("restest344b.xlsx",?)  FROM ?', [opts, [data]
        //     ]);
        //     })
        //     .error(function (data, status) {
        //       alert(status);
        //     })
        //   console.log('test')

        // }
        // function get(url){    return new Promise(function(resolve,reject){
        // $scope.saveFile = function () {       $http         .get(url)
        // .success(function (data) {           resolve(data)         })
        // .error(function (data, status) {           reject(data)         })     }
        // }) } var promise = get('http://json-schema.org/example/card.json');
        // promise.then(function(data){   console.log(data) }).catch(function(data){
        // console.log(data) })
      }
    ])
})();
