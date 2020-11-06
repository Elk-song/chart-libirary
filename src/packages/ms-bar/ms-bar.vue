<template>
  <div :id="idName"></div>
</template>

<script lang="ts">
import { ChartOpts, IChart, IChartData } from "@/core/entity";
import ChartManager from "@/core/manager/ChartManager";
import { IChartManager } from "@/core/manager/IChartManager";
import JsonTool from "@/utils/json";
import { ECharts } from "echarts";
import PropMixins from "@/mixins/props.mixins";
import { Component, Prop, Vue, Emit, Watch, Mixins } from "vue-property-decorator";
import { EChartType } from '@/core/constans/enum';
@Component({
  name: "MSBar",
})
export default class MSBar extends Mixins(PropMixins) {
  @Watch("chartsData", { deep: true })
  private WatchChartsData(_data: IChart) {
    typeof this.chartManager.chartInstance === "undefined" &&
      this.initInstance(_data);
    if (
      typeof this.chartManager.chartInstance !== "undefined" &&
      typeof _data !== "undefined"
    ) {
      this.chartManager.changeTheme(this.idName, _data.themeType, new ChartOpts(
          this.width,
          this.height,
          this.renderer,
          this.devicePixelRatio
        ));
      this.changeOption(this.chartManager.chartInstance, _data);
    }
  }
  private mounted() {
   this.initInstance(this.charts);
    if (typeof this.chartManager.chartInstance !== "undefined") {
      this.changeOption(this.chartManager.chartInstance, this.charts);
    }
  }
  /**
   * @description 更新配置项
   * @param {ECharts} _charts
   * @param {IChart} _chartsData
   */
  private changeOption(_charts: ECharts, _chartsData: IChart) {
    const data = this.filterStaticData(_chartsData.chartsData,EChartType.MSBar);
    // 绘制图表
    _charts.setOption(
      {
        title: {
          text: _chartsData.name,
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: _chartsData.categoryData.split(","),
        },
        yAxis: {
          type: "value",
        },
        series: data,
      },
      true
    );
  }
}
</script>
