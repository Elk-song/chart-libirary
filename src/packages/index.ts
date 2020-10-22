import Vue from 'vue';
import MsLine from './ms-line';
import MsBar from "./ms-bar";
const components: { [propsName: string]: any } = {
  MsLine,
  MsBar
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
