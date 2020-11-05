import { EChartType, EType } from '@/core/constans/enum';
import { ChartOpts, IChart, IChartData } from '@/core/entity';
import ChartManager from '@/core/manager/ChartManager';
import { IChartManager } from '@/core/manager/IChartManager';
import JsonTool from '@/utils/json';
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "PropMixins"
})
export default class PropMixins extends Vue {

  @Prop()
  protected charts!: IChart;
  @Prop({ default: 300 })
  protected width: number | string | undefined;
  @Prop({ default: 200 })
  protected height: number | string | undefined;
  @Prop({ default: 2, type: Number })
  protected devicePixelRatio?: number;
  @Prop({ default: "canvas", type: String })
  protected renderer?: string;
  @Prop({ default: "ms-line", type: String })
  protected idName!: string;

  @Watch("chartSize", { deep: true })
  protected sizeChange(_size: {
    width: number | string | undefined;
    height: number | string | undefined;
  }) {
    typeof this.chartManager.chartInstance !== "undefined" &&
      this.chartManager.chartInstance.resize({
        width: _size.width,
        height: _size.height
      });
  }
  protected get chartSize() {
    return { width: this.width, height: this.height };
  }

  protected chartManager: IChartManager = new ChartManager();


  protected initInstance(_data: IChart) {
    this.chartManager.initInstance(
      this.idName,
      _data.themeType,
      new ChartOpts(
        this.width,
        this.height,
        this.renderer,
        this.devicePixelRatio
      )
    );
  }

  /**
   * @description 清洗数据
   * @param {Array<IChartData>} _data 数据项
   * @returns {Array<{ name: string; data: Array<number>; type: string }>}
   */
  protected filterStaticData(
    _data: IChartData[],
    _type: EChartType
  ): Array<{ name: string; data: number[]; type: string }> {
    const data: Array<{ name: string; data: number[]; type: string }> = [];
    _data.forEach((_item) => {
      if (_item.value && JsonTool.isJSONString(_item.value)) {
        data.push({
          name: _item.name,
          type: EType[_type],
          data: JSON.parse(_item.value),
        });
      }
    });
    return data;
  }

}