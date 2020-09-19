<template>
  <div class="main-view">
    <b-container>
      <b-row>
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here...">
        </b-form-file>
        <button v-on:click="submitFile()" class="mt-3" :disabled="file == null" >Upload {{ file ? file.name : '' }}</button>
      </b-row>
      <b-row>
        <div id="preview">
          <b-img v-if="uploadId && fileUploaded" :src="uploadId"></b-img>
          <b-skeleton-img class="skeleton-img" v-else-if="fileUploaded"></b-skeleton-img>
        </div>
      </b-row>
      <b-row>
          <b-tabs content-class="mt-3">
            <b-tab title="JSON" active><DataView id="json-data-view" :data="data[0]"></DataView></b-tab>
            <b-tab title="GraphViz"><DataView id="graph-viz-data-view" :data="data[1]"></DataView></b-tab>
          </b-tabs>
      </b-row>
    </b-container>
  </div>
</template>

<script type="application/javascript">
import axios from 'axios'
import DataView from "./DataView.vue"
import Vue from 'vue';
export default {
  name: 'MainView',
  components: {
    DataView
  },
  props: {
  },
  data: () => {
    return {
      file: null,
      fileUploaded: false,
      uploadId: undefined,
      data: [null, null]
    }
  },
  methods: {
    submitFile: () => {
      let formData = new FormData()
      formData.append('file', this.file)
      axios.post( '/upload',
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
        console.log('SUCCESS!!')
        console.log(response)
        this.fileUploaded = true
        this.uploadId = response.id
        // Slightly complicated, but we're doing it this way so that 
        // we present the data as soon as it is loaded.
        for (let [index, type] of ["json", "graph"].entries()) {
          axios
            .get(`/data/${this.uploadId}.${type}`)
            .then((response) => Vue.set(this.data, index, response))
        }
      }).catch((response) => {
        console.log('FAILURE!!')
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>
#preview {
  width:  80%;
  height: 20%;
}
</style>