# Jumoo.TranslationManager.AI.*

AI Based translators for Translation Manager for Umbraco.

This repo contains the AI Translator for Jumoo.TranslationManager. this replaces and enhances the OpenAI Translation provider in that it supports more AI Services and
gives you more control over all thoese AI parameters. 

## Jumoo.TranslationManager.Ai
The Core package - contains the main connector, and "Translators" for 
 - OpenAi
 - Github Reference Models
 - Azure Foundry AI Models
 - Ollama local AI Models.

**Works on v13 and v16 of Umbraco**

```
dotnet add package Jumoo.TranslationManager.Ai
```

## Jumoo.TranslationManager.AI.Gemini
Additonal translator for Gemini. 

_The gemeini translator only supports .net9 so will only work on Umbraco v16+ - this is why it's a seperate package_

```
dotnet add package Jumoo.TranslationManager.Ai.Gemnini
```

_Also requires the main Jumoo.TranslationManager.Ai package_


## Additional packages.
This connector abstracts away a lot of the plubming needed for an AI connector, so to impliment a new connector you now only need to impliment the `IAITranslator` interface
you can even inherit from the `AITranslatorBase` class.

If you're translator requires custom options, these can be managed with a small web-component view, you can see this for the gemini connector here : 
https://github.com/Jumoo/Jumoo.TranslationManager.AI/tree/master/Jumoo.TranslationManager.AI.Gemini/gemini-client



