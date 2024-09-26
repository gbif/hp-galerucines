---
layout: documentation
sideNavigation: sidenav.hostplants
composition:
  - type: postHeader
  - type: pageMarkdown
lang-ref: hostplants
title: Host Plants
description: Based on Gaden S. Robinson; Phillip R. Ackery; Ian Kitching; George W Beccaloni; Luis M. Hernández (2023). HOSTS - a Database of the World's Lepidopteran Hostplants [Data set]. Natural History Museum. https://doi.org/10.5519/havt50xw
klass: narrow
background: /assets/images/Aristotelia_hexcopa_ASUHIC0090317.jpg
imageLicense: |
  Photo by Sangmi Lee via [ASUHIC](https://www.gbif.org/occurrence/2542961803)
height: 70vh
toc: false
---

{% assign sortedLit = site.data.csv.Gelechiidae-Reference-August2023-Mod | sort: "Host full name" %}
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

<div class="overflow-auto table is-narrow" markdown="block">
<table class="table is-narrow is-striped is-hoverable is-fullwidth">
<thead>
<tr>
<th class="has-text-centered" colspan="4" id="{{ char }}">{{ char }}</th>
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
<td>{{ item["Host full name"] }}</td>
<td>{{ item.Rank }}</td>
<td>{{ item["COL status"] }}</td>
  {% if item["COL taxon page"] != nil %}
   <td><a href="{{ item['COL taxon page'] }}" target="_blank">{{ item["COL taxon page"] | strip }}</a></td>
  {% else %}
  <td>{{ item["COL taxon page"] | strip }}</td>
  {% endif %}
  <td>{{ item["Gelechiidae species name"] | strip }}</td>
 </tr>
 {% endif %}
 {% endif %}
 {% endfor %}
 {% endfor %}
 </tbody>
 </table>
 </div>
 {% endfor %}
