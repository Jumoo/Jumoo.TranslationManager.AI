using Jumoo.TranslationManager.AI.Controllers;
using Jumoo.TranslationManager.AI.Services;
using Jumoo.TranslationManager.AI.Translators;
using Jumoo.TranslationManager.Core.Boot;

using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Manifest;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Routing;
using Umbraco.Extensions;

#if UMB_16_OR_GREATER
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Options;

using Jumoo.TranslationManager.Core.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

using Umbraco.Cms.Infrastructure.Manifest;
#endif


namespace Jumoo.TranslationManager.AI;

/// <summary>
///  we need to boot this before the core loads the controllers. 
/// </summary>
[ComposeBefore(typeof(TranslationComposer))]
internal class AIComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<AIConfigService>();
        builder.WithCollectionBuilder<AITranslatorCollectionBuilder>()
                .Add(builder.TypeLoader.GetTypes<IAITranslator>());

        builder.Services.AddSingleton<AIMemoryService>();
        builder.Services.AddSingleton<AIMessageService>();

        builder.Services.AddSingleton<AITranslationService>();

#if UMB_16_OR_GREATER
        // so we can swap services out. 
        builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();
        builder.Services.AddSingleton<IPackageManifestReader, PassthroughConnectorManifestReader>();
#else 
        if (!builder.ManifestFilters().Has<AiConnectorManifestFilter>())
            builder.ManifestFilters().Append<AiConnectorManifestFilter>();

        builder.AddNotificationHandler<ServerVariablesParsingNotification, AiServerVariablesParserHandler>();

#endif
    }
}

#if UMB_16_OR_GREATER

internal class PassthroughConnectorManifestReader : IPackageManifestReader
{
    public Task<IEnumerable<PackageManifest>> ReadPackageManifestsAsync()
    {
        var manifest = new ConnectorPackageManifest
        {
            Name = AIConnector.ConnectorName,
            Alias = AIConnector.ConnectorAlias,
            Version = AIConnector.ConnectorVersion,
            EntryPointScript = WebPath.Combine(AIConnector.ConnectorPluginPath, "AI.js")
        }.ToPackageManifest();


        manifest.Importmap = new PackageManifestImportmap
        {
            Imports = new Dictionary<string, string>
            {
                {  "@jumoo/translate-ai", WebPath.Combine(AIConnector.ConnectorPluginPath, "AI.js") }
            }
        };

        return Task.FromResult(manifest.AsEnumerableOfOne());
    }
}

internal class ConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
{
    public void Configure(SwaggerGenOptions options)
    {
        options.SwaggerDoc(
            "tm-ai",
            new OpenApiInfo
            {
                Title = "AI Translation API",
                Version = "Latest",
                Description = "it's AI methods"
            });

        // sets the operation Ids to be the same as the action
        // so it loses all the v1... bits to the names.
        options.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");

    }
}
#else 
internal class AiConnectorManifestFilter : IManifestFilter
{
    public void Filter(List<PackageManifest> manifests)
    {
        if (manifests.Any(x => x.PackageName == AIConnector.ConnectorName))
            return;

        manifests.Add(new PackageManifest
        {
            PackageName = AIConnector.ConnectorName,
            AllowPackageTelemetry = true,
            Version = AIConnector.ConnectorVersion,
            Scripts = new[]
            {
                WebPath.Combine(AIConnector.ConnectorPluginPath, "config.controller.js"),
                WebPath.Combine(AIConnector.ConnectorPluginPath, "ai.service.js"),
                WebPath.Combine(AIConnector.ConnectorPluginPath, "submitted.controller.js")
            }
        });
    }
}

public class AiServerVariablesParserHandler :
    INotificationHandler<ServerVariablesParsingNotification>
{
    private readonly LinkGenerator _linkGenerator;

    public AiServerVariablesParserHandler(LinkGenerator linkGenerator)
    {
        _linkGenerator = linkGenerator;
    }

    public void Handle(ServerVariablesParsingNotification notification)
    {
        notification.ServerVariables.Add("openAiTranslations", new Dictionary<string, object>
        {
            { "service", _linkGenerator.GetUmbracoApiServiceBaseUrl<AIController>(x => x.GetApi()) ?? string.Empty }
        });
    }
}
#endif