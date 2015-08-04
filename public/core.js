var app = angular.module('sardineCan', []);

app.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('mainController', function($scope, $http) {
  $scope.formData = {};

  $http.get('/api/trips')
    .success(function(data) {
      $scope.trips = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error:', data);
    });

  $scope.createTrip = function() {
    $http.post('/api/trips', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.trips = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error:', data);
      });
  };

  $scope.deleteTrip = function(id) {
    $http.delete('/api/trips/' + id)
      .success(function(data) {
        $scope.trips = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error:', data);
      });
  };
  $scope.getStations = function() {
    $http.get('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V')
      .success(function(data) {
        $scope.stations = $.parseXML(data);
        console.log($scope.stations);
      })
      .error(function(data) {
        console.log('Error:', data);
      });  
  };
  $scope.getStations();
});
