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
import {gpsPoints, geojsonObject} from '@/data/geojson'
import {OSM, Vector as VectorSource} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from "ol/layer/Vector";
import {styleFunction} from './olUtil'
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import {Fill} from "ol/style";
import WebGLPointsLayer from "ol/layer/WebGLPoints";

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

      // let gpsPointLayer = new VectorLayer({
      //   source: new VectorSource({
      //     url: 'data/geojson_f.json',
      //     format: new GeoJSON(),
      //   }),
      // })
      let gpsPointLayer = new WebGLPointsLayer({
        source: new VectorSource({
          url: 'data/geojson_f.json',
          format: new GeoJSON(),
        }),
        style: {
          symbol: {
            symbolType: 'circle',
            size: 5,
            color: 'rgba(255,0,0,0.5)'
          }
        }
      })


      let roadsLayer = new VectorLayer({
        source: new VectorSource({
          url: 'data/geojson_roads.json',
          format: new GeoJSON(),
        }),
      })

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
          gpsPointLayer,
          roadsLayer
        ],
        view: new View({
          projection: 'EPSG:4326',
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
