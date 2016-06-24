var spark = angular.module("spark", [
    'ngRoute'
]);

spark.config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/', {
        templateUrl: 'views/overview.html', 
        controller: 'mainCtrl',
    });

    $routeProvider.when('/:page', {
        templateUrl: function (routeParams) {
            return 'views/' + routeParams.page + '.html';
        },
        controller: 'mainCtrl',
    });
    $routeProvider.when('/:sec/:page', {
        templateUrl: function (routeParams) {
            return 'views/'  + routeParams.sec + '/' + routeParams.page + '.html';
        },
        controller: 'mainCtrl',
    });
    $routeProvider.when('/:sec/:sub/:page', {
        templateUrl: function (routeParams) {
            return 'views/' + routeParams.sec + '/' + routeParams.sub + '/' + routeParams.page + '.html';
        },
        controller: 'mainCtrl',
    });
    $routeProvider.when('/:sec/:sub/:subsec/:page', {
        templateUrl: function (routeParams) {
            return 'views/' + routeParams.sec + '/' + routeParams.sub + '/' + routeParams.subsec + '/' + routeParams.page + '.html';
        },
        controller: 'mainCtrl',
    });
    $routeProvider.otherwise({
        redirectTo: function (skip, url) {
            console.log("Redirecting to ", url);
            window.location.href = url
        },
        controller: 'mainCtrl',
    });
});

spark.controller('mainCtrl', function ($scope, $route, $rootScope, $routeParams, $sce, $location) {

    angular.forEach($routeParams, function (value, key) {

        if (/^[-+]?[0-9]\d*(\.\d+)?$/.test(value)) {
            $rootScope[key] = parseFloat(value, 10);
        } else {
            $rootScope[key] = value;
        }
    });

    function myfunc($scope, $timeout) {

        $scope.phraseParts=[1,2,3,4,5,6];

        $timeout(function() {
            $("#phrasePart-2").focus();
        });
    }
    $scope.$on('$routeChangeSuccess', function (event, current, previous) {

        if (previous != undefined) {
            $('#exCollapsingNavbar').toggleClass('nav-off-screen')
        }

    });

});


spark.directive("maketext", function(){
  return {
      scope:{
          maketext:"="
      },
    link:function(scope, element, attrs, $timeout){
        element.text(element.html());
    }
  }
});

spark.directive("jumpmenu", function(){
  return {
      scope:{
          jumpmenu:"="
      },
    link:function(scope, element, attrs, $timeout){
        $('.nav-scroll .nav-link').click(function(event) {
            event.preventDefault();
            var target = $(this).attr('data-target');
            $(".ng-view").animate({
                scrollTop: $(target).offset().top - $(".ng-view").offset().top + $(".ng-view").scrollTop()
            }, 500);
        });
    }
  }
});

spark.directive('tooltip', function(){
    return {
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});

spark.directive('iframeSetDimensionsOnload', [function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            
            $(element).load(function() {
                // cached body element overrides when src loads
                // hence have to cache it again       
                var timeout = setTimeout(function(){
                    var $height = $(element).contents().find('body').height() + 'px';
                    $(element).css('height', $height)
                    
                    $scope.$apply();
                }, 50); 
            });

        }
    }
}])
