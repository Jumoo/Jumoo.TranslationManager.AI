
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Jumoo.Processing.Core.Communication;

namespace Jumoo.TranslationManager.AI.Services;

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