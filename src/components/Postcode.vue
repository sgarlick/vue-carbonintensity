
<template>
  <div class="postcode">
    <h1>Results for {{this.postcode}}</h1>
    <div class="timechange">
        <div class="calLabel">Choose another day, click below:</div>
        <div class="calendar"><datepicker v-model="date" :disabled-dates='{from: new Date()}'></datepicker></div>
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
    createChart() {
      const ctx = document.getElementById("postcodeChart");
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.postcodeData.map((time)=>{
            return(time.from.substr(11, 5) )
          }),
          datasets: [
            { 
              label: 'Half Hourly Breakdown for '+ this.date.toLocaleDateString("en-UK",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
              data: this.postcodeData.map(time => time.intensity.forecast)
          }]
        },
        options: {responsive: true}
      });
    }
  },
  data () {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return {
      postcodeData: null,
      date: yesterday
    }
  },
   mounted() {
    const url = "https://api.carbonintensity.org.uk/regional/intensity/"+this.date.getFullYear()+ '-' + (this.date.getMonth()+1) + '-' +this.date.getDate()+"/fw24h/postcode/" + this.postcode;
     axios
      .get(url)
      .then(response => {this.postcodeData = response.data.data.data;
        this.createChart();
        setTimeout(function(){ window.scrollBy(0, document.body.scrollHeight); }, 0);
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false);
      
  },

  updated () {
    const url = "https://api.carbonintensity.org.uk/regional/intensity/"+this.date.getFullYear()+ '-' + (this.date.getMonth()+1) + '-' +this.date.getDate()+"/fw24h/postcode/" + this.postcode;
     axios
      .get(url)
      .then(response => {this.postcodeData = response.data.data.data;
        this.createChart();
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
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
    min-width: 380px;
}
.timechange{
    padding-top:10px;
    width:240px;
}
.calendar{
    padding:5px 0px 20px 20px;
}
.sub{
    height:50px;
}
</style>
