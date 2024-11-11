---
layout: documentation
sideNavigation: sidenav.hostplants
composition:
  - type: postHeader
  - type: pageMarkdown
lang-ref: hostplants
title: Host Plants of Gelechiidae (by moth species)
description: Based on Gaden S. Robinson; Phillip R. Ackery; Ian Kitching; George W Beccaloni; Luis M. Hernández (2023). HOSTS - a Database of the World's Lepidopteran Hostplants [Data set]. Natural History Museum. https://doi.org/10.5519/havt50xw
klass: narrow
background: ./assets/images/Aristotelia_hexcopa_ASUHIC0090317.jpg
imageLicense: |
  Photo by Sangmi Lee via [ASUHIC](https://www.gbif.org/occurrence/2542961803)
height: 70vh
toc: false
---

{% assign sortedLit = site.data.csv.Gelechiidae_HostPlants_06May2024-with-taxonKey-by-moth | sort: "Gelechiidae species name" %}
{% for item in sortedLit %}
{% for pair in item %}
{% assign key = pair[0] %}
{% assign val = pair[1] %}
{% if key == "Gelechiidae species name" %}
{% assign firstChar = val | slice: 0 %}
{% assign firstCharList = firstCharList | push: firstChar %}
{% assign firstCharList = firstCharList | uniq %}
{% endif %}
{% endfor %}
{% endfor %}

{% for char in firstCharList %}
{% if char <> empty %}

<div class="overflow-auto table is-narrow" markdown="block">
<table class="table is-narrow is-striped is-hoverable is-fullwidth">
<thead>
<tr>
<th class="has-text-centered" colspan="3" id="{{ char }}">{{ char }}</th>
</tr>
<tr>
<th class="has-text-centered">Gelechiidae Taxon</th>
<th>Host Plants</th>
<th>View Distribution Map</th>
</tr>
</thead>
<tbody>
{% for item in sortedLit %}
{% for pair in item %}
{% assign key = pair[0] %}
{% assign val = pair[1] %}
{% if key == "Gelechiidae species name" %}
{% assign firstChar = val | slice: 0 %}
{% if firstChar == char %}
<tr>
  <td><em>{{ item["Gelechiidae species name"] }}</em></td>
  <td>{{ item["Host Plants"] }}</td>
  {% if item["GBIF taxonKey"] != nil %}
  <td><a href="../hosts/?taxonKey={{ item['GBIF taxonKey'] }}" target="_blank">🔗</a></td>
  {% else %}
  <td>Not available</td>
  {% endif %}
</tr>
 {% endif %}
 {% endif %}
 {% endfor %}
 {% endfor %}
 </tbody>
 </table>
 </div>
 {% endif %}
 {% endfor %}
