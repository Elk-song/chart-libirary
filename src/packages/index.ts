import Vue from 'vue';
import MSLine from './ms-line';
import MSBar from "./ms-bar";
const components: { [propsName: string]: any } = {
  MSLine,
  MSBar
};

const install = (vue: typeof Vue): void => {
  // 安装全部的插件
  Object.keys(components).forEach((key) => {
    vue.component(key, components[key]);
  });
};

export default {
  install,
  ...components,
};
