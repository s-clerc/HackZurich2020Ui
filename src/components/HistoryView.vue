<template>
  <div class="history-view">
    <b-container>
      <b-row>
        <b-card no-body 
               class="overflow-hidden" 
               style="max-width: 540px;" 
               v-on:click="openQuery(query.id)" 
               v-for="query in history" 
               :key="query.id">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="`${$store.state.urlBase}/preview/${query.id}.png`" 
                          :alt="`Schematic ${query.name}`" 
                          class="rounded-0"
                          style="padding: 1rem">
                            
                          </b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body :title="query.name">
                <b-card-text>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-row>
    </b-container>
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