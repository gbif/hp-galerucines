---
layout: documentation
sideNavigation: sidenav.hostplants
composition:
  - type: postHeader
  - type: pageMarkdown
lang-ref: hostplants
title: Host Plants
description: Based on Gaden S. Robinson; Phillip R. Ackery; Ian Kitching; George W Beccaloni; Luis M. Hernández (2023). HOSTS - a Database of the World's Lepidopteran Hostplants [Data set]. Natural History Museum. https://doi.org/10.5519/havt50xw
klass: wide-table
background: ./assets/images/gernotkunz-inat.jpg
imageLicense: |
  Photo by Sangmi Lee via [ASUHIC](https://www.gbif.org/occurrence/2542961803)
height: 70vh
toc: false
---

{% assign sortedLit = site.data.csv.Gelechiidae_HostPlants_06May2024-with-taxonKey | sort: "Host full name" %}
{% for item in sortedLit %}
{% for pair in item %}
{% assign key = pair[0] %}
{% assign val = pair[1] %}
{% if key == "Host full name" %}
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
<th class="has-text-centered" colspan="5" id="{{ char }}">{{ char }}</th>
</tr>
<tr>
<th class="has-text-centered">Host Plant Full Name</th>
<th>Rank</th>
<th>COL status</th>
<th>COL taxon page</th>
<th>Gelechiidae Species</th>
</tr>
</thead>
<tbody>
{% for item in sortedLit %}
{% for pair in item %}
{% assign key = pair[0] %}
{% assign val = pair[1] %}
{% if key == "Host full name" %}
{% assign firstChar = val | slice: 0 %}
{% if firstChar == char %}
<tr>
  <td><em>{{ item["Host full name"] }}</em></td>
  <td>{{ item.Rank }}</td>
  <td>{{ item["COL status"] }}</td>
  {% if item["COL taxon page"] != nil %}
  <td><a href="{{ item['COL taxon page'] }}" target="_blank">🔗</a></td>
  {% else %}
  <td>Not found</td>
  {% endif %}
  {% if item["Gelechiidae species name"] contains ";" %}
    {% assign speciesList = item["Gelechiidae species name"] | split: ";" %}
    <td>
    {% for species in speciesList %}
      {% assign speciesArray = species | strip | split: " " %}
      {% assign authorName = speciesArray | last %}
      {% assign speciesName = species | remove: authorName %}
      <em>{{ speciesName }}</em> {{ authorName }}{% if forloop.last == false %}; {% endif %}
    {% endfor %}
    </td>
  {% else %}
    {% assign speciesArray = item["Gelechiidae species name"] | strip | split: " " %}
    {% assign authorName = speciesArray | last %}
    {% assign speciesName = item["Gelechiidae species name"] | remove: authorName %}
    <td><em>{{ speciesName }}</em> {{ authorName }}</td>
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
