namespace Jumoo.TranslationManager.AI.Translators;

public class RequiredAIOptionsAttribute : Attribute
{
    public RequiredAIOptionsAttribute(params string[] propertyNames)
    {
        PropertyNames = propertyNames;
    }
    public string[] PropertyNames { get; }
}

