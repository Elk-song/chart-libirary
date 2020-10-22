import * as echarts from 'echarts';
import { EThemeType } from '@/core/constans/enum';
import { IChartOpts, IChartTheme } from '@/core/entity';
import { IChartManager } from '@/core/manager/IChartManager';
import { themeTypeArr } from '@/core/constans';

export default class ChartManager implements IChartManager {
  //#region 【properties】
  // 图表实例
  public chartInstance?: echarts.ECharts;
  // 主题
  private theme = themeTypeArr[0];
  //#endregion

  //#region 【public】

  /**
   * @description 初始化echarts实例
   * @param {string} _id 元素类名
   * @param {EThemeType} [_theme] 颜色主题类型
   * @param {IChartOpts} [_opts] 基础配置
   */
  public initInstance(_id: string, _theme?: EThemeType, _opts?: IChartOpts): void {
    // 获取元素
    const chart: HTMLDivElement | null = document.querySelector(`#${_id}`);
    if (chart !== null) {
      const theme =
        typeof _theme !== 'undefined' ? this.transferTheme(_theme) : null;
      // 初始化画布
      this.init(chart, theme, _opts);
    }
  }

  /**
   * @description 初始化主题
   * @param {IChartTheme} [_theme] 主题信息
   */
  public initTheme(_theme?: IChartTheme | null): void {
    if (typeof _theme === 'undefined') {
      this.theme = themeTypeArr[0];
    } else if (_theme !== null) {
      this.theme = _theme;
    }
  }

  /**
   * @description 更新主题设置
   * @param {EThemeType} _type 主题类型
   * @param {string} _id 元素id
   */
  public changeTheme(_id: string, _type: EThemeType, _opts?: IChartOpts): void {
    // 先销毁实例，不然主题不会重新渲染
    typeof this.chartInstance !== 'undefined' &&
      this.dispose(this.chartInstance.getDom());
    // 初始化实例
    this.initInstance(_id, _type, _opts);
  }
  //#endregion

  //#region 【私有方法】

  /**
   * @description 注册主题
   * @param {IChartTheme} _theme 主题信息
   */
  private registerTheme(_theme: IChartTheme): void {
    echarts.registerTheme(_theme.name, _theme.data.theme);
  }

  /**
   * @description 销毁实例
   * @param {(ECharts | HTMLDivElement | HTMLCanvasElement)} _target 元素
   */
  private dispose(
    _target: HTMLDivElement | echarts.ECharts | HTMLCanvasElement,
  ): void {
    echarts.dispose(_target);
  }

  /**
   * @description 初始化画布
   * @param {HTMLDivElement} _dom 元素
   * @param {(IChartTheme | null)} [_theme] 主题设置
   * @param {IChartOpts} [_opts] 基础配置
   */
  private init(
    _dom: HTMLDivElement,
    _theme?: IChartTheme | null,
    _opts?: IChartOpts,
  ): void {
    // 初始化主题信息
    this.initTheme(_theme);
    // 注册主题
    this.registerTheme(this.theme);
    // 初始化echarts实例
    this.chartInstance = echarts.init(_dom, this.theme.name, _opts);
  }
  /**
   * @description 根据主题类型转换为主题信息
   * @param {EThemeType} _themeType 主题类型
   * @returns {(IChartTheme | undefined)} 主题信息
   */
  private transferTheme(_themeType: EThemeType): IChartTheme | undefined {
    const filters = themeTypeArr.filter((_theme) => _theme.value === _themeType);
    return filters.length ? filters[0] : undefined;
  }
  //#endregion
}
