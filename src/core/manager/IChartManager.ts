import { EThemeType } from '@/core/constans/enum';
import { ECharts } from 'echarts';
import { IChartOpts, IChartTheme } from '@/core/entity';

export interface IChartManager {
    //#region 【properties】
  // 图表实例
  chartInstance?: ECharts;
  //#endregion

  //#region 【methods】
  /**
   * @description 初始化echarts实例
   * @param {string} _id 元素类名
   * @param {EThemeType} [_theme] 颜色主题类型
   * @param {IChartOpts} [_opts] 基础配置
   */
  initInstance(_id: string, _theme?: EThemeType, _opts?: IChartOpts): void;

  /**
   * @description 初始化主题
   * @param {IChartTheme} [_theme] 主题信息
   */
  initTheme(_theme?: IChartTheme): void;

  /**
   * @description 更新主题设置
   * @param {EThemeType} _type 主题类型
   * @param {string} _id 元素id
   */
  changeTheme(_id: string, _type: EThemeType, _opts?: IChartOpts): void;
  //#endregion
}
