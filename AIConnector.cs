
using Jumoo.TranslationManager.AI.Extensions;
using Jumoo.TranslationManager.AI.Models;
using Jumoo.TranslationManager.AI.Services;
using Jumoo.TranslationManager.Core.Models;
using Jumoo.TranslationManager.Core.Providers;

using Microsoft.Extensions.Logging;

using System.Diagnostics.CodeAnalysis;

using Umbraco.Cms.Core;

namespace Jumoo.TranslationManager.AI;

public class AIConnector : ITranslationProvider
{
    public static string ConnectorName = AIConstants.Connector.Name;
    public static string ConnectorAlias = AIConstants.Connector.Alias;
    public static string ConnectorVersion = typeof(AIConnector).Assembly.GetName()?.Version?.ToString(3) ?? "16.0.0";
    public static string ConnectorPluginPath = AIConstants.Connector.PluginPath;


    private readonly AIConfigService _configService;
    private readonly ILogger<AIConnector> _logger;
    private AIOptions _options;
    private readonly AITranslationService _translationService;

    public AIConnector(AIConfigService configService, ILogger<AIConnector> logger, AITranslationService translationService)
    {
        _configService = configService;
        _logger = logger;
        _translationService = translationService;

        Reload();
    }



    public string Name => ConnectorName;

    public string Alias => ConnectorAlias;

    public Guid Key => Guid.Parse("{3354D8C0-8294-48DA-9ED7-6DB6213703B6}");

    public TranslationProviderViews Views => new TranslationProviderViews()
    {
        Config = AIConstants.Views.Config,
        Pending = AIConstants.Views.Pending,
        Submitted = AIConstants.Views.Submitted,
        Approved = AIConstants.Views.Approved
    };

    public bool Active()
    {
        if (string.IsNullOrWhiteSpace(_options.Translator)) 
            return false;

        return _translationService.IsTranslatorValid(_options.Translator, _options);
    }

    [MemberNotNull(nameof(_options))]
    public void Reload()
    {
        _options = _configService.LoadOptions().Result;
    }

    public async Task<Attempt<TranslationJob?>> Submit(TranslationJob job)
    {
        if (!Active())
            throw new Exception("AI is not configured");

        try
        {
            var sourceLang = job.SourceCulture.DisplayName;
            var targetLang = job.TargetCulture.DisplayName;

            _logger.LogDebug("Submitting Translations via AI");

            var results = new AITranslationResult()
            {
                TranslatorUsed = _options.Translator
            };

            foreach (var node in job.Nodes)
            {
                _logger.LogDebug("Translating: {nodeId}", node.MasterNodeId);

                var nodeResult = await _translationService.TranslateNodeAsync(node, sourceLang, targetLang, _options);
                results.AppendResult(nodeResult);

            }
            job.Status = JobStatus.Received;
            job.ProviderStatus = $"Translated via {_options.Translator}";
            job.ProviderProperties = results.AISerializeJsonString() ?? "";


            return Attempt.Succeed(job);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Error submitting job via AI connector.");
            return Attempt<TranslationJob?>.Fail(job, exception);
        }
    }
    public IEnumerable<string> GetTargetLanguages(string sourceLanguage)
        => Enumerable.Empty<string>();

    public Task<Attempt<TranslationJob>> Cancel(TranslationJob job)
        => Task.FromResult(Attempt<TranslationJob>.Succeed(job));
    public bool CanTranslate(TranslationJob job) => true;

    public Task<Attempt<TranslationJob>> Check(TranslationJob job)
        => Task.FromResult(Attempt<TranslationJob>.Succeed(job));

    public Task<Attempt<TranslationJob>> Remove(TranslationJob job)
        => Task.FromResult(Attempt<TranslationJob>.Succeed(job));
}
