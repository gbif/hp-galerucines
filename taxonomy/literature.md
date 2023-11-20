---
layout: documentation
sideNavigation: sidenav.literature
composition:
  - type: postHeader
  - type: pageMarkdown
title: Literature
height: 70vh
toc: false
---

<div class="overflow-auto table is-narrow" markdown="block">
  {% assign sortedLit = site.data.csv.Gelechiidae-Reference-August2023-Mod | sort: "Authors" %}

  <!-- Print only cell values of the "Authors" column -->

{% for item in sortedLit %}
{% for pair in item %}
{% assign key = pair[0] %}
{% assign val = pair[1] %}
{% if key == "Authors" %}

<!-- Get unique list of first character in val -->

    {% assign firstChar = val | slice: 0 %}
    {% assign firstCharList = firstCharList | push: firstChar %}
    {% assign firstCharList = firstCharList | uniq %}

<!-- -->

{% endif %}

{% endfor %}
{% endfor %}

<!-- Create a table for each item in firstCharList -->

{% for char in firstCharList %}

{% comment %} <div class="table-container" markdown="block"> {% endcomment %}

<div class="overflow-auto table is-narrow" markdown="block">
<table class="table is-narrow is-striped is-hoverable is-fullwidth">
<thead>
<tr>
<th class="has-text-centered" colspan="3" id="{{ char }}">{{ char }}</th>
</tr>
<tr>
<th class="has-text-centered">Year</th>
<th>Authors</th>
<th>Title</th>
</tr>
</thead>
<tbody>
{% for item in sortedLit %}
{% for pair in item %}
{% assign key = pair[0] %}
{% assign val = pair[1] %}
{% if key == "Authors" %}
{% assign firstChar = val | slice: 0 %}
{% if firstChar == char %}
<tr>
<td class="has-text-centered">{{ item.Year }}</td>
<td>{{ item.Authors }}</td>
<td><a href="{{ item.Link }}" target="_blank">{{ item.Title | strip }}</a></td>
</tr>
{% endif %}
{% endif %}
{% endfor %}
{% endfor %}
</tbody>
</table>
</div>
{% endfor %}

</div>
