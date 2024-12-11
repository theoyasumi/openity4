/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://localhost:3000/', // Remplacez par l'URL de votre site
  generateRobotsTxt: true, // (optionnel) Générer un fichier robots.txt
  exclude: [
    '/dashboard', // Exclure le chemin /dashboard
    '/dashboard/*', // Exclure tous les sous-chemins de /dashboard
  ],
};