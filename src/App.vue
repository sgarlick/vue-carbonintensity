<template>
  
  <div id="app">
    <div class="header">
      <div class="title">Carbon Intensity Chart</div>
      <div class="subtitle">Breakdown of total UK Carbon Output data</div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin:0px;
  background-color: #ccc;
}
.header {
  width:100%;
  height: 70px;
  background-color: #20b96e;
  color: #fff;
}
.title{
  font-size:22pt;
  padding-top: 5px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  
  
}
</style>
