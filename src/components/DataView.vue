<template>
  <div class="data-view">
    <b-container fluid>
      Test {{ uploadId }}
      <b-row>
        <b-card class="card" title="Preview">
          <b-img :hidden="isImageLoading" fluid :src="`${$store.state.urlBase}/preview/${uploadId}.png`" @load="isImageLoading=false"></b-img>
          <b-skeleton-img class="skeleton-img" v-if="isImageLoading"></b-skeleton-img>
        </b-card>
      </b-row>
      <b-row>
          <b-card class="card" no-body>
            <b-tabs card>
              <b-tab disabled>
                 <template v-slot:title>
                  <span style="color: black; font-weight: bold;">
                    Computed Data
                  </span>
                </template>
              </b-tab>
              <b-tab title="JSON" active>
                <CodeView id="json-code-view" :data="code[0]"></CodeView>
              </b-tab>
              <b-tab title="GraphViz">
                <CodeView id="graph-viz-code-view" :data="code[1]"></CodeView>
              </b-tab>
            </b-tabs>
          </b-card>
      </b-row>
      <b-row>
        <b-card class="card" title="Visualisation of Graph">
            <cytoscape id="cy" class="cyto test" ref="cy" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode">
              <cy-element
                v-for="def in elements"
                :key="`${def.data.id}`"
                :definition="def"
                v-on:mousedown="deleteNode($event, def.data.id)"
              />
            </cytoscape>
          </b-card>
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
  updated: async function () {
    let cyto = document.getElementById("cy")
    for (let canvas of cyto.getElementsByTagName("canvas")) {
      canvas.style.left = "0"
    }
    console.log("hey")
    const cy = await this.$refs.cy.cy
      this.$nextTick(() => {
        cy.layout({name: "grid"}).run();
        cy.fit(null, 200);
        console.log("OK")
      });
  },
  data: () => {
    return {
      isImageLoading: true,
      code: [null, null],
      config: {
        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#666',
              'label': 'data(id)'
            }
          }, {
            selector: 'edge',
            style: {
              'width': 3,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle'
            }
          }
        ],
        layout: {
          name: 'grid',
          rows: 2
        }
      },
      elements: [
        { // node a
          data: { id: 'a' }
        },
        { // node b
          data: { id: 'b' }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ]
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
            .then((response) => {
              console.log(`GET ${type} ${response}`)
              Vue.set(this.code, index, response)
            })
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
.card {
  min-width: 100%;
  margin-bottom: 1.5rem;
}
h4 {
  text-align: left;
}
.cyto {
  min-width: 80%;
}

</style>