var siteTheme = gbifReactComponents.themeBuilder.extend({
  baseTheme: 'light',
  extendWith: {
    primary: themeStyle.colors.primary,
  },
});

var siteTheme = gbifReactComponents.themeBuilder.extend({
  baseTheme: 'light',
  extendWith: {
    primary: themeStyle.colors.primary,
    fontSize: '16px',
  },
});

var siteConfig = {
  routes: {
    occurrenceSearch: {
      // The route you are currently using for occurrence search. The language prefix will be added automatically
      // If you need special routes per language, then you have to add locale specific overwrites. The page language is available as a global variable called `pageLang`
      // route: '/data'
    },
  },
  occurrence: {
    mapSettings: {
      lat: 0,
      lng: 0,
      zoom: 1,
    },
    // You probably need help to configure the scope - so just ask
    // for his demo site we only show Fungi (taxonKey=5). It use the predicate structure known from GBIF download API.
    // See https://www.gbif.org/developer/occurrence (long page without enough anchors - search for "Occurrence Download Predicates")
    // The format is however slightly different, in that is use camelCase for keys instead of CONSTANT_CASE.
    // rootPredicate: { type: 'in', key: 'taxonKey', values: [10145633, 10538123] }, // Alticini and Galerucini tribes
    rootPredicate: {
      type: 'in',
      key: 'taxonKey',
      values: [
        10145633, 10538123, 1048568, 1047579, 1049048, 1047376, 1047935,
        1047649, 1047561, 1047860, 1049119, 1048168, 1048788, 1047399, 1049513,
        1049168, 1049050, 1048526, 1048170, 1048439, 9769677, 1048386, 1048519,
        1048145, 1048495, 1048403, 1047832, 1047297, 1048586, 1049388, 1048246,
        1049440, 1048297, 4990861, 1048343, 1047911, 1048980, 1049023, 1048361,
        1048421, 1049386, 1048401, 1049390, 1048876, 1049368, 1048155, 1048259,
        1048359, 1047601, 1049126, 1048813, 1049326, 1048966, 1047603, 1048374,
        1049001, 1049423, 1048330, 1048126, 1047441, 1049381, 1049212, 1048577,
        1048517, 1049311, 1047371, 1049015, 1047569, 1048559, 1048566, 1048927,
        1047295, 1047882, 1048444, 1049215, 4990600, 1047457, 1047945, 1049419,
        1048466, 1047564, 1048932, 1047886, 1047762, 1047754, 1047725, 1049114,
        7575253, 1048124, 1047608, 1048816, 1049074, 1047834, 1047448, 1047571,
      ],
    }, // Alticini and Galerucini tribes + all genera available in current COL Checklist
    occurrenceSearchTabs: ['MAP', 'TABLE', 'GALLERY', 'DATASETS'], // what tabs should be shown
    // see https://hp-theme.gbif-staging.org/data-exploration-config for more options
  },
};

// example of a language specific route overwrite
// if (pageLang === 'da')  {
//   siteConfig.routes.occurrenceSearch.route = '/observationer/sog';
// }
