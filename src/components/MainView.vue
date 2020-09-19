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
        <button v-on:click="submitFile()" class="mt-3" :disabled="file == null" >Upload {{ file ? file.name : '' }}
        </button>
      </b-row>
      <DataView v-if="fileUploaded" 
                :upload-id="uploadId"
                :code="data"
                :url-base="urlBase">
              
      </DataView>
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
      data: [null, null],
      urlBase: ""
    }
  },
  methods: {
    submitFile: function () {
      let formData = new FormData()
      formData.append('file', this.file)
      axios.post(`${this.urlBase}/upload`,
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
            .get(`${this.urlBase}/data/${this.uploadId}.${type}`)
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

h4 {
  text-align: left;
}
</style>