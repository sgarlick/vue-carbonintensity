
<template>
  <div class="postcode">
    <h1>Results for {{this.postcode}}</h1>
    <div class="timechange">
        <div class="calLabel">Choose another day, click below:</div>
        <div class="calendar"><datepicker></datepicker></div>
    </div>
    <div class="timechart">
        <canvas id="postcodeChart"></canvas>
    </div>
    
    <div class="sub"></div>
  </div>
</template>

<script>
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
export default {
  name: 'Postcode',
  components: {
    Datepicker
  },
  props: ['postcode'],
  methods: {
    createChart(labels, data) {
      const ctx = document.getElementById("postcodeChart");
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
            datasets: [
              { 
                label: 'Hourly Breakdown for last 24 hours',
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
      postcodeData: null,
      date: new Date()
    }
  },
  mounted () {
    const url = "https://api.carbonintensity.org.uk/regional/intensity/"+this.date.getFullYear()+ '-' + (this.date.getMonth()+1) + '-' +this.date.getDate()+"/fw24h/postcode/" + this.postcode;
    console.log(url);
    axios
      .get(url)
      .then(response => {
        this.postcodeData = response.data.data.data;
        const labels = this.postcodeData.map((time)=>{
            return(time.from.substr(11, 5) )
        });
        const data = response.data.data.data.map(time => time.intensity.forecast);
        this.createChart(labels,data);
        setTimeout(function(){ window.scrollTo(0,document.body.scrollHeight); }, 300);
        
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    display: block;
    width:100%;
    text-transform: uppercase;
}
.timechart{
    display: block;
    margin: auto;
    width: 80%;
    padding-top: 0px;
    min-width: 420px;
}
.timechange{
    padding-top:10px;
    width:240px;
}
.calendar{
    padding:5px 0px 20px 0px;
}
.sub{
    height:50px;
}
</style>
