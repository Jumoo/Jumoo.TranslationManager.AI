(function () {
    'use static';

    function AiService($http) {

        var serviceroot = Umbraco.Sys.ServerVariables.openAiTranslations.service;

        return {
            getTranslators: getTranslators,
        };

        /////

        function getTranslators() {
            return $http.get(serviceroot + 'GetTranslators');
        }
    }

    angular.module('umbraco')
        .factory('translationAiService', AiService);
})();
