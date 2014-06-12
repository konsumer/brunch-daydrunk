/**
 * Display user & provide modals for login & register
 */

angular.module('controllers')
    .controller('HeaderCtl', function($scope, $modal, $http) {
        $http.get('/user')
            .success(function(data, status, headers, config) {
                $scope.user = data;
            });

        $scope.login = function() {
            $modal.open({
                templateUrl: 'partials/userModal.html',
                controller: 'ModalLoginCtrl'
            }).result.then(function(user) {
                console.log('header login', user);
                $scope.user = user;
            });
        }

        $scope.register = function() {
            $modal.open({
                templateUrl: 'partials/userModal.html',
                controller: 'ModalRegisterCtrl'
            }).result.then(function(user) {
                $scope.user = user;
            });
        }
    })