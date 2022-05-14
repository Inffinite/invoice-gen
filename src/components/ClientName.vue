<template>
  <div class="entry">
    <div class="entry-content">
      <div v-if="clientNameView">
        <div class="e-title">{{ title }}</div>

        <div class="label">Client Name</div>
        <div class="e-input">
          <input
            type="text"
            v-model="clientname"
            placeholder="Tawi Paints"
            class="input"
          />
        </div>

        <div @click="addName" class="addbtn">Save</div>
      </div>

      <div v-if="addItemsView">
        <div class="e-title">Add Items</div>
        <div class="label">Description</div>
        <div class="e-input">
          <textarea
            v-model="description"
            rows="3"
            type="text"
            placeholder="4 black and white posters"
            class="input"
          ></textarea>
        </div>

        <div class="label">Quantity</div>
        <div class="e-input">
          <input
            v-model="quantity"
            type="text"
            placeholder="40"
            class="input"
          />
        </div>

        <div class="label">Price per unit</div>
        <div class="e-input">
          <input v-model="price" type="text" placeholder="200" class="input" />
        </div>

        <div @click="addItem" class="addbtn">
          <svg
            class="e-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add to Items
        </div>
        <div @click="generate" class="generate">
          <svg
            class="e-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clip-rule="evenodd"
            />
          </svg>
          Generate quote
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import axios from 'axios'

export default {
  data() {
    return {
      clientname: null,
      description: "",
      quantity: null,
      price: null,
    };
  },
  computed: {
    clientNameView: () => {
      return store.getters.getClientNameView;
    },

    title: () => {
      return store.getters.getFileName;
    },

    addItemsView: () => {
      return store.getters.getAddItemsView;
    },
  },

  methods: {
    addName() {
      if (!this.clientname) {
        alert("You must enter a client name");
      } else {
        store.dispatch("changeInfoState", this.clientname);
        store.dispatch("changeClientNameView", false);
        store.dispatch("changeAddItemsView", true);
      }
    },

    async addItem() {
      if (!this.description || !this.quantity || !this.price) {
        alert("You must fill all fields!");
      } else {
        var data = {
          description: this.description,
          quantity: this.quantity,
          price: this.price,
        };

        await store.dispatch("changeItemState", data);

        this.description = "";
        this.quantity = "";
        this.price = "";
      }
    },

    async generate() {
      var items = await store.getters.getItems;

      if (items.length <= 0) {
        alert("You cannot generate a quotation with no items!");
      } else {
        axios.post('http://localhost:3000/addDoc', {
          client: store.getters.getClientName,
          docType: store.getters.getFileName,
          grandTotal: store.getters.getTotal,
          items: items
        })
        .then(() => {
          console.log("[+] Saved!")
        })
        .catch((e) => {
          console,log(e)
        })
        
        await store.dispatch("changeInfoPageState", false);
        await store.dispatch("changePreviewState", true);
      }
    },
  },
};
</script>

<style>
</style>