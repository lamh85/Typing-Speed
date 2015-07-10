(function(){
  var app = angular.module("MyApp",[]);

  app.service('restService',['$http', function($http) {
    restVar = this;
    this.records = [1,2,3,4];
        
    this.getRecords = function() {
      $http.get('/typespeed').success(function(response) {
        console.log("getRecords Success function fired!");
        restVar.records = (response).reverse();
        console.log("restVar.records = " +restVar.records);
      }); // End GET function
      console.log("getRecords function is running!");
    } // end getRecords

    this.postRecord = function(currentRecord) {
      console.log("You are posting this info: " +currentRecord);

      $http.post('/typespeed', currentRecord).success(function(response) {
        console.log("postRecords Success function running!" +response);
        restVar.getRecords();
      }); // end POST function
    }; // end postRecords

    this.returnRecords = function(){
      return this.records;
    }

    // Calculations
    // ////////////

    this.toDateTime = function(unixTime) {
      return (new Date(unixTime)).toString('dddd, MMMM,yyyy');
    }

    this.wordCount = function(string) {
      if (typeof string != "undefined") {
        return string.split(" ").length;
      }
    }

    this.WPM = function(start,end,string) {
      wordCount = this.wordCount(string);
      minutes = (end - start) / 1000 / 60;
      return (wordCount / minutes);
    }

    this.mostFrequent = function(string) {
      if (typeof string != "undefined") {
        wordsOriginal = string.split(" ").sort();
        wordsNew = []; // This will become array without ducpliates
        for (x = 0; x < wordsOriginal.length; x++) {
          wordsNew.push(wordsOriginal[x]);
        }

        // Remove duplicates
        i = 0;
        while (i < wordsNew.length) {
          if (wordsNew[i] == wordsNew[i+1]) {
            wordsNew.splice((i+1),1);
          } else {
            i++;
          }
        }

        // Create properties named after the words
        myObject = {};
        for (x = 0; x < wordsNew.length; x++) {
          currentString = wordsNew[x];
          myObject[currentString] = 0;
        }

        // Count the words
        for (x = 0; x < wordsOriginal.length; x++) {
          currentString = wordsOriginal[x]
          myObject[currentString] ++;
        }

        // Find the most frequent word
        highestCount = 0;
        mostFrequentWord = "";
        for (x = 0; x < wordsNew.length; x++) {
          currentString = wordsNew[x];
          if (myObject[currentString] >= highestCount) {
            highestCount = myObject[currentString];
            mostFrequentWord = currentString;
          }
        }

        return mostFrequentWord;
      }
    } // End mostFrequent

    
  }]); // End service

  MyController = app.controller("MyController", ['$scope', '$http', '$interval', 'restService', function($scope, $http, $interval, restService){

    // Initialize variables:
    $scope.timeRemaining = 3;
    $scope.currentRecord = { start:"", end:"" };
    var sessionStarted = false;
    var countdown;
    $scope.records = restVar.records;

    var resetVariables = function() {
      $scope.timeRemaining = 3;
      $scope.currentRecord = { start:"", end:"" };
      sessionStarted = false;
      countdown;
      $scope.records = [];
    }

    restService.getRecords();

    $scope.$watch( function(){return restService.records}, function(){
      $scope.records = restService.records;
    })

    var stopCountDown = function() {
      $interval.cancel(countDown);
      $scope.currentRecord.end = (new Date()).getTime();
      restVar.postRecord($scope.currentRecord);
    };

    var decreaseTime = function() {
      $scope.timeRemaining --;
      if ($scope.timeRemaining == 0) {
        stopCountDown();
        resetVariables();
      }
    };

    $scope.keyUp = function() {
      if (sessionStarted == false) {
        sessionStarted = true;
        // Start countdown
        countDown = $interval(decreaseTime,1000);
      }

      if ($scope.currentRecord.end == "") {
        // Reset timer
        $scope.timeRemaining = 3;
      }

      if ($scope.currentRecord.start == "") {
        // Record start time
        $scope.currentRecord.start = (new Date()).getTime();
        console.log("The start time is " +$scope.currentRecord.start);
      }
    } // keyUp

    // Calculations
    // ////////////

    $scope.toDateTime = function(unixTime) {
      return restVar.toDateTime(unixTime);
    }

    $scope.wordCount = function(string) {
      return restVar.wordCount(string);
    }

    $scope.WPM = function(start,end,string) {
      return restVar.WPM(start,end,string);
    }

    $scope.mostFrequent = function(string) {
      return restVar.mostFrequent(string);
    } // End mostFrequent
  
  }]); // End controller

})(); // Whole function closure