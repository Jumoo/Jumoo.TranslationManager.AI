(function () {
    'use strict';
    function SubmittedController($scope) {

        var pvm = this;


        if ($scope.vm.job !== undefined) {
            pvm.properties = angular.fromJson($scope.vm.job.providerProperties);
        }

    }

    angular.module('umbraco')
        .controller('translate.AiSubmittedController', SubmittedController);
})();