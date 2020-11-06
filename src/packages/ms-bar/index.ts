import MSBar from "./MsBar.vue";

(MSBar as any).install = function (Vue: any) {
  Vue.component(MSBar.name, MSBar)
}
export default MSBar;