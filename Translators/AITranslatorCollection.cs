using Umbraco.Cms.Core.Composing;

namespace Jumoo.TranslationManager.AI.Translators;

public class AITranslatorCollectionBuilder
    : WeightedCollectionBuilderBase<AITranslatorCollectionBuilder, AITranslatorCollection, IAITranslator>
{
    protected override AITranslatorCollectionBuilder This => this;
}

public class AITranslatorCollection
    : BuilderCollectionBase<IAITranslator>
{
    public AITranslatorCollection(Func<IEnumerable<IAITranslator>> items)
        : base(items)
    { }

    public IAITranslator? GetTranslator(string alias)
        => this.FirstOrDefault(x => x.Alias == alias);
}