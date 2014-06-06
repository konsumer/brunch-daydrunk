angular.module('controllers')
    .controller('HeaderCtl', function($scope, $modal) {
        $scope.user = false;

        $scope.login = function() {
            $modal.open({
                templateUrl: 'views/userModal.html',
                controller: ModalLoginCtrl
            }).result.then(function(user) {
                $scope.user = user;
            });
        }

        $scope.register = function() {
            $modal.open({
                templateUrl: 'views/userModal.html',
                controller: ModalRegisterCtrl
            }).result.then(function(user) {
                $scope.user = user;
            });
        }
    })



var ModalLoginCtrl = function($scope, $modalInstance, $http) {
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
};

var ModalRegisterCtrl = function($scope, $modalInstance, $http) {
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
};