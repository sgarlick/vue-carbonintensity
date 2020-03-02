<template>
  <div class="regions">
    <div class="mainTitle">Breakdown by Regions</div>
    
    <div class="regionSummary" v-for="region in regions" :key="region.regionid">
      <div class="regionDetails">
      <div class="shortname">{{region.shortname}}</div>
      <div class="dno">{{region.dnoregion}}</div>
      
      <div class="intensity">{{region.intensity.forecast}} - {{region.intensity.index}}</div>  
      </div>  
      <div class="genmix"><Mixchart v-bind:genmix="region.generationmix"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Mixchart from './Mixchart';
export default {
  name: 'Regional',
  components: {
    Mixchart
  },
  data () {
    return {
      regions: null,
      title: "Regions"
    }
  },
  mounted () {
    axios
      .get('https://api.carbonintensity.org.uk/regional')
      .then(response => {
        this.regions = response.data.data[0].regions;
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false);      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainTitle{
  padding:20px 20px 10px 20px;
  text-align: left;
  font-size: 20pt;
}
.regionSummary{
  width:95%;
  display: flex;
  text-align: left;
  border: solid 1px #333;
  box-shadow: 10px 10px #ccc;
  margin: 20px auto;
}
.regionDetails{
    width:50%;
}
.genmix {
    width:50%;
    text-align: right;
}
.shortname{
  padding:10px;
  font-size:16pt;
}
.dno{
  padding:10px;
  font-size:10pt;
}
.intensity {
  padding:10px;
    font-size: 14pt;
}

</style>
