
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#if UMB_16_OR_GREATER
using Jumoo.Processing.Core.Communication;
#endif

namespace Jumoo.TranslationManager.AI.Services;

#if UMB_16_OR_GREATER
public class AIMessageService : IAIMessageService
{
    private readonly IClientMessageService _messageService;

    public AIMessageService(IClientMessageService messageService)
    {
        _messageService = messageService;
    }

    public async Task SendUpdateAsync(string title, string message, decimal progress, string clientId)
    {
        await _messageService.SendUpdateAsync(new ClientMessage
        {
            Title = title,
            Message = message,
            Progress = progress
        }, clientId);
    }
}
#else
public class AIMessageService : IAIMessageService
{
    public Task SendUpdateAsync(string title, string message, decimal progress, string clientId)
    {
        return Task.CompletedTask;
    }
}
#endif
