var spatial = angular.module('spatial', []);

// TODO split into smaller controllers?
angular.module('spatial').controller('spatialctl', ['$scope', '$http', function($scope, $http, request, response) {

    // search
    $scope.form = "";
    $scope.searchactive = false;
    $scope.searchshow = function() {
        $scope.searchactive = !$scope.searchactive;
    }

    // navigation
    $scope.navactive = false;
    $scope.navshow = function() {
        $scope.navactive = !$scope.navactive;
      };

    // map and geolocation
    $http({
        method: 'POST',
        url: "http://localhost:3000/geoloc"
    }).then(function successCallback(response) {
        setTimeout(function() {
            map.flyTo({
                center: [response.data.lng,response.data.lat],
                zoom: 14
            });
        }, 1350);
    }, function errorCallback(response, error) {
        console.log(error);
    });
}]);
