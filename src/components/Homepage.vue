<template>
  <div class="home">
    <div class="mainUKData">
      <div class="mainIntensity">Current UK Carbon Intensity <br/><span>{{ mainIntensity }}</span></div>
      <div class="mainForecast">Forecast {{ mainForecast }}</div>
      <div class="mainIndex">{{ mainIndex }}</div> 
    </div>  
    <div class="postcodeInput">
      <input placeholder="Enter postcode for Local breakdown" v-on:change="displayPostcode($event)"/>
    </div>
    <!-- Region List Show and Hide -->
    <transition name="slide-fade">
    <div v-if="showRegionList" class="showRegions">
      <button v-on:click="hideRegions">Hide Region List</button>
      <Regional/>
    </div>
    </transition>
    <transition name="bounce">
      <div v-if="!showRegionList" class="showRegions">
        <button v-on:click="showRegions">Show Region List</button>
      </div>
    </transition>
<!-- Postcode List Show and Hide -->
    <transition name="slide-fade">
      <div v-if="showPostcode">
        <Postcode v-bind:postcode="this.postcode"/>
      </div>
  </transition>
  </div>
</template>

<script>
import axios from 'axios';
import Regional from './Regional';
import Postcode from './Postcode';
export default {
  name: 'Homepage',
  components: {
    Regional,
    Postcode
  },
  methods: {
    showRegions: function(){
    this.showRegionList=true;
    },
    hideRegions: function(){
    this.showRegionList=false;
    },
    displayPostcode: function(event){
    this.postcode=event.target.value;
    this.showPostcode=true;
    }
  },
  data () {
    return {
      showRegionList: false,
      showPostcode: false,
      mainIntensity: null,
      mainForecast: null,
      mainIndex: null,
      loading: true,
      errored: false,
      postcode: null
    }
  },
  mounted () {
    axios
      .get('https://api.carbonintensity.org.uk/intensity')
      .then(response => {
        this.mainIntensity = response.data.data[0].intensity.actual;
        this.mainForecast = response.data.data[0].intensity.forecast;
        this.mainIndex = response.data.data[0].intensity.index;
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)

     
  },
  updated(){
    if (this.showRegionList===true){
    setTimeout(function(){ window.scrollBy(0, 450); }, 300);
    }
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  max-width: 1080px;
  height: 76vh;
  margin:auto;
  padding-top:80px;
  background-image: url('../assets/stock-vector-united-kingdom-d-map-with-borders-of-regions-1577279926.jpg');
  background-size: cover;
  background-position: bottom right;
}
.mainUKData{
  font-weight: bold;
  font-size: 12pt;
  width:50%;
  min-width:300px;
  margin:auto;
  background-color: rgb(0, 0, 0,0.5);
  color: #fff;
  border: solid 2px #000;
}

.mainIntensity, .mainForecast, .mainIndex{
  padding:10px;
}
.mainIntensity span{
  color:lightgreen;
  font-size:28pt;
}
.mainIndex{
 text-transform: uppercase;
 color:lightgreen;
  font-size:28pt;
}
.postcodeInput {
  margin-top:50px;
  padding:20px;

}
.postcodeInput input{
  margin:auto;
  width:50%;
  min-width:280px;
  color: #333;
  padding: 10px;
  font-size: 13pt;

}
.showRegions{
  margin-top:30px;
}
.showRegions button{
  margin:auto;
  width:50%;
  min-width:300px;
  color: #000;
  padding: 10px;
  font-size: 13pt;
}
.regions {
  background-color: #eee;
  margin-top:50px;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
