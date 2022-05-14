<template>
  <div class="hello">
    <Quote/>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import store from '../store'
import moment from 'moment'
import Quote from './Quote.vue'

export default {
  name: "HelloWorld",
  data() {
    return {
    };
  },

  computed: {
    items: () => {
      return store.getters.getItems;
    },

    clientName: () => {
      return store.getters.getClientName
    },

    total: () => {
      return store.getters.getTotal;
    }
  },

  components: {
    VueHtml2pdf,
    Quote
  },

  methods: {
    async generateReport(n) {
      if(n == 1){
        await store.dispatch("changeFileState", 'INVOICE')
        this.$refs.html2Pdf.generatePdf();
      } else {
        await store.dispatch("changeFileState", 'QUOTATION')
        this.$refs.html2Pdf.generatePdf();
      }
    },

    newQuote(){
      store.dispatch("removeAllItems")
      store.dispatch("changeAddItemsView", false)
      store.dispatch("changeClientNameView", true)
      store.dispatch("changePreviewState", false)
      store.dispatch("changeInfoPageState", true)
    },

    getTotal(f, n) {
      return new Intl.NumberFormat().format(f * n);
    },

    getDate(){
      return moment().format('MMMM Do YYYY')
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../styles/Hello.css";
</style>
