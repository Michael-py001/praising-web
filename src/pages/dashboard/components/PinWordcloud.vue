<template>
  <a-card title="沸点热门关键词">
    <div class="w-full h-40 md:h-[365px]" ref="chartRef"></div>
  </a-card>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { getKeywords, KeywordResult } from '@/api/pin';
import 'echarts-wordcloud';

const keywords = ref<KeywordResult[]>();
const chartRef = ref<HTMLDivElement>();
let chart: echarts.ECharts;

onMounted(async () => {
  const { data } = await getKeywords(400);
  keywords.value = data;

  const keywordsData = keywords.value.map((item) => ({
    name: item.word,
    value: item.hot,
  }));

  if (chartRef.value) {
    chart = echarts.init(chartRef.value);
  }
  chart.setOption({
    series: [
      {
        type: 'wordCloud',
        shape: 'circle',
        keepAspect: false,
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        shrinkToFit: false,
        layoutAnimation: true,
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color() {
            return `rgb(${[
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
            ].join(',')})`;
          },
        },
        emphasis: {
          focus: 'self',
          textStyle: {
            textShadowBlur: 10,
            textShadowColor: '#333',
          },
        },
        data: keywordsData,
      },
    ],
  });
});
</script>

<style lang="scss" scoped></style>
