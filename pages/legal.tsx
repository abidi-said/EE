import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function LegalPage() {
  return (
    <>
      <Head>
        <title>Mentions Légales | Époxy & Étanchéité</title>
        <meta name="description" content="Politique de confidentialité et conditions de service d'Époxy & Étanchéité." />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="min-h-screen flex flex-col bg-white">
        <Header variant="inner" />
        <main className="flex-1 pt-32 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link href="/" className="inline-flex items-center text-gray-500 hover:text-navy-800 transition-colors mb-8">
              &larr; Retour à l&apos;accueil
            </Link>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10">Mentions Légales</h1>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Politique de Confidentialité</h2>
              <p className="text-gray-600 mb-4">
                Époxy &amp; Étanchéité (LaMaison.tn) s&apos;engage à protéger votre vie privée. 
                Cette politique explique comment nous traitons vos informations lorsque vous consultez notre site.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Collecte de données</h3>
              <p className="text-gray-600 mb-4">
                Notre site est un site vitrine purement informatif. Nous ne collectons <strong>aucune donnée personnelle</strong> vous concernant :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>Aucun formulaire de contact ou d&apos;inscription</li>
                <li>Aucun cookie de suivi ou de traçage</li>
                <li>Aucun outil d&apos;analyse (Google Analytics, etc.)</li>
                <li>Aucun service de remarketing ou publicitaire</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Cookies</h3>
              <p className="text-gray-600 mb-4">
                Ce site n&apos;utilise aucun cookie à quelque fin que ce soit. Aucune information n&apos;est stockée sur votre navigateur.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Partage de données</h3>
              <p className="text-gray-600 mb-4">
                Ne collectant aucune donnée, nous ne partageons, ne vendons et ne transférons aucune information personnelle à des tiers.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Hébergement</h3>
              <p className="text-gray-600 mb-4">
                Ce site est hébergé par les serveurs de notre fournisseur d&apos;hébergement. 
                Les données de connexion standard (adresse IP, type de navigateur, pages visitées) 
                peuvent être enregistrées par notre hébergeur à des fins techniques et de sécurité, 
                conformément à ses propres politiques de confidentialité.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conditions de Service</h2>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Utilisation du site</h3>
              <p className="text-gray-600 mb-4">
                Ce site est fourni à titre informatif uniquement. Les contenus présentés (textes, images, vidéos) 
                sont la propriété d&apos;Époxy &amp; Étanchéité (LaMaison.tn) et sont protégés par le droit d&apos;auteur. 
                Toute reproduction ou utilisation sans autorisation préalable est interdite.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Exactitude des informations</h3>
              <p className="text-gray-600 mb-4">
                Nous nous efforçons de maintenir les informations de ce site à jour et exactes. 
                Cependant, nous ne pouvons garantir l&apos;absence d&apos;erreurs ou d&apos;omissions. 
                Les descriptions de services sont fournies à titre indicatif et peuvent faire l&apos;objet de modifications.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Contact</h3>
              <p className="text-gray-600 mb-4">
                Pour toute question relative à ces mentions légales, vous pouvez nous contacter :
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Téléphone : +216 55 072 043 / +216 54 558 463</li>
                <li>Adresse : V672+GH RN8, rue Bizerte, Tunis 2000, Ariana, Tunisie</li>
              </ul>
            </section>

            <p className="text-sm text-gray-400 border-t pt-8">
              Dernière mise à jour : Juin 2026
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
