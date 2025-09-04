#if UMB_13_OR_LESS
using Jumoo.TranslationManager.AI.Translators;

using Microsoft.AspNetCore.Mvc;

using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;

namespace Jumoo.TranslationManager.AI.Controllers;

[PluginController("translate")]
public class AIController : UmbracoAuthorizedApiController
{
    private readonly AITranslatorCollection _translatorCollection;

    public AIController(AITranslatorCollection translatorCollection)
    {
        _translatorCollection = translatorCollection;
    }

    [HttpGet]
    public bool GetApi() => true;

    [HttpGet]
    public IEnumerable<AITranslatorView> GetTranslators()
    {
        return _translatorCollection.Select(x => new AITranslatorView
        {
            Alias = x.Alias,
            Name = x.Name,
        });
    }

    [HttpGet]
    public AIConnectorDefaults GetDefaults()
        => new AIConnectorDefaults();
}
#endif