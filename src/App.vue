<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/usercenter/info">UserInfo</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
html,
body {
  height: 100%;
  padding:0;
  margin:0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
