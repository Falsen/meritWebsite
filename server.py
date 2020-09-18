import time, requests, json, urllib, os
from flask import Flask
app = Flask(__name__)

def get_data():
    data = {
        "tillfalle":"Urval1",
        "vy":"Antagningspoang",
        "antagningsomgang":"HT2020",
        "larosateId":"",
        "utbildningstyp":"p",
        "fritextFilter":"",
        "urvalsGrupp":"",
        "firstResult":0,
        "maxResults":25000,
        "sorteringsKolumn":1,
        "sorteringsOrdningDesc":False,
        "requestNumber":1,
        "paginate":True
    }

    data  = urllib.parse.quote(json.dumps(data))

    print(data)

    encoded = "https://cors-anywhere.herokuapp.com/statistik.uhr.se/rest/stats/tableData?request=" + data
    print(encoded)

    return requests.get(
        encoded,
        headers={
            "x-requested-with": "Python 3.8"
        }
    )


jdata = None

try:
    data = open("cache.json")
    text = data.read()
    jdata = json.loads(text)
    data.close()
except:

    data = get_data()

    cache = open("cache.json","w+")
    cache.write(data.text)
    cache.close()

    jdata = json.loads(data.text)


@app.route('/<university>/<merit>')
def search(university, merit):
    #
    # Process data and return an array
    #
    return university + str(merit)

if __name__ == '__main__':
    app.run()