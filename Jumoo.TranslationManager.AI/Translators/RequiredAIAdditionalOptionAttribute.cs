namespace Jumoo.TranslationManager.AI.Translators;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class RequiredAIAdditionalOptionAttribute : Attribute
{
    public RequiredAIAdditionalOptionAttribute(string propertyName)
    {
        PropertyName = propertyName;
    }
    public string PropertyName { get; }
}

