# Jumoo.TranslationManager.AI

Connector for Translation Manager using AI

> This connector used the `Azure.AI.OpenAi` library so in theory we can also use the Azure OpenAi server (but at the moment we haven't wired up the endpoint code. Additionally, we have only actually connected OpenAi and GitHub AI to the connector currently.

# OpenAi Translations in Umbraco !

Sounds cool right ? well it probably is but there are a few things to be aware of if you are going to use the AI translation connector:

## 1. We are not AI Tuning experts.

We have provided some 'suggested' defaults for the variables and settings that are passed over to the chosen AI Api when items are translated - but we don't know if they are ideal, or if there are better options depending on your content.

All we know is that we've built the connector in a way where you can change these.

## 2. There is a cost to the AI APIs.

These costs are not ours, beyond our control etc. and you will have to have an account with the chosen AI provider and pay the bills etc.

## 3. Its slower than Machine translation APIs

In testing we have seen the AI translations take a lot longer then those from say Microsoft or Google Translation APIs.

There is some Thottling in the Connector so you can avoid hitting Usage limits, depending on your plan you can probibly turn this down, but it will still be slow compared to other machine translations.

## 4. AI Generated translations are not always the same.

Again during testing it would appear that AI based translations are much more likely to change per request when compared to other machine based translations, which are much more consistent.

## 5. Translations might not actually be that good

AI translations come from the general AI model, and while this in theory 'knows it all' it is not a translation specific model. Some of the specific machine translation tools might produce better results.

But, AI Translations !
