import random
import time
import requests
import json
import qwikidata
import qwikidata.sparql

def get_city_wikidata(city, country):
    query = """
    SELECT ?city ?cityLabel ?country ?countryLabel ?population
    WHERE
    {
      ?city rdfs:label '%s'@en.
      ?city wdt:P1082 ?population.
      ?city wdt:P17 ?country.
      ?city rdfs:label ?cityLabel.
      ?country rdfs:label ?countryLabel.
      FILTER(LANG(?cityLabel) = "en").
      FILTER(LANG(?countryLabel) = "en").
      FILTER(CONTAINS(?countryLabel, "%s")).
    }
    """ % (city, country)

    res = qwikidata.sparql.return_sparql_query_results(query)
    out = res['results']['bindings'][0]
    return out


def get_population(latitude,longitude):
    URL = "https://revgeocode.search.hereapi.com/v1/revgeocode"
    api_key = 'gD3tq83EmX8oHv6hA71NqJ37TYBfYoouAaJPDyfrTx0'

    PARAMS = {
                'at': '{},{}'.format(latitude,longitude),
                'apikey': api_key
            }

    r = requests.get(url = URL, params = PARAMS) 

    data = r.json()

    county = data['items'][0]['address']['county'] 
    country = data['items'][0]['address']['countryName'] 
    state = data['items'][0]['address']['state'] 

    result = get_city_wikidata(county, country)

    return(result['population']['value'])

print(get_population(12.9716,77.5946))





