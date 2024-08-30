---
klass: insect-hosts-map
title: Hosts
description: We publish open data
layout: compose
composition:
  - type: pageMarkdown
---

Let's grab the host plant names available from Sangmi's list (https://gelechiidae.hp.gbif-staging.org/taxonomy/hostplants/) for gelechiid species <emph>Helcystogramma hibisci</emph> Stainton.

The spreadsheet we're using as a source is this one: `https://raw.githubusercontent.com/gbif/hp-gelechiidae/master/_data/csv/Gelechiidae_HostPlants_06May2024.csv`.

The url needs to contain the taxonKey like so:

```
http://127.0.0.1:4000/hosts/?taxonKey=1851462
```

<article id="insect-hosts-info"></article>
<div class="container" id="insect-hosts-map"></div>

<script>
  const datasetTemplate = dataset => `
  <h1>
    Host plants for <i>${dataset.canonicalName}</i> (${dataset.bracketAuthorship}, ${dataset.bracketYear})
  </h1>
  <p>TaxonKey=${datasetKey}</p>
  <ul id="host-plants-list">
  ${dataset.hostPlantsArray ? dataset.hostPlantsArray.map(plant => `<li>${plant}</li>`).join('') : ''}
  </ul>
`;
</script>

<script src="/assets/leaflet.js"></script>
<script src="/assets/hosts.js"></script>

    <!-- ${dataset.hostPlants.map(plant => `<li>${plant}</li>`).join('')} -->
