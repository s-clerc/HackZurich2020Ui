<template>
  <div class="code-view">
    <div v-if="isLoading">
      <b-skeleton animation="wave" width="85%"></b-skeleton>
      <b-skeleton animation="wave" width="55%"></b-skeleton>
      <b-skeleton animation="wave" width="70%"></b-skeleton>
    </div>
    <div v-else-if="data">
      <pre>
        {{data}}
      </pre>
    </div>
    <div v-else>
      Please upload a file to see the code
    </div>
  </div>
</template>

<script type="application/javascript">
export default {
  name: 'CodeView',
  props: {
    isLoading: () => false,
    data: null
  },
  methods: {
  }
}
</script>

<style scoped>
  pre {
    text-align: left;
  }
</style>