<template>
    <div class="mixChart">
      <canvas v-bind:id="this.chartuid"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'Mixchart',
  props: ['genmix'],
  methods: {
    createChart(chartId, labels, data) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
            datasets: [
              { 
                label: 'Generation Mix',
                data: data,
                borderWidth: 2
              }
            ]
            },
        options: {
          responsive: true
        }
      });
    }
  },
  data () {
    return {
      data: this.genmix,
      chartuid: "chart"+this._uid, 
      title: "Generation Mix"
    }
  },
  mounted () {
      this.createChart(this.chartuid,this.genmix.map(type => type.fuel),this.genmix.map(type => type.perc));
    }
}   
</script>

<style>


</style>
