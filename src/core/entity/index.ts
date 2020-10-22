import { EChartType, EChartDataType, EThemeType } from '@/core/constans/enum';

export interface IEntity<T> {
  id: T;
}
export interface IBase<T> {
  key: string;
  value: T;
}

export interface ISelectBase<T> extends IBase<T> {
  selected: boolean;
}

export interface IBaseDesc<T> extends ISelectBase<T>, IEntity<string> {}

export interface ITheme {
  version: number;
  themeName: string;
  theme: Object;
}
export interface IChartTheme extends IBase<EThemeType> {
  name: string;
  data: ITheme;
}
export interface IChartOpts {
  // 设备像素比
  devicePixelRatio?: number;
  // 渲染器，支持 'canvas' 或者 'svg'
  renderer?: string;
  // 可显式指定实例宽度，单位为像素。如果传入值为 null/undefined/'auto'，则表示自动取 dom（实例容器）的宽度。
  width?: number | string;
  // 可显式指定实例高度，单位为像素。如果传入值为 null/undefined/'auto'，则表示自动取 dom（实例容器）的高度。
  height?: number | string;
}

export interface IChartBase extends IEntity<string> {
  name: string;
  description: string;
  remark: string;
  themeType: EThemeType;
  chartType: EChartType;
}
export interface IChartData extends IEntity<string> {
  // 关联的图表的id
  chartId: string;
  // 数据项名
  name: string;
  // 数据项绑定字段
  nameBind: string;
  // 数据
  value: string;
  // 数据绑定字段
  valueBind: string;
}

export interface IChart extends IChartBase {
  // 数据绑定类型
  dataType: EChartDataType;
  // 类目项绑定字段
  category: string;
  // 类目轴数据
  categoryData: string;
  // 数据项
  chartsData: IChartData[];
}
