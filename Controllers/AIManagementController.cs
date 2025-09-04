#if UMB_16_OR_GREATER
using Jumoo.TranslationManager.AI.Translators;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Asp.Versioning;
using Umbraco.Cms.Api.Common.Attributes;

using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;

namespace Jumoo.TranslationManager.AI.Controllers
{
    [ApiController]
    [BackOfficeRoute("tm-ai/api/v{version:apiVersion}")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    [MapToApi("tm-ai")]
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "AITranslate")]
    public class AIManagementController:ControllerBase
    {
        private readonly AITranslatorCollection _translatorCollection;

        public AIManagementController(AITranslatorCollection translatorCollection)
        {
            _translatorCollection = translatorCollection;
        }

        [HttpGet("Translators")]
        [ProducesResponseType<AITranslatorView[]>(StatusCodes.Status200OK)]
        public IActionResult GetTranslators()
        {
            return Ok(_translatorCollection.Select(x => new AITranslatorView
            {
                Alias = x.Alias,
                Name = x.Name,
            }));
        }

        [HttpGet("Defaults")]
        [ProducesResponseType<AIConnectorDefaults>(StatusCodes.Status200OK)]
        public IActionResult GetDefaults()
            => Ok(new AIConnectorDefaults());
    }
}
#endif
