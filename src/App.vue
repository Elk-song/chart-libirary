<template>
  <div id="app">
    <ms-line :width="600" :height="400" :chartsData="lineJson"></ms-line>
    <ms-bar :width="600" :height="400" :chartsData="barJson"></ms-bar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "App",
})
export default class App extends Vue {
  private lineJson = require("./line.json");
  private barJson = require("./bar.json");
}
</script>