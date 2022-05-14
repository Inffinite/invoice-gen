<template>
  <div id="app">
    <HelloWorld v-if="previewPage"/>
    <InfoPage v-if="infoPage"/>
    <Documents v-if="documentsPage"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import InfoPage from './components/InfoPage.vue'
import store from './store'
import Documents from './components/Documents.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    InfoPage,
    Documents
  },
  computed: {
    previewPage: () => {
      return store.getters.getPreviewPage
    },

    infoPage: () => {
      return store.getters.getInfoPage
    },

    documentsPage: () => {
      return store.getters.getDocumentsPage
    }
  }
}
</script>

<style>
  #app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
