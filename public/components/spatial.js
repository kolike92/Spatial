var spatial = angular.module('spatial', []);

// TODO split into smaller controllers?
angular.module('spatial').controller('spatialctl', ['$scope', '$http', function($scope, $http, request, response) {

    // search
    $scope.form = "";
    $scope.searchactive = false;
    $scope.searchshow = function() {
        $scope.searchactive = !$scope.searchactive;
    }

    // nav bar
    $scope.navactive = false;
    $scope.navshow = function() {
        $scope.navactive = !$scope.navactive;
    };

    // map and geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        $scope.$apply(function(){
          $scope.position = position;
          console.log(position.coords.latitude);
          setTimeout(function() {
              map.flyTo({
                  center: [position.coords.longitude,position.coords.latitude],
                  zoom: 14
              });
          }, 1350);
        });
      });
    } else {
      alert("Location services unavailable.");
    }

    // serverside loc
    // $http({
    //     method: 'POST',
    //     url: "http://localhost:3000/geoloc"
    // }).then(function successCallback(response) {
    //
    // }, function errorCallback(response, error) {
    //     console.log(error);
    // });
}]);
