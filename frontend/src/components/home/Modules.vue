<template>
<div>
  <div v-if="!success" class="alert alert-warning m-0 mb-2 w-100">{{message}}</div>
  <!-- <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active">Data</li>
  </ol> -->
  <!-- TO DO -->
  <loading v-if="loading"></loading>
  <news-articles v-else :articles="articles"></news-articles>
</div>
</template>

<script>
import LoadingComponent from './../LoadingComponent'
import ErrorComponent from './../ErrorComponent'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import http from '../../helpers/http.js'

export default {
  name: 'Modules',
  components: {
    'news-articles' : () => ({
      component: import('./../modules/NewsArticles'),
      loading: LoadingComponent,
      error: ErrorComponent,
      delay: 10,
      timeout: 15000
    }),
    FontAwesomeIcon
  },
  props: ['mod'],
  data() {
    return {
      success: true,
      loading: true,
      message: 'An error occurred..',
      articles: [
        {
          source: { id: "google-news-fr", name: "Google News (France)" },
          author: null,
          title: "Corruption : Michel Platini blanchi par la justice suisse",
          description:
            "Suspendu quatre ans par la Fifa dans le cadre d'une affaire de corruption, Michel Platini a été, selon Le Monde, blanchi par la justice suisse au niveau pénal..",
          url:
            "https://www.lequipe.fr/Football/Actualites/Corruption-michel-platini-blanchi-par-la-justice-suisse/904618",
          urlToImage:
            "https://medias.lequipe.fr/img-photo-jpg/foto-ipp-massimo-rana-torino-06-05-2017-calcio-campionato-di-serie-a-2016-2017-juventus-torino-nella/1500000000950235/600:382,1804:1186-624-416-75/27d4d.jpg",
          publishedAt: "2018-05-25T20:19:35+00:00"
        },
        {
          source: { id: "google-news-fr", name: "Google News (France)" },
          author: null,
          title: "Revivez la démonstration du MHR face au LOU",
          description:
            "Au Parc OL, le LOU \"accueillait\" le leader de la saison régulière Montpellier pour la première demi-finale de Top 14. Le MHR n'a fait qu'une bouchée de son adversaire (40-14) et se qualifie pour la finale.",
          url:
            "https://www.lalsace.fr/actualite/2018/05/25/suivez-en-direct-la-demi-finale-lyon-montpellier",
          urlToImage:
            "https://cdn-s-www.lalsace.fr/images/53611994-94E2-4EB4-93D0-2E18F74652C9/COM_01/photo-1527281629.jpg",
          publishedAt: "2018-05-25T20:05:50+00:00"
        },
        {
          source: { id: "google-news-fr", name: "Google News (France)" },
          author: "Ouest-France avec AFP",
          title:
            "Ils droguent leurs voisins lors d’une soirée couscous pour les détrousser",
          description:
            "Les voleurs ont glissé un somnifère dans l’assiette de leurs voisins avant de dérober les cartes bancaires des victimes. Un couple et un jeune de 17 ans ont été mis en examen ce vendredi en Isère.",
          url:
            "https://www.ouest-france.fr/societe/drogue/ils-droguent-leurs-voisins-lors-d-une-soiree-couscous-pour-les-detrousser-5782145",
          urlToImage:
            "https://media.ouest-france.fr/v1/pictures/fa7fceb29418270ee39e399aa862323a-ils-droguent-leurs-voisins-lors-d-une-soiree-couscous-pour-les-detrousser.jpg?focuspoint=50,24&height=630&width=1200&cropresize=1&fill=0",
          publishedAt: "2018-05-25T18:42:28+00:00"
        },
        {
          source: { id: "google-news-fr", name: "Google News (France)" },
          author: "Arthur Berdah",
          title:
            "Manifestations : «Aucun désordre ne m'arrêtera, le calme reviendra», prévient Macron",
          description:
            "LE SCAN POLITIQUE - Interrogé par BFMTV en marge de sa visite en Russie, le président a répondu à «celles et ceux qui veulent bloquer le pays». «Écouter les gens ne veut pas dire être la girouette de l'opinion publique».",
          url:
            "http://www.lefigaro.fr/politique/le-scan/2018/05/25/25001-20180525ARTFIG00357-manifestations-aucun-desordre-ne-m-arretera-le-calme-reviendra-previent-macron.php",
          urlToImage:
            "http://i.f1g.fr/media/figaro/805x453_crop/2018/05/25/XVM2d1a2fe4-6041-11e8-a766-42a601762fc5.jpg",
          publishedAt: "2018-05-25T18:34:51+00:00"
        },
        {
          source: { id: "google-news-fr", name: "Google News (France)" },
          author: null,
          title: "Fillette de 3 ans noyée : l'ado de 14 ans écroué",
          description:
            "L’adolescent aurait poussé dans un ruisseau la petite Léa, 3 ans, lundi dernier à Mairieux.",
          url:
            "https://www.leprogres.fr/faits-divers/2018/05/25/fillette-de-trois-ans-noyee-l-ado-l-aurait-poussee",
          urlToImage:
            "https://cdn-s-www.leprogres.fr/images/B7223C55-5C07-41E1-AE76-5BA02B928A7C/FB1200/photo-1527226764.jpg",
          publishedAt: "2018-05-25T18:32:00+00:00"
        },
        {
          source: { id: "google-news-fr", name: "Google News (France)" },
          author: "Maurin Picard",
          title:
            "Après le scandale planétaire, Harvey Weinstein face à la justice",
          description:
            "Le producteur hollywoodien, dont la chute a déclenché le mouvement #metoo, s'est livré vendredi à la police de New York.",
          url:
            "http://www.lefigaro.fr/cinema/2018/05/25/03002-20180525ARTFIG00348-apres-le-scandale-planetaire-harvey-weinstein-face-a-la-justice.php",
          urlToImage:
            "http://i.f1g.fr/media/figaro/805x453_crop/2018/05/25/XVM5ffec7cc-6027-11e8-a07a-5c4593c42936.jpg",
          publishedAt: "2018-05-25T17:55:17+00:00"
        },
        {
          source: { id: "google-news-fr", name: "Google News (France)" },
          author: "Kim Hullot-Guiot",
          title: "Migrants: Hidalgo fait de la com et l'assume",
          description:
            "En visite pour la neuvième semaine consécutive au campement du Millénaire, dans le XIXe arrondissement de Paris, la maire de Paris a tenté de se positionner au-dessus de la mêlée, deux jours après un très sec communiqué du ministère de l'Intérieur.",
          url:
            "http://www.liberation.fr/france/2018/05/25/migrants-hidalgo-fait-de-la-com-et-l-assume_1654210",
          urlToImage:
            "http://md1.libe.com/photo/1125330-hidalgo-migrant.jpg?modified_at=1527269847&amp;picto=fb&amp;ratio_x=191&amp;ratio_y=100&amp;width=600",
          publishedAt: "2018-05-25T17:46:45+00:00"
        },
        {
          source: { id: "google-news-fr", name: "Google News (France)" },
          author: "Rachid Laïreche",
          title: "Mélenchon de retour dans les colonnes de «Libé»",
          description:
            "Après plus de cinq ans de silence dans «Libération», le leader de La France insoumise a accepté de nous recevoir pour développer ses idées, expliquer sa stratégie et ses attentes.",
          url:
            "http://www.liberation.fr/france/2018/05/25/melenchon-de-retour-dans-les-colonnes-de-libe_1654187",
          urlToImage:
            "http://md1.libe.com/photo/1125327-prodlibe-jean-luc-melenchon.jpg?modified_at=1527268824&amp;picto=fb&amp;ratio_x=191&amp;ratio_y=100&amp;width=600",
          publishedAt: "2018-05-25T17:22:00+00:00"
        },
        {
          source: { id: "google-news-fr", name: "Google News (France)" },
          author: "Ouest-France",
          title:
            "Météo. Des orages éclatent, quatre départements en vigilance orange",
          description:
            "Météo France a émis un bulletin d'alerte pour la soirée de ce vendredi. Il concerne l’Orne, la Seine-Maritime, l’Eure et l’Eure-et-Loir.",
          url:
            "https://www.ouest-france.fr/meteo/orage/meteo-alerte-aux-orages-quatre-departements-en-vigilance-orange-5781781",
          urlToImage:
            "https://media.ouest-france.fr/v1/pictures/2a2c445e4409533643fbb5f6f1827b42-meteo-alerte-aux-orages-en-normandie-quatre-departements-en-vigilance-orange.jpg?focuspoint=50,25&height=630&width=1200&cropresize=1&fill=0",
          publishedAt: "2018-05-25T16:11:41+00:00"
        },
        {
          source: { id: "google-news-fr", name: "Google News (France)" },
          author: null,
          title:
            "Ce que l'on sait des deux anciens agents secrets français soupçonnés de trahison",
          description: "",
          url:
            "https://www.francetvinfo.fr/economie/emploi/metiers/armee-et-securite/ce-que-l-on-sait-des-deux-anciens-agents-secrets-francais-soupconnes-de-trahison_2769595.html",
          urlToImage:
            "https://www.francetvinfo.fr/image/75iszkiz3-568a/1500/843/15097585.jpg",
          publishedAt: "2018-05-25T15:20:16+00:00"
        }
      ]
    }
  },
  methods: {
    fetchData() {
      if (!this.mod) {
        if (this.$route.query.id) {
          /**
           * --- NO PROPS >> GET THE MODULE VIA ID
           */
          http.get('modules/' + this.$route.query.id)
            .then(res => {
              console.log(res.data)
              
            })
        }
      } else {
        /**
         * --- PROPS >> GET THE ARTICLES DIRECTLY
         */
        // TODO
        console.log('via props')
        console.log(this.mod)
      }
    }
  },
  created() {
    this.fetchData()
  }
}
</script>