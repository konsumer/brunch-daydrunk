module.exports = function($scope, $modalInstance, $http) {
    $scope.name = 'Login';
    $scope.user = {};
    $scope.origUser = {};

    $scope.ok = function() {
        $scope.origUser = {email:$scope.user.email, password:$scope.user.password};
        $http.post('/login', $scope.user)
            .success(function(data, status, headers, config) {
                $modalInstance.close($scope.user);
            })
            .error(function(data, status, headers, config) {
                if (data && data.message) {
                    $scope.error = data.message;
                } else {
                    if (status){
                        if (status==401){
                            $scope.error ="You are not authorized.";
                        }else{
                            $scope.error = "an error (" + status + ") occurred.";
                        }
                    }
                }
            });

    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
};