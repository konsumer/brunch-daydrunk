angular.module('controllers')
    .controller('ModalRegisterCtrl', function($scope, $modalInstance, $http) {
        $scope.name = 'Register';

        $scope.ok = function() {
            $http.post('/register', $scope.user)
                .success(function(data, status, headers, config) {
                    $modalInstance.close($scope.user);
                })
                .error(function(data, status, headers, config) {
                    $scope.error = data.message;
                });

        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });