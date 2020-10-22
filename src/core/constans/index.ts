import { IBaseDesc, IChartTheme, ISelectBase } from '../entity';
import { EChartDataType, EChartType, EThemeType } from './enum';
import { Guid } from 'guid-typescript';
// 图表类型
export const chartsTypeArr: Array<IBaseDesc<EChartType>> = [
  {
    id: Guid.create().toString(),
    key: '折线图',
    value: EChartType.MSLine,
    selected: false,
  },
  {
    id: Guid.create.toString(),
    key: '柱状图',
    value: EChartType.MSBar,
    selected: false,
  },
];
// 图表数据类型
export const chartDataTypeArr: Array<ISelectBase<EChartDataType>> = [
  {
    key: '静态数据',
    value: EChartDataType.static,
    selected: true,
  },
  {
    key: '动态数据',
    value: EChartDataType.dynamic,
    selected: false,
  },
];
export const themeTypeArr: IChartTheme[] = [
  {
    key: '主题一',
    data: require('../../assets/json/walden.project.json'),
    name: EThemeType[EThemeType.walden],
    value: EThemeType.walden,
  },
  {
    key: '主题二',
    data: require('../../assets/json/vintage.project.json'),
    name: EThemeType[EThemeType.vintage],
    value: EThemeType.vintage,
  },
  {
    key: '主题三',
    data: require('../../assets/json/westeros.project.json'),
    name: EThemeType[EThemeType.westeros],
    value: EThemeType.westeros,
  },
  {
    key: '主题四',
    data: require('../../assets/json/shine.project.json'),
    name: EThemeType[EThemeType.shine],
    value: EThemeType.shine,
  },
  {
    key: '主题五',
    data: require('../../assets/json/macarons.project.json'),
    name: EThemeType[EThemeType.macarons],
    value: EThemeType.macarons,
  },
];
