export default function HelpPage() {
  const faqs = [
    {
      question: "Comment créer ma première campagne ?",
      answer:
        "Pour créer votre première campagne, rendez-vous dans la section 'Campagne Publicitaire' et cliquez sur le bouton 'Nouvelle Campagne'. Suivez ensuite les étapes du formulaire pour configurer votre campagne.",
    },
    {
      question: "Quels sont les formats publicitaires disponibles ?",
      answer:
        "Nous proposons plusieurs formats : bannières display (différentes tailles), publicités natives, et posts sponsorisés. Chaque format est optimisé pour différents emplacements et objectifs.",
    },
    {
      question: "Comment puis-je suivre les performances de mes campagnes ?",
      answer:
        "Dans la section 'Campagne Publicitaire', vous trouverez des tableaux de bord détaillés pour chaque campagne active. Vous pouvez suivre les impressions, clics, conversions et autres métriques importantes.",
    },
    {
      question: "Quel est le budget minimum pour une campagne ?",
      answer:
        "Le budget minimum par campagne est de 50€. Nous recommandons un budget minimum de 300€ pour obtenir des résultats significatifs sur une période de 30 jours.",
    },
    {
      question: "Comment puis-je optimiser mes campagnes ?",
      answer:
        "Nous fournissons des recommandations personnalisées basées sur les performances de vos campagnes. Vous pouvez également consulter nos guides d'optimisation dans le centre de ressources.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Comment ça marche ?</h1>
        <p className="text-muted-foreground">
          Trouvez rapidement des réponses à vos questions les plus fréquentes.
        </p>
      </div>

      <div className="grid gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 bg-card hover:bg-accent/50 transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center p-6 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Besoin d&apos;aide supplémentaire ?</h2>
        <p className="text-muted-foreground mb-4">
          Notre équipe de support est disponible pour vous aider.
        </p>
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
          Contacter le support
        </button>
      </div>
    </div>
  );
}