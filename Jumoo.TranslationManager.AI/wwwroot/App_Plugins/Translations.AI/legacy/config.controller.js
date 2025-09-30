(function () {

    'use strict';

    function configController($scope, translationAiService) {

        var pvm = this;
        pvm.changeTranslator = changeTranslator;


        pvm.$onInit = function () {

            loadServices();
            loadDefaults();

            $scope.$watch('vm.settings', function (newValue) {

                if (_.isEmpty(newValue)) { return; }
                prepSettings(newValue);
                changeTranslator();
            });

            $scope.$watch('vm.settings.prompt', function (prompt) {
                if (_.isEmpty(prompt)) { return; }

                pvm.samplePrompt =
                    prompt.replace('{sourceLang}', 'English')
                        .replace('{targetLang}', 'French')
                        .replace('{textType}', 'html')
                        .replace('{text}', 'Hello world, <strong>you rock</strong>');

            });
        }

        function loadServices() {
            translationAiService.getTranslators()
                .then(function (result) {
                    pvm.translators = result.data;
                });
        }

        function loadDefaults() {
            translationAiService.getDefaults()
                .then(function (result) {
                    pvm.defaults = result.data;

                    if ($scope.vm != undefined && $scope.vm.settings != undefined) {
                        prepSettings($scope.vm.settings);
                    }
                });
        }


        function changeTranslator() {
            if (!$scope.vm.settings?.translator) return;
            pvm.translatorView = `/App_Plugins/Translations.Ai/legacy/translator/${$scope.vm.settings.translator}.html`;
            console.log('change translator', pvm.translatorView);
        }


        function prepSettings(newValue) {

            if (newValue.translator === undefined) {
                newValue.translator = pvm.defaults.translator ?? 'OpenAiTranslator';
            }

            if (newValue.apiKey === undefined && newValue.key != undefined) {
                newValue.apiKey = newValue.key;
            }

            if (newValue.model === undefined) {
                newValue.model = pvm.defaults.model ?? 'gpt-4o';
            }

            if (newValue.throttle === undefined) {
                newValue.throttle = pvm.defaults.throttle ?? 0;
            }

            if (newValue.split === undefined) {
                newValue.split = pvm.defaults.split ?? false;
            }

            if (newValue.asHtml === undefined) {
                newValue.asHtml = pvm.defaults.asHtml ?? true;
            }

            if (newValue.maxTokens === undefined) {
                newValue.maxTokens = pvm.defaults.maxTokens == 0 ? pvm.defaults.maxTokens : 1024;
            }

            if (newValue.temperature === undefined) {
                newValue.temperature = pvm.defaults.temperature ?? 1;
            }

            if (newValue.frequencyPenalty === undefined) {
                newValue.frequencyPenalty = pvm.defaults.frequencyPenalty ?? 0.0;
            }

            if (newValue.presencePenalty === undefined) {
                newValue.presencePenalty = pvm.defaults.presencePenalty ?? 0.0;
            }

            if (newValue.nucleusSamplingFactor === undefined) {
                newValue.nucleusSamplingFactor = pvm.defaults.nucleusSamplingFactor ?? 1;
            }

            if (newValue.prompt === undefined || newValue.prompt.length == 0) {
                newValue.prompt =
                    pvm.defaults.prompt ?? `Translate this {sourceLang} text into {targetLang}\r\n\r\n{text} `;
            }

            if (newValue.additional === undefined) {
                newValue.additional = {
                    openAiModel: "gpt-4o",
                    ollamaModel: "llama3.1",
                    azureModel: "gpt-4o",
                    githubModel: "gpt-4o",
                    claudeAiModel: "claude-sonnet-4-0"
                }
            }

            changeTranslator();

        }

    }

    angular.module('umbraco')
        .controller('translate.AiConfigController', configController);

})();