<template>
  <div id="app">
    <div id="map" class="map"></div>
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {sampleJson, zunyiRoads} from '@/data/geojson'
import {OSM, Vector as VectorSource} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from "ol/layer/Vector";
import {styleFunction} from './olUtil'
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import {Fill} from "ol/style";

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {

      // let geojsonObject = {
      //   'type': 'FeatureCollection',
      //   "crs": {
      //     "type": "name",
      //     "properties": {
      //       "name": "EPSG:4326"
      //     }
      //   },
      //   'features': [{
      //     'type': 'Feature',
      //     'geometry': zunyiRoads
      //   }]
      // }
      let geojsonObject = sampleJson

      let polygonStyleFunction = function polygonStyleFunction(feature, resolution) {
        return new Style({
          stroke: new Stroke({
            color: 'blue',
            width: 1,
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
          }),
          // text: createTextStyle(feature, resolution, myDom.polygons),
        });
      }

      let map = new Map({
            target: 'map',
            layers: [
              // new TileLayer({
              //   source: new XYZ({
              //     url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              //   })
              // }),
              new TileLayer({
                source: new OSM(),
              }),
              new VectorLayer({
                source: new VectorSource({
                  features: new GeoJSON().readFeatures(geojsonObject),
                }),
                style: polygonStyleFunction,
              })
            ],
            view: new View({
              center: [0, 0],
              zoom: 2
            })
          })
      return map;
    },
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.map {
  width: 100%;
  height: 900px;
}
</style>
