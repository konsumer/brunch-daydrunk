/**
 * Display user & provide modals for login & register
 */

module.exports = function($scope, $modal, $http) {
    $http.get('/user')
        .success(function(data, status, headers, config) {
            $scope.user = data;
        });

    $scope.login = function($event) {
        $event.preventDefault();
        $modal.open({
            templateUrl: 'partials/userModal.html',
            controller: 'ModalLoginCtl'
        }).result.then(function(user) {
            console.log('header login', user);
            $scope.user = user;
        });
    }

    $scope.register = function($event) {
        $event.preventDefault();
        $modal.open({
            templateUrl: 'partials/userModal.html',
            controller: 'ModalRegisterCtl'
        }).result.then(function(user) {
            $scope.user = user;
        });
    }
};