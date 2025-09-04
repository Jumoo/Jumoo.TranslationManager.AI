# Jumoo.TranslationManager.AI

AI-powered translation connector for Jumoo Translation Manager in Umbraco CMS.

## Overview

This package provides AI-powered translation capabilities as an extension to the Jumoo Translation Manager for Umbraco. It enables automatic content translation using various AI services including OpenAI, Azure OpenAI, and GitHub AI models.

## Features

- **Multiple AI Providers**: Support for OpenAI, Azure OpenAI, and GitHub AI Inference models
- **Automatic Translation**: Seamless integration with Translation Manager workflow
- **Memory Management**: Built-in AI memory service for managing translation context
- **Token Usage Tracking**: Monitor AI service usage with detailed token consumption metrics
- **Configurable Options**: Customizable AI parameters (temperature, max tokens, frequency penalty, etc.)
- **Backoffice Integration**: Native Umbraco backoffice UI for configuration and management

## Supported AI Services

### OpenAI Translator
- Direct integration with OpenAI's GPT models
- Configurable model selection
- API key authentication

### Azure OpenAI Translator  
- Integration with Azure OpenAI services
- Support for Azure Foundry endpoints
- Secure API key and endpoint configuration

### GitHub AI Translator
- GitHub AI Inference model support
- Access to GitHub's AI model marketplace
- Token-based authentication

## Installation

Install via NuGet Package Manager:

```
Install-Package Jumoo.TranslationManager.AI
```

Or via .NET CLI:

```
dotnet add package Jumoo.TranslationManager.AI
```

## Requirements

- Umbraco CMS 13.x or 16.x
- Jumoo Translation Manager Core package
- .NET 8.0 or .NET 9.0
- Valid API keys for chosen AI service(s)

## Configuration

1. Install the package in your Umbraco solution
2. Navigate to Translation Manager in the Umbraco backoffice
3. Configure your preferred AI translator with:
   - API keys for your chosen service
   - Model preferences
   - Translation parameters (temperature, max tokens, etc.)
   - Custom prompts and instructions

## Usage

1. Create translation jobs through Translation Manager
2. Select AI Connector as your translation provider
3. Submit jobs for automatic AI translation
4. Review and approve translated content
5. Monitor token usage and translation metrics

## Development

### Project Structure

- **Controllers**: API endpoints for AI translation management
- **Services**: Core translation and configuration services  
- **Translators**: Individual AI service implementations
- **Models**: Data models for translation results and configuration
- **Frontend**: TypeScript/Lit components for backoffice UI

### Building

```bash
dotnet build
```

### Frontend Development

```bash
cd ai-client
npm install
npm run build
```

## License

Custom License - Copyright Jumoo 2025

## Links

- [GitHub Repository](https://github.com/Jumoo/Jumoo.TranslationManager.AI)
- [Umbraco Marketplace](https://marketplace.umbraco.com/)
- [Jumoo Website](https://jumoo.co.uk)

## Support

For support and documentation, visit the GitHub repository or contact Jumoo at info@jumoo.co.uk