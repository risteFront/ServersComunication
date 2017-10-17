angular.module('myApp')
.controller('tableController', function ($scope, $filter,$http) {
    $scope.displayed = {}
    $http
    .post("http://localhost:8000/uploads")
    .success(function (data) {
        $scope.displayed = {}
        $scope.displayed.data = data
        
}).error(function (data, status) {
    alert(status);
  })

//   $(document).ready(function() {
//     $http
//     .post("http://localhost:8000/alldata")
//     .success(function (data) {

        
//       var result =data
//         console.log(data)
//         $('#example').DataTable( {
//             data: result,
//             columns: [
//                 { title: "ulCounter" },
//                 { title:"timestamp"},
//                 { title:"fcnt"},
//                 { title:"deui"},
//                 { title:"gw"},
//                 { title:"ftime"},
//                 { title:"ft2d"},
//                 { title:"etime"},
//                 { title:"snr"},
//                 { title:"rssi"},
//                 { title:"ant"},
//                 { title:"lsnr"},
//                 { title:"rssic"},
//                 { title:"rssis"},
//                 { title:"lat"},
//                 { title:"lon"}
                
//             ]
//         } );
//   }).error(function(err){
//     //  console.log(err)
//   })

// } );
})
