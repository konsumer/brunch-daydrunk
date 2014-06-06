angular.module('controllers')
    .controller('HeaderCtl', function($scope, $modal) {
        $scope.user = false;

        $scope.login = function() {
            $modal.open({
                templateUrl: 'views/userModal.html',
                controller: LoginCtrl
            }).result.then(function(user) {
                $scope.user = user;
            });
        }

        $scope.register = function() {
            $modal.open({
                templateUrl: 'views/userModal.html',
                controller: RegisterCtrl
            }).result.then(function(user) {
                $scope.user = user;
            });
        }
    })



var LoginCtrl = function($scope, $modalInstance, $http) {
    $scope.name = 'Login';

    $scope.ok = function() {
        $http.post('/login', $scope.user)
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

var RegisterCtrl = function($scope, $modalInstance, $http) {
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