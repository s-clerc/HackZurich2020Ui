<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand href="#">DigitMatic</b-navbar-brand>
  
      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->
  
      <b-collapse id="nav-collapse" is-nav>
      </b-collapse>
    </b-navbar>
    <MainView></MainView>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import MainView from "./components/MainView.vue"
export default {
  name: 'App',
  components: {
    MainView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
