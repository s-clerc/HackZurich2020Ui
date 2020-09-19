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
      <DataView v-if="$store.state.uploadId" 
                :upload-id="$store.state.uploadId">
      </DataView>
    </b-container>
  </div>
</template>

<script type="application/javascript">
import axios from 'axios'
import DataView from "./DataView.vue"

export default {
  name: 'MainView',
  components: {
    DataView
  },
  data: () => {
    return {
      file: null,
      data: [null, null]
    }
  },
  methods: {
    submitFile: function () {
      let formData = new FormData()
      formData.append('image', this.file)
      axios.post(`${this.$store.state.urlBase}/upload`,
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
        console.log('SUCCESS!!')
        console.log(response)
        this.$store.state.commit("newId", response.id)
        localStorage.history = JSON.stringify(JSON.parse(localStorage.history).append(response.id))
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