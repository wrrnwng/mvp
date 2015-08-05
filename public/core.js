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
      // console.log(data);
    })
    .error(function(data) {
      console.log('Error:', data);
    });

  $scope.createTrip = function() {
    $http.post('/api/trips', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.trips = data;
        // console.log(data);
      })
      .error(function(data) {
        console.log('Error:', data);
      });
  };

  $scope.deleteTrip = function(id) {
    $http.delete('/api/trips/' + id)
      .success(function(data) {
        $scope.trips = data;
        // console.log(data);
      })
      .error(function(data) {
        console.log('Error:', data);
      });
  };
  $scope.getStations = function() {
    $http.get('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V')
      .success(function(data) {
        var stations = $($.parseXML(data)).find('stations')[0].children;
        for (var i = 0; i < stations.length; i++) {
          $scope.stations = $scope.stations || [];
          $scope.stations.push({name: $($(stations[i]).find('name')).text(),
                                abbr: $($(stations[i]).find('abbr')).text()});

        }
      })
      .error(function(data) {
        console.log('Error:', data);
      });  
  };
  $scope.getStations();

  $scope.getStationInfo = function(abbr) {
    $scope.estTimes = [];
    console.log(abbr);

    $http.get('http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=' + abbr + '&key=MW9S-E7SL-26DU-VV8V')
      .success(function(data) {
        var intro = $($($.parseXML(data)).find('intro')).text();
        var food = $($($.parseXML(data)).find('food')).text();
        var shopping = $($($.parseXML(data)).find('shopping')).text();
        var attractions = $($($.parseXML(data)).find('attractions')).text();
        $scope.stationInfo = {
          intro: intro,
          food: food,
          shopping: shopping,
          attractions: attractions
        };
      })
      .error(function(data) {
        console.log('Error:', data);
      });  

    $http.get('http://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + abbr + '&key=MW9S-E7SL-26DU-VV8V')
      .success(function(data) {
        var estTimes = $($.parseXML(data)).find('etd');
        for (var i = 0; i < estTimes.length; i++) {

          $scope.estTimes.push({
            destination: $($(estTimes[i]).find('destination')).text(),
            minutes: $($($(estTimes[i]).find('minutes')).first()).text(),
            color: $($($(estTimes[i]).find('color')).first()).text(),
            abbr: $($($(estTimes[i]).find('abbreviation')).first()).text()
          });
        }
        // console.log($scope.estTimes);
        console.log(data);
      })
      .error(function(data) {
        console.log('Error:', data);
      });  
  };

  $scope.formatTime = function(time) {
    if (parseInt(time)) {
      return time + ' min';
    } else {
      return time;
    }
  };


});
