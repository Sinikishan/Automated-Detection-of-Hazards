import urllib.request

tilePathGeneral = 'wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2020-10-03/GoogleMapsCompatible_Level9/3/{}/{}.jpg'

for i in range(0, 5):
    for j in range(0, 8):
        print(i, j)
        url = 'https://gibs-a.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2020-10-03/GoogleMapsCompatible_Level9/3/{}/{}.jpg'.format(
            i, j)
        print(url)
        res = urllib.request.urlopen(url)
        print(res)
        with open("data/{}{}.jpg".format(i, j), 'wb') as file:
            file.write(res.content)
