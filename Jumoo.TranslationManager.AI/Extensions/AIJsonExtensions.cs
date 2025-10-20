using Jumoo.TranslationManager.Core.Configuration;
using Org.BouncyCastle.Bcpg.Sig;


using Jumoo.Json;


namespace Jumoo.TranslationManager.AI.Extensions;

internal static class AIJsonExtensions
{

    public static string? AISerializeJsonString(this object? value, bool indent = true)

        => value.SerializeJsonString(indent);


    public static T? AIDeserializeJson<T>(this string? json)

        => json.DeserializeJson<T>();



}


public static class AIConfigServiceExtensions
{
    public static async Task<TResult> AIGetProviderSettingAsync<TResult>(this TranslationConfigService _config, string providerName, string settingName, TResult defaultValue)

        => await _config.GetProviderSettingAsync(providerName, settingName, defaultValue);

}