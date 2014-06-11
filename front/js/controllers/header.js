/**
 * Display user & provide modals for login & register
 */

angular.module('controllers')
    .controller('HeaderCtl', function($scope, $modal) {
        $scope.user = false;

        $scope.login = function() {
            $modal.open({
                templateUrl: 'views/userModal.html',
                controller: 'ModalLoginCtrl'
            }).result.then(function(user) {
                $scope.user = user;
            });
        }

        $scope.register = function() {
            $modal.open({
                templateUrl: 'views/userModal.html',
                controller: 'ModalRegisterCtrl'
            }).result.then(function(user) {
                $scope.user = user;
            });
        }
    })