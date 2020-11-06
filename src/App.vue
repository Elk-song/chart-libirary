<template>
  <div id="app">
    <MSBar
      :width="600"
      :height="400"
      :charts="barJson"
      :renderer="renderer"
    ></MSBar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MSBar from "@/packages/ms-bar/ms-bar.vue";
@Component({
  name: "App",
  components: {
    MSBar,
  },
})
export default class App extends Vue {
  private barJson = require("./bar.json");
  private renderer: string = "svg";
}
</script>