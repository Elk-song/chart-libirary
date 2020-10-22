import MsBar from "./MsBar.vue";

(MsBar as any).install = function (Vue: any) {
  Vue.component(MsBar.name, MsBar)
}
export default MsBar;