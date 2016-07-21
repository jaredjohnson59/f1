describe('Testing AngularJS', function(){

    describe('Testing AngularJS Factory', function(){

      var values, factory, $httpBackend;

    beforeEach(module('f1'));

    beforeEach(inject(function(_$httpBackend_, _loadData_){
      factory = _loadData_;
      $httpBackend = _$httpBackend_;
    }));


    it('Check Factory initialized correctly', function()
    {
      var init = factory.initialize();
      expect(init).toBe(true);
    });


  });

});
