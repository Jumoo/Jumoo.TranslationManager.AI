using Jumoo.TranslationManager.AI.Services;
using Jumoo.TranslationManager.AI.Translators;
using Jumoo.TranslationManager.Core.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Manifest;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Infrastructure.Manifest;
using Umbraco.Extensions;

namespace Jumoo.TranslationManager.AI.Gemini;

internal class GeminiComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<IPackageManifestReader, PassthroughConnectorManifestReader>();
    }
}


internal class PassthroughConnectorManifestReader : IPackageManifestReader
{
    public Task<IEnumerable<PackageManifest>> ReadPackageManifestsAsync()
    {
        var manifest = new ConnectorPackageManifest
        {
            Name = AIConnector.ConnectorName + ".Gemini",
            Alias = AIConnector.ConnectorAlias + ".Gemini",
            Version = AIConnector.ConnectorVersion,
            EntryPointScript = WebPath.Combine("/App_Plugins/Translations.AI.Gemini", "AI.js")
        }.ToPackageManifest();

        return Task.FromResult(manifest.AsEnumerableOfOne());
    }
}