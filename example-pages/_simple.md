---
layout: post # try to remoce this line (add # in the beginning of the line to make it a comment) - then the layout will change, but the content remain the same
title: Simple page
description: This page is using a simple predefined layout with an image, a title and some body text
background: /assets/images/moss.jpg
imageLicense: |
  Photo by mhoefft via [gbif.org](https://www.gbif.org/occurrence/1580487687)
height: 70vh
---

## Procris quippe mentior urbes ubi

Lorem markdownum spatium limes indefessus neque _at_ orat aestuat, quicquam ne
flavusque omnibus, virginis socerque sparsos vidimus eundem. Sustinet **ramo
pontum ut** avus quamquam de trabes vestemque cruorem tremor.

Viscera mercibus isdem hebetarat undas! Iubet ora ire unum telis adicit, si
Telephus _valent_, instructo refers. Ille **est resque**, sic ruris erit ante
profana detegeret. Et cogor tractus arboribus prensurum praesens memorantur
neque inplet iussus temeraria merui **fas ecce** aethera dixit fieretque [plura
tollebat altius](http://virgineusque.net/est.html).

<div class="overflow-auto table is-narrow is-fullwidth is-hoverable" markdown="block">
  <table>
  {% assign sortedTribes = site.data.csv.20230726_ITIS-Galerucini-Alticini-genera-valid-ab-sorted | sort: "tribe" %}
{% for row in sortedTribes %}
{% if forloop.first %}

<tr>
{% for pair in row %}
<th>{{ pair[0] }}</th>
{% endfor %}
</tr>
{% endif %}

      {% tablerow pair in row %}
        {{ pair[1] }}
      {% endtablerow %}
    {% endfor %}

  </table>
</div>

<!-- Using vars: -->

## List of Genera in Galerucinae according to ITIS (Galerucini+Alticini)

<div>
<ul>
{% assign sortedGenera = site.data.csv.20230726_ITIS-Galerucini-Alticini-genera-valid-ab-sorted | sort: 'scientificName' %}
{% for row in sortedGenera %}
 <li>
  {{ row.scientificName }} - <a href="https://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value={{row.taxonID}}" target=_blank>
    view in ITIS
  </a>
 </li>
  {% endfor %}
</ul>
</div>

## Table for Genera

<div class="overflow-auto" style="white-space: nowrap;" markdown="block">
  <table>
  {% assign itis = site.data.csv.20230726_ITIS-Galerucini-Alticini-genera-valid-ab-sorted | sort: "tribe" %}
  {% assign header = itis[0] %}
  <tr>
    <th>Scientific Name</th>
    <th>ITIS Reference</th>
  </tr>
  </table>
</div>
