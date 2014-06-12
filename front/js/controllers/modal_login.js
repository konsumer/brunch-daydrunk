angular.module('controllers')
    .controller('ModalLoginCtrl', function($scope, $modalInstance, $http) {
        $scope.name = 'Login';
        $scope.user = {};

        $scope.ok = function() {
            console.log('login', $scope.user);
            
            $http.post('/login', $scope.user)
                .success(function(data, status, headers, config) {
                    $modalInstance.close($scope.user);
                })
                .error(function(data, status, headers, config) {
                    if (data && data.message) {
                        $scope.error = data.message;
                    } else {
                        if (status){
                            $scope.error = "an error (" + status + ") occurred.";
                        }
                    }
                });

        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });