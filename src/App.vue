<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand href="#">DigitMatic</b-navbar-brand>
  
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-on:click="$store.commit('changeTab', 'about-view')">About</b-nav-item>
          <b-nav-item v-on:click="$store.commit('changeTab', 'main-view')">Tool</b-nav-item>
          <b-nav-item v-on:click="$store.commit('changeTab', 'history-view')">Previous Queries</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <MainView v-if="$store.state.currentTab=='main-view'"></MainView>
    <HistoryView v-if="$store.state.currentTab=='history-view'"></HistoryView>
    <div v-if="$store.state.currentTab=='about-view'">
      Hello, we are people
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import MainView from "./components/MainView.vue"
import HistoryView from "./components/HistoryView.vue"


export default {
  name: 'App',
  components: {
    MainView,
    HistoryView
  },
  data: () => {
    return {
      state: "main-view"
    }
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
