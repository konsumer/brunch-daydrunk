angular.module('controllers').controller('RegisterCtrl', function($scope, $http) {

    $scope.ok = function() {
        $http.post('/register', $scope.user)
            .success(function(data, status, headers, config) {
                $scope.success = 'Your account has been created.  Check your email to verifiy.';
            })
            .error(function(data, status, headers, config) {
                if (data && data.message) {
                    $scope.error = data.message;
                } else {
                    $scope.error = "an error (" + status + ") occurred."
                }
            });
    }

});