
namespace Jumoo.TranslationManager.AI.Services;

public interface IAIMessageService
{
    Task SendUpdateAsync(string title, string message, decimal progress, string clientId);
}