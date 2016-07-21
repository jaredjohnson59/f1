App.factory('loadData', function($http, $rootScope) {

  var raceStandings = [];
  var raceData = [];
  var raceWinners = [];
  var raceWinnersFullInfo = [];
  var raceDrivers = [];


  var setChartMax = function(number){
    $rootScope.chartValue = number + 50;
    console.log("Chart Value ",$rootScope.chartValue);
  };

  var initialize = function()
  {
    //Get Data from external data
    var url = 'http://ergast.com/api/f1/current/driverStandings.json?callback=JSON_CALLBACK';

//Load JSON from url
 $http.jsonp(url)
        .success(function(response, status, headers, config) {

            //Set race standings
            standings = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            console.log("Loaded Data", standings);
            setRaceWinners(standings);
            setStandings(standings);
            setChartMax(parseInt(standings[0].points));
        });

        //Checks if a state has been set and if it has then applys details to details page
        window.addEventListener('popstate', function(e) {
          //Check if state has been set previously
          if(e.state != null)
          {
          $rootScope.titleName = e.state.titleName;
          $rootScope.constructorName = e.state.constructorsName;
          $rootScope.driverPoints = e.state.driverPoints;
          $rootScope.driverNation = e.state.driverNation;
          $rootScope.fullDriverName = e.state.fullName;
          $rootScope.driverNumber = e.state.driverNumber;
          $rootScope.dob = e.state.dateOfBirth;
          //$rootScope.$apply();
          }
        });

        return true;
    };

    //Create Race Winners Array and Data
    var setRaceWinners = function(raceStandings)
    {
      for(var i = 0; i < raceStandings.length; i++)
      {
        //Add Driver Information to array if they won a race this season
        if(raceStandings[i].wins > 0)
        {
        //Add information about array to be added to pie chart
        raceWinners.push({key : raceStandings[i].Driver.familyName , y : raceStandings[i].wins });
        raceWinnersFullInfo.push(raceStandings[i]);
        }
      }
        $rootScope.numberOfRaceWinners = raceStandings.length;
        //Pass array to pie chart to be displayed
        $rootScope.raceWinners = raceWinners;
    };

    //Set Standing Charts
    var setStandings = function(standings)
    {
      for(var j = 0; j < standings.length; j++)
      {
      //Set random colour for each driver in standings
      randomColour = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
      value = [standings[j].Driver.familyName, standings[j].points];
      raceDrivers.push(standings[j]);
      //create array for race standings chart
      raceData.push({key: standings[j].Driver.familyName, color: randomColour, values : [value]});
      }

      //Insert Data into bar chart
      $rootScope.raceData = raceData;
    };

    var setHistoryObject = function (title, driverInfo, URL){
      // Creates a new history entry
      window.history.pushState(driverInfo, title, URL);
    };


    initialize();

  var setDriverInfo = function (driverName) {
    //Get Data from external data
    var url = 'http://ergast.com/api/f1/drivers/'+driverName+'.json?callback=JSON_CALLBACK';

//Load JSON from url
 $http.jsonp(url).success(function(response, status, headers, config) {
            //console.log(response);
            obj = response;
        });

  };

  var returnRaceWinInfo = function()
  {
    return raceWinnersFullInfo;
  }

  var returnRaceStandings = function()
  {
    return raceDrivers;
  }

  //Runs code when user clicks on chart
  var runClickEvent = function(angularEvent, event){

  };

  var setOpenPanel = function (driverName){
    console.log("Driver Name ", driverName);
    console.log("Set Open Panel ", raceDrivers );

    //Get Data from external data
    var url = 'http://ergast.com/api/f1/current/driverStandings.json?callback=JSON_CALLBACK';

//Load JSON from url
 $http.jsonp(url)
        .success(function(response, status, headers, config) {
            console.log("Loaded Data");
            //Set race standings
            allRacers = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;


    for(var i = 0; i < raceDrivers.length ; i++)
    {
      if(allRacers[i].Driver.familyName == driverName[1])
      {
        $rootScope.constructorName = allRacers[i].Constructors[0].name;
        $rootScope.driverPoints = allRacers[i].points;
        $rootScope.driverNation = allRacers[i].Driver.nationality;
        $rootScope.fullDriverName = allRacers[i].Driver.givenName + " " + allRacers[i].Driver.familyName;
        $rootScope.titleName = allRacers[i].Driver.givenName + " " + allRacers[i].Driver.familyName;
        $rootScope.driverNumber = allRacers[i].Driver.permanentNumber;
        $rootScope.dob = allRacers[i].Driver.dateOfBirth;
      }
    }
        });
  };


  return {
      initialize: initialize,
      setHistoryObject: setHistoryObject,
      runClickEvent: runClickEvent,
      setDriverInfo: setDriverInfo,
      setOpenPanel: setOpenPanel,
      returnRaceWinInfo: returnRaceWinInfo,
      returnRaceStandings: returnRaceStandings,
      getData: function(driverName, successcb) {
              var url = 'http://ergast.com/api/f1/current/driverStandings.json?callback=JSON_CALLBACK';
          $http.jsonp(url).success(function(data, status, headers, config) {
              console.log(data);
              successcb(data);
          }).error(function(data, status, headers, config) {
              //  alert("Status is " + status);
          });
      }
  }


});
