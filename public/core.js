var app = angular.module('sardineCan', []);

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
});
