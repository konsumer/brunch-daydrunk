angular.module('controllers').controller('LoginCtrl', function($scope, $http) {

    $scope.ok = function() {
        $http.post('/login', $scope.user)
            .success(function(data, status, headers, config) {
            document.location = "/";
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