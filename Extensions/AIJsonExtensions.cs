using Jumoo.TranslationManager.Core.Configuration;
using Org.BouncyCastle.Bcpg.Sig;


#if UMB_16_OR_GREATER
using Jumoo.Json;
#else
using Newtonsoft.Json;
#endif

namespace Jumoo.TranslationManager.AI.Extensions;
internal static class AIJsonExtensions
{

    public static string? AISerializeJsonString(this object? value, bool indent = true)
#if UMB_16_OR_GREATER
        => value.SerializeJsonString(indent);
#else
        => JsonConvert.SerializeObject(value, indent ? Formatting.Indented : Formatting.None);
#endif

    public static T? AIDeserializeJson<T>(this string? json)
#if UMB_16_OR_GREATER
        => json.DeserializeJson<T>();
#else
        => json == null ? default : JsonConvert.DeserializeObject<T>(json);
#endif


}


public static class AIConfigServiceExtensions
{
    public static async Task<TResult> AIGetProviderSettingAsync<TResult>(this TranslationConfigService _config, string providerName, string settingName, TResult defaultValue)
#if UMB_16_OR_GREATER
        => await _config.GetProviderSettingAsync(providerName, settingName, defaultValue);
#else
        => await Task.FromResult(_config.GetProviderSetting(providerName, settingName, defaultValue));
#endif
}