describe('Testing AngularJS', function(){

    describe('Testing AngularJS Controller', function(){

      var scope = {};
      var ctrl;

    beforeEach(module('f1'));
    beforeEach(inject(function($controller, $location, $route){
      ctrl = $controller('controller', {$scope:scope});
    }));


    it('Panel visible should be false', function()
    {
    //  $route.current.$$route.paramExample = false;
      expect(scope.autoScroll).toBeDefined();
      expect(scope.autoScroll).toBe(true);
    });


  });

});
