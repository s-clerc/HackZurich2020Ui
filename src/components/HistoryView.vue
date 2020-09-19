<template>
  <div class="history-view">
    <b-card v-for="query in history" 
            :key="query"
            :img-src="`${$store.state.urlBase}/preview/${query}.png`" 
            :img-alt="`Schematic ID ${query}`" 
            img-left 
            class="mb-3"
            v-on:click="openQuery(query)">
    </b-card>
  </div>
</template>

<script type="application/javascript">
export default {
  name: 'HistoryView',
  components: {
  },
  mounted () {
    this.history = JSON.parse(localStorage.history || "[]")
  },
  watch: {
    history (newValue) {
      localStorage.history = JSON.stringify(newValue)
    }
  },
  props: {
  },
  data: () => {
    return {
      history: [],
      urlBase: ""
    }
  },
  methods: {
    openQuery (query) {
      this.$store.commit("newId", query)
      this.$store.commit('changeTab', "main-view")
    }
  }
}
</script>

<style type="text/css" scoped>

</style>