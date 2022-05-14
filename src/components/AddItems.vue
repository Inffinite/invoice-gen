<template>
  <div class="entry">
    <div>
      <div v-if="items.length > 0" class="entry-sec-content">
        <div v-for="(item, i) in items" :key="i" class="e-item">
          {{ item.description }}
          <div class="row">
            <div class="e-row">
              <div class="e-tag">Quantity</div>
              <div class="e-value">
                {{ new Intl.NumberFormat().format(item.quantity) }}
              </div>
            </div>
            <div class="e-row">
              <div class="e-tag">@</div>
              <div class="e-value">
                {{ new Intl.NumberFormat().format(item.price) }}
              </div>
            </div>
          </div>
          <div
            style="
              gap: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            "
          >
            <div class="e-total-row">
              <svg
                class="e-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
                />
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ getTotal(item.quantity, item.price) }}
            </div>

            <div @click="deleteItem(item.description)" class="e-delete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="e-d-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div v-if="total > 0" class="total-wr">
        <div class="total">
          <div class="total-t">Grand Total</div>
          {{ new Intl.NumberFormat().format(total) }}
        </div>
      </div>

      <div v-if="items.length <= 0" class="tag-logo-wr">
        <img class="tag-logo" src="../assets/tag-logo.png" />
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {
      description: "",
      quantity: null,
      price: null,
    };
  },
  methods: {
    getTotal(f, n) {
      return new Intl.NumberFormat().format(f * n);
    },

    deleteItem(desc){
      store.dispatch('deleteItemState', desc)
    },

    async addItem(){
      if(!this.description || !this.quantity || !this.price){
        alert("You must fill all fields!")
      } else {
        var data = {
          description: this.description,
          quantity: this.quantity,
          price: this.price 
        }

        await store.dispatch("changeItemState", data)

        this.description = ''
        this.quantity = ''
        this.price = ''
      }
    }
  },

  computed: {
    items: () => {
      return store.getters.getItems;
    },

    total: () => {
      return store.getters.getTotal;
    },
  },
};
</script>

<style>
</style>