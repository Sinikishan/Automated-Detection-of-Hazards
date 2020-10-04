const fs = require("fs");
const request = require("request");

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(path)).on("close", callback);
  });
};
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 8; j++) {
    var url = `https://gibs-a.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2020-10-03/GoogleMapsCompatible_Level9/3/${i}/${j}.jpg`;
    download(url, `./data/${i}${j}.jpg`, () => {
      console.log("done");
    });
  }
}
