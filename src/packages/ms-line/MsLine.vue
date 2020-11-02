<template>
 <div :id="idName"></div>
</template>

<script lang="ts">
import { IChart, IChartData } from '@/core/entity';
import ChartManager from '@/core/manager/ChartManager';
import { IChartManager } from '@/core/manager/IChartManager';
import JsonTool from '@/utils/json';
import { ECharts } from 'echarts';
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
@Component({
  name: 'MsLine',
})
export default class MsLine extends Vue {
  get chartSize() {
    return { width: this.width, height: this.height };
  }
  @Prop()
  public chartsData!: IChart;
  @Prop()
  public width: number | string | undefined;
  @Prop()
  public height: number | string | undefined;
  @Prop({ default: "ms-line", type: String })
  idName!: string;
  private chart: IChartManager = new ChartManager();
  @Watch('chartsData', { deep: true })
  private WatchChartsData(_data: IChart) {
    typeof this.chart.chartInstance === 'undefined' &&
      this.chart.initInstance(this.idName, _data.themeType, {
        width: this.width,
        height: this.height,
      });
    if (
      typeof this.chart.chartInstance !== 'undefined' &&
      typeof _data !== 'undefined'
    ) {
      this.chart.changeTheme(this.idName, _data.themeType, {
        width: this.width,
        height: this.height,
      });
      this.changeOption(this.chart.chartInstance, _data);
    }
  }
  private mounted() {
    this.chart.initInstance(this.idName, this.chartsData.themeType, {
      width: this.width,
      height: this.height,
    });
    if (typeof this.chart.chartInstance !== 'undefined') {
      this.changeOption(this.chart.chartInstance, this.chartsData);
    }
  }
  /**
   * @description 更新配置项
   * @param {ECharts} _charts
   * @param {IChart} _chartsData
   */
  private changeOption(_charts: ECharts, _chartsData: IChart) {
    const data = this.filterStaticData(_chartsData.data);
    // 绘制图表
    _charts.setOption(
      {
        title: {
          text: _chartsData.name,
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: _chartsData.categoryData.split(','),
        },
        yAxis: {
          type: 'value',
        },
        series: data,
      },
      true,
    );
  }
  /**
   * @description 清洗数据
   * @param {Array<IChartData>} _data 数据项
   * @returns {Array<{ name: string; data: Array<number>; type: string }>}
   */
  private filterStaticData(
    _data: IChartData[],
  ): Array<{ name: string; data: number[]; type: string }> {
    const data: Array<{ name: string; data: number[]; type: string }> = [];
    _data.forEach((_item) => {
      if (_item.value && JsonTool.isJSONString(_item.value)) {
        data.push({
          name: _item.name,
          type: 'line',
          data: JSON.parse(_item.value),
        });
      }
    });
    return data;
  }
}
</script>
