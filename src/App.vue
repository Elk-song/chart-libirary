<template>
  <div id="app">
    <ms-bar
      :width="600"
      :height="400"
      :charts="barJson"
      :renderer="renderer"
    ></ms-bar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MsBar from "./packages/ms-bar/MsBar.vue";
@Component({
  name: "App",
  components: {
    MsBar,
  },
})
export default class App extends Vue {
  private barJson = require("./bar.json");
  private renderer: string = "svg";
}
</script>