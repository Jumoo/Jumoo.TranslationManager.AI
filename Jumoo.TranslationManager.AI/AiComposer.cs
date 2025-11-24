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

using Microsoft.OpenApi;
using Microsoft.Extensions.Options;

using Jumoo.TranslationManager.Core.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

using Umbraco.Cms.Infrastructure.Manifest;



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

        // so we can swap services out. 
        builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();
        builder.Services.AddSingleton<IPackageManifestReader, PassthroughConnectorManifestReader>();

    }
}
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

        return Task.FromResult<IEnumerable<PackageManifest>>([manifest]);
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