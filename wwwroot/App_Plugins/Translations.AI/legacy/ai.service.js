(function () {
    'use static';

    function AiService($http) {

        var serviceroot = Umbraco.Sys.ServerVariables.openAiTranslations.service;

        return {
            getTranslators: getTranslators,
            getDefaults: getDefaults,
        };

        /////

        function getTranslators() {
            return $http.get(serviceroot + 'GetTranslators');
        }

        function getDefaults() {
            return $http.get(serviceroot + 'GetDefaults');
        }
    }

    angular.module('umbraco')
        .factory('translationAiService', AiService);
})();
