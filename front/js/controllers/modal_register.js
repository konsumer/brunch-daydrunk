module.exports = function($scope, $modalInstance, $http) {
    $scope.name = 'Register';
    $scope.user = {};
    $scope.origUser = {};

    $scope.ok = function() {
        $scope.origUser = {email:$scope.user.email, password:$scope.user.password};
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