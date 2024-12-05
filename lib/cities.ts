export const cities = {
  bordeaux: {
    name: "Bordeaux",
    image: "https://images.unsplash.com/photo-1589028699382-19d2669ddced?q=80&w=2070&auto=format&fit=crop",
    description: "Trouvez un serrurier professionnel à Bordeaux",
    count: "80+ serruriers",
    nearbyAreas: [
      { name: "Mérignac", link: "/ville/merignac" },
      { name: "Pessac", link: "/ville/pessac" },
      { name: "Talence", link: "/ville/talence" },
      { name: "Bègles", link: "/ville/begles" }
    ],
    content: {
      intro: "Bordeaux, ville dynamique de plus de 250 000 habitants, nécessite un réseau de serruriers professionnels disponibles 24h/24 pour répondre aux besoins de sécurité de ses résidents et entreprises.",
      services: [
        "Ouverture de porte en urgence",
        "Installation et remplacement de serrures",
        "Blindage et sécurisation",
        "Dépannage de serrures électroniques",
        "Installation de systèmes de contrôle d'accès"
      ],
      prices: [
        { service: "Ouverture de porte", price: "à partir de 89€", details: "En journée, hors week-end" },
        { service: "Remplacement serrure", price: "à partir de 149€", details: "Serrure standard" },
        { service: "Blindage de porte", price: "à partir de 890€", details: "Installation complète" }
      ],
      testimonial: {
        text: "Service rapide et professionnel. Le serrurier est intervenu en moins de 20 minutes pour une ouverture de porte, avec un travail propre et soigné.",
        author: "Marie L., Bordeaux Centre"
      }
    }
  },
  merignac: {
    name: "Mérignac",
    image: "https://images.unsplash.com/photo-1589028699382-19d2669ddced?q=80&w=2070&auto=format&fit=crop",
    description: "Trouvez un serrurier professionnel à Mérignac",
    count: "25+ serruriers",
    nearbyAreas: [
      { name: "Bordeaux", link: "/ville/bordeaux" },
      { name: "Pessac", link: "/ville/pessac" },
      { name: "Eysines", link: "/ville/eysines" }
    ],
    content: {
      intro: "Mérignac, deuxième ville de Gironde avec plus de 70 000 habitants, dispose d'un réseau de serruriers qualifiés pour assurer la sécurité de ses résidents.",
      services: [
        "Ouverture de porte en urgence",
        "Installation et remplacement de serrures",
        "Sécurisation de locaux commerciaux",
        "Dépannage de serrures électroniques",
        "Installation de systèmes de contrôle d'accès"
      ],
      prices: [
        { service: "Ouverture de porte", price: "à partir de 85€", details: "En journée, hors week-end" },
        { service: "Remplacement serrure", price: "à partir de 145€", details: "Serrure standard" },
        { service: "Blindage de porte", price: "à partir de 850€", details: "Installation complète" }
      ],
      testimonial: {
        text: "Intervention rapide et efficace pour une ouverture de porte. Serrurier très professionnel et prix raisonnable.",
        author: "Laurent D., Mérignac Centre"
      }
    }
  },
  pessac: {
    name: "Pessac",
    image: "https://images.unsplash.com/photo-1589028699382-19d2669ddced?q=80&w=2070&auto=format&fit=crop",
    description: "Trouvez un serrurier professionnel à Pessac",
    count: "20+ serruriers",
    nearbyAreas: [
      { name: "Bordeaux", link: "/ville/bordeaux" },
      { name: "Mérignac", link: "/ville/merignac" },
      { name: "Talence", link: "/ville/talence" }
    ],
    content: {
      intro: "Pessac, ville dynamique de la métropole bordelaise avec plus de 60 000 habitants, bénéficie d'un réseau de serruriers professionnels disponibles pour tous types d'interventions.",
      services: [
        "Dépannage d'urgence",
        "Installation de serrures",
        "Blindage de porte",
        "Sécurisation de maison",
        "Reproduction de clés"
      ],
      prices: [
        { service: "Ouverture de porte", price: "à partir de 85€", details: "En journée, hors week-end" },
        { service: "Remplacement serrure", price: "à partir de 145€", details: "Serrure standard" },
        { service: "Blindage de porte", price: "à partir de 850€", details: "Installation complète" }
      ],
      testimonial: {
        text: "Excellent service, intervention rapide et propre. Je recommande vivement ce professionnel.",
        author: "Sophie M., Pessac Centre"
      }
    }
  },
  talence: {
    name: "Talence",
    image: "https://images.unsplash.com/photo-1589028699382-19d2669ddced?q=80&w=2070&auto=format&fit=crop",
    description: "Trouvez un serrurier professionnel à Talence",
    count: "15+ serruriers",
    nearbyAreas: [
      { name: "Bordeaux", link: "/ville/bordeaux" },
      { name: "Pessac", link: "/ville/pessac" },
      { name: "Bègles", link: "/ville/begles" }
    ],
    content: {
      intro: "Talence, ville universitaire de la métropole bordelaise comptant plus de 40 000 habitants, dispose d'un réseau de serruriers qualifiés pour répondre à tous vos besoins.",
      services: [
        "Ouverture de porte",
        "Installation de serrures",
        "Sécurisation d'appartement",
        "Dépannage urgent",
        "Changement de cylindre"
      ],
      prices: [
        { service: "Ouverture de porte", price: "à partir de 85€", details: "En journée, hors week-end" },
        { service: "Remplacement serrure", price: "à partir de 145€", details: "Serrure standard" },
        { service: "Blindage de porte", price: "à partir de 850€", details: "Installation complète" }
      ],
      testimonial: {
        text: "Service impeccable et rapide. Le serrurier a été très professionnel et a résolu mon problème rapidement.",
        author: "Julie B., Talence"
      }
    }
  },
  begles: {
    name: "Bègles",
    image: "https://images.unsplash.com/photo-1589028699382-19d2669ddced?q=80&w=2070&auto=format&fit=crop",
    description: "Trouvez un serrurier professionnel à Bègles",
    count: "15+ serruriers",
    nearbyAreas: [
      { name: "Bordeaux", link: "/ville/bordeaux" },
      { name: "Talence", link: "/ville/talence" },
      { name: "Villenave-d'Ornon", link: "/ville/villenave-dornon" }
    ],
    content: {
      intro: "Bègles, commune de la métropole bordelaise avec plus de 25 000 habitants, bénéficie d'un réseau de serruriers professionnels pour assurer la sécurité de ses habitants.",
      services: [
        "Dépannage urgent",
        "Installation de serrures",
        "Sécurisation de maison",
        "Ouverture de porte",
        "Remplacement de cylindre"
      ],
      prices: [
        { service: "Ouverture de porte", price: "à partir de 85€", details: "En journée, hors week-end" },
        { service: "Remplacement serrure", price: "à partir de 145€", details: "Serrure standard" },
        { service: "Blindage de porte", price: "à partir de 850€", details: "Installation complète" }
      ],
      testimonial: {
        text: "Très satisfait du service. Intervention rapide et prix raisonnable.",
        author: "Pierre L., Bègles"
      }
    }
  },
  paris: {
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    description: "Trouvez un serrurier professionnel à Paris",
    count: "250+ serruriers",
    nearbyAreas: [
      { name: "Boulogne-Billancourt", link: "/ville/boulogne-billancourt" },
      { name: "Saint-Denis", link: "/ville/saint-denis" },
      { name: "Montreuil", link: "/ville/montreuil" },
      { name: "Levallois-Perret", link: "/ville/levallois-perret" }
    ],
    content: {
      intro: "Paris, avec ses 20 arrondissements et plus de 2 millions d'habitants, dispose d'un vaste réseau de serruriers qualifiés pour assurer la sécurité des Parisiens 24h/24 et 7j/7.",
      services: [
        "Intervention d'urgence",
        "Installation de serrures haute sécurité",
        "Blindage de porte",
        "Sécurisation d'appartement",
        "Maintenance de portes automatiques"
      ],
      prices: [
        { service: "Ouverture de porte", price: "à partir de 99€", details: "En journée, hors week-end" },
        { service: "Remplacement serrure", price: "à partir de 169€", details: "Serrure standard" },
        { service: "Blindage de porte", price: "à partir de 990€", details: "Installation complète" }
      ],
      testimonial: {
        text: "Excellent service, intervention rapide en pleine nuit pour une serrure bloquée. Prix raisonnable et travail impeccable.",
        author: "Thomas M., Paris 15ème"
      }
    }
  },
  lyon: {
    name: "Lyon",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=2069&auto=format&fit=crop",
    description: "Trouvez un serrurier professionnel à Lyon",
    count: "120+ serruriers",
    nearbyAreas: [
      { name: "Villeurbanne", link: "/ville/villeurbanne" },
      { name: "Vénissieux", link: "/ville/venissieux" },
      { name: "Bron", link: "/ville/bron" },
      { name: "Caluire-et-Cuire", link: "/ville/caluire-et-cuire" }
    ],
    content: {
      intro: "Lyon, troisième ville de France avec près de 500 000 habitants, bénéficie d'un réseau complet de serruriers professionnels pour assurer la sécurité de ses résidents et commerces.",
      services: [
        "Dépannage d'urgence",
        "Installation de serrures connectées",
        "Sécurisation de locaux commerciaux",
        "Reproduction de clés de sécurité",
        "Installation de portes blindées"
      ],
      prices: [
        { service: "Ouverture de porte", price: "à partir de 95€", details: "En journée, hors week-end" },
        { service: "Remplacement serrure", price: "à partir de 159€", details: "Serrure standard" },
        { service: "Blindage de porte", price: "à partir de 940€", details: "Installation complète" }
      ],
      testimonial: {
        text: "Intervention rapide et efficace pour une ouverture de porte. Le serrurier a été très professionnel et a pris le temps d'expliquer les options disponibles.",
        author: "Pierre D., Lyon 6ème"
      }
    }
  }
} as const;