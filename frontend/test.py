import streamlit as st
import pydeck as pdk
import mapboxgl
pdk.Deck(map_style={
	version: 8,
  sources: {
    gibs: {
      type: 'raster',
      tiles: [
        '//gibs-a.earthdata.nasa.gov/' + tilePath,
        '//gibs-b.earthdata.nasa.gov/' + tilePath,
        '//gibs-c.earthdata.nasa.gov/' + tilePath
        // '//gibs.earthdata.nasa.gov/'
      ],
      tileSize: 256
    }
  },
  layers: [{
    id: 'gibs',
    type: 'raster',
    source: 'gibs',
    minzoom: 0,
    maxzoom: 8
  }]
})


# container: 'map',
#     style: {
#       version: 8,
#       sources: {
#         gibs: {
#           type: 'raster',
#           tiles: [
#             '//gibs-a.earthdata.nasa.gov/' + tilePath,
#             '//gibs-b.earthdata.nasa.gov/' + tilePath,
#             '//gibs-c.earthdata.nasa.gov/' + tilePath
#             // '//gibs.earthdata.nasa.gov/'
#           ],
#           tileSize: 256
#         }
#       },
#       layers: [{
#         id: 'gibs',
#         type: 'raster',
#         source: 'gibs',
#         minzoom: 0,
#         maxzoom: 8
#       }]
#     },
#     center: [0, 0],
#     minZoom: 0,
#     maxZoom: 7,
#     zoom: 2
#   });