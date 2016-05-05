var spatial = angular.module('spatial', []);

// TODO split into smaller controllers?
angular.module('spatial').controller('spatialctl', ['$scope', function($scope, $http, request, response) {
    // nav bar
    $scope.navactive = false;
    $scope.navshow = function() {
        $scope.navactive = !$scope.navactive;
    };

    // style hacks ;(
    $scope.scroll = false;

    // view switching
    $scope.view = 'map.html';
    $scope.mapview = function() {
        $scope.view = 'map.html';
        $scope.scroll = false;
        $scope.searchacive = false;
    }
    $scope.listview = function() {
        $scope.view = 'list.html';
        $scope.scroll = true;
        $scope.searchactive = false;
    }

    // search
    $scope.form = "";
    $scope.searchactive = false;
    $scope.searchshow = function() {
        $scope.searchactive = !$scope.searchactive;
    }

    // geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        $scope.$apply(function(){
          $scope.position = position;
        });
      });
    } else {
      alert("Sorry, location services are unavailable.");
    }
}]);

// map
angular.module('spatial').controller('mapctl', ['$scope', function($scope, $http, request, response) {
    mapboxgl.accessToken = "pk.eyJ1IjoiYXNtYWxsZGV2IiwiYSI6ImNpbTVka3hoaTAxbWR1am0zdGZrcjdmdngifQ.YCEnTS1Xao-M8wt-zIJ75A"
    var map = new mapboxgl.Map({
        container: 'content',
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [-98, 39],
        minZoom: 4,
        zoom: 4
    });

    setTimeout(function() {
        map.flyTo({
            center: [$scope.position.coords.longitude,$scope.position.coords.latitude],
            zoom: 14
        });
    }, 1350);

    // serverside loc
    // $http({
    //     method: 'POST',
    //     url: "http://localhost:3000/geoloc"
    // }).then(function successCallback(response) {
    //
    // }, function errorCallback(response, error) {
    //     console.log(error);
    // });
}])

angular.module('spatial').controller('listctl', ['$scope', '$http', function($scope, $http, request, response) {
    // place name
    $scope.place = "";
    var lat = $scope.position.coords.latitude + "";
    var lng = $scope.position.coords.longitude + "";
    $scope.prettycoords = lat.substring(0,5) + ', ' + lng.substring(0,6);
    $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $scope.position.coords.latitude + "," + $scope.position.coords.longitude).then(function(response){
        $scope.place = response.data.results[1].formatted_address;
    });

    // event list
    $http.get("/events").then(function(response){
        console.log(response.data);
        $scope.events = response.data;
    })
}]);
