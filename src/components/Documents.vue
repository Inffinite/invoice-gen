<template>
  <div class="docs-wr">
    <div
      style="
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
      "
    >
      <div class="docs">
        <div class="d-title">
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
              gap: 10px;
            "
          >
            <svg
              class="docs-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Documents
          </div>
          <div class="gen-actions">
            <div @click="genQuote" class="gen">
              <svg
                class="gen-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              New Quote
            </div>

            <div @click="genInv" class="gen">
              <svg
                class="gen-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              New Invoice
            </div>
          </div>
        </div>

        <div class="d-search">
          <div class="d-s-items">
            <svg
              class="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by client name"
              class="d-input"
            />
          </div>
        </div>

        <div class="my-docs">
          <div v-for="(d, i) in data" :key="i" class="d-item">
            <div class="d-client">
              {{ d.client }}
              
            </div>
            <div class="d-actions">
              <div class="d-date">{{ genDate(d.createdAt) }}</div>
              
              <div @click="createInv(d.items, d.client)" class="d-gen">Invoice</div>

              <div @click="createQuote(d.items, d.client)" class="d-gen">Quote</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import moment from 'moment'

export default {
  data() {
    return {
      items: [
        {
          client: "Tawi Paints",
        },
        {
          client: "Tawi Paints",
        },
        {
          client: "Tawi Paints",
        },
      ],
    };
  },

  mounted(){
    store.dispatch("getDataState")
  },

  computed: {
    data: () => {
        return store.getters.getData
    }
  },

  methods: {
    genDate(date){
        return moment(date).format("MMMM Do YYYY")
    },

    genInv() {
      store.dispatch("changeFileState", "INVOICE");
      store.dispatch("changeDocumentsPageState", false);
      store.dispatch("changeInfoPageState", true);
      // store.dispatch("changeClientNameView", true)
    },

    createInv(items, client) {
      store.dispatch("changeInfoState", client);
      store.dispatch("ItemState", items);
      store.dispatch("changeFileState", "INVOICE");
      store.dispatch("changeDocumentsPageState", false);
      store.dispatch("changeInfoPageState", false);
      store.dispatch("changePreviewState", true);
      // store.dispatch("changeClientNameView", true)
    },

    createQuote(items, client) {
      store.dispatch("changeInfoState", client);
      store.dispatch("ItemState", items);
      store.dispatch("changeFileState", "QUOTATION");
      store.dispatch("changeDocumentsPageState", false);
      store.dispatch("changeInfoPageState", false);
      store.dispatch("changePreviewState", true);
      // store.dispatch("changeClientNameView", true)
    },

    genQuote() {
      store.dispatch("changeFileState", "QUOTATION");
      store.dispatch("changeDocumentsPageState", false);
      store.dispatch("changeInfoPageState", true);
      // store.dispatch("changeClientNameView", true)
    },
  },
};
</script>

<style>
@import "../styles/documents.css";
</style>