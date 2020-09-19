<template>
  <div class="data-view">
    <b-container>
      Test {{ uploadId }}
      <b-row>
        <div id="preview">
          <h4> Preview </h4>
          <b-img :hidden="isImageLoading" fluid :src="`${$store.state.urlBase}/preview/${uploadId}.png`" @load="isImageLoading=false"></b-img>
          <b-skeleton-img class="skeleton-img" v-if="isImageLoading"></b-skeleton-img>
        </div>
      </b-row>
      <b-row>
          <div id="code-views" content-class="mt-3">
            <h4> Computed Data </h4>
            <b-tabs >
              <b-tab title="JSON" active>
                <CodeView id="json-code-view" :data="code[0]"></CodeView>
              </b-tab>
              <b-tab title="GraphViz">
                <CodeView id="graph-viz-code-view" :data="code[1]"></CodeView>
              </b-tab>
            </b-tabs>
          </div>
      </b-row>
    </b-container>
  </div>
</template>

<script type="application/javascript">
import CodeView from "./CodeView.vue"
import axios from 'axios'
import Vue from 'vue'

export default {
  name: 'DataView',
  data: () => {
    return {
      isImageLoading: true,
      code: [null, null]
    }
  },
  components: {
    CodeView
  },
  props: ["uploadId"],
  methods: {
  },
  watch: {
    uploadId: {
      immediate: true,
      handler (id) {
        // Slightly complicated, but we're doing it this way so that 
        // we present the data as soon as it is loaded.
        for (let [index, type] of ["json", "graph"].entries()) {
          axios
            .get(`${this.$store.state.urlBase}/data/${id}.${type}`)
            .then((response) => Vue.set(this.data, index, response))
        }
      }
    }
  }
}
</script>

<style scoped>
#preview {
  width:  80%;
  height: 20%;
}

h4 {
  text-align: left;
}
</style>