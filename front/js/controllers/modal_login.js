angular.module('controllers')
    .controller('ModalLoginCtrl', function($scope, $modalInstance, $http) {
        $scope.name = 'Login';

        $scope.ok = function() {
            $http.post('/login', $scope.user)
                .success(function(data, status, headers, config) {
                    $modalInstance.close($scope.user);
                })
                .error(function(data, status, headers, config) {
                    if (data && data.message) {
                        $scope.error = data.message;
                    } else {
                        $scope.error = "an error (" + status + ") occurred."
                    }
                });

        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });