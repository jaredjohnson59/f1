App.controller('controller', ['$scope', '$http', '$location', '$route', 'loadData', '$rootScope',

function($scope,$http, $location, $route, loadData, $rootScope)
{
  //Show/hide Details Page based on the url
  $scope.autoScroll = $route.current.$$route.paramExample;

  $scope.locationString = $location.url();

    //Get driver name from url
    var driverName = $scope.locationString.match("/drivers/(.*).html");

    //Checks if url includes driver name
    if(driverName != null)
    {
    loadData.setOpenPanel(driverName);
    }


  //Runs code when user clicks on chart
  $scope.$on('elementClick.directive', function(angularEvent, event){

       //angularEvent.preventDefault();
       var familyName;
       var raceWinnersFullInfo = loadData.returnRaceWinInfo();
       var raceDrivers = loadData.returnRaceStandings();

         //Run if user is clicking on pie chart
         if(event.label != null)
         {
         //Set Driver Information
         for(var i = 0; i < raceWinnersFullInfo.length ; i++)
         {

           //Sets values for detail window
           if(raceWinnersFullInfo[i].Driver.familyName == event.label)
           {
             $scope.titleName = raceWinnersFullInfo[i].Driver.givenName + " " + raceWinnersFullInfo[i].Driver.familyName;
             $scope.constructorName = raceWinnersFullInfo[i].Constructors[0].name;
             $scope.driverPoints = raceWinnersFullInfo[i].points;
             $scope.driverNation = raceWinnersFullInfo[i].Driver.nationality;
             $scope.fullDriverName = raceWinnersFullInfo[i].Driver.givenName + " " + raceWinnersFullInfo[i].Driver.familyName;
             $scope.driverNumber = raceWinnersFullInfo[i].Driver.permanentNumber;
             $scope.dob = raceWinnersFullInfo[i].Driver.dateOfBirth;
             familyName = raceWinnersFullInfo[i].Driver.familyName;
           }
         }
       }
       else {
         for(var j = 0; j < raceDrivers.length; j++)
         {
           if(raceDrivers[j].Driver.familyName == event.point[0])
           {
             $scope.constructorName = raceDrivers[j].Constructors[0].name;
             $scope.driverPoints = raceDrivers[j].points;
             $scope.driverNation = raceDrivers[j].Driver.nationality;
             $scope.fullDriverName = raceDrivers[j].Driver.givenName + " " + raceDrivers[j].Driver.familyName;
             $scope.titleName = raceDrivers[j].Driver.givenName + " " + raceDrivers[j].Driver.familyName;
             $scope.driverNumber = raceDrivers[j].Driver.permanentNumber;
             $scope.dob = raceDrivers[j].Driver.dateOfBirth;
             familyName = raceDrivers[j].Driver.familyName;
           }
         }
       }

       //Create object to be add to the history API
       var stateObj = { titleName: $scope.titleName, constructorsName: $scope.constructorName, driverNation: $scope.driverNation,
       driverPoints: $scope.driverPoints, fullName: $scope.fullDriverName, dateOfBirth: $scope.dob, driverNumber: $scope.driverNumber};
       var title = $scope.fullDriverName;

       var URL = "/#/drivers/" + familyName + ".html";
       loadData.setHistoryObject(title, stateObj, URL);

      $scope.autoScroll = true;
       $scope.$apply();
  });



     $scope.width = 300;
         $scope.height = 300;
         $scope.xFunction = function() {
           return function(d) {
             return d.key;
           };
         }
         $scope.yFunction = function() {
           return function(d) {
             return d.y;
           };
         }
         $scope.descriptionFunction = function() {
           return function(d) {
             return d.key;
           }
         }
}]);
