<template>
  <div class="all-wr">
    <div class="mobile-text">
      Access on desktop only!
    </div>
    <div class="info">
    <div class="info-content">
      <ClientName/>
      <AddItems/>
    </div>
  </div>
  </div>
</template>

<script>
import ClientName from "./ClientName.vue"
import AddItems from "./AddItems.vue"

export default {
  components: {
    ClientName,
    AddItems
  },

  data() {
    return {
      
    };
  },
};
</script>

<style>
@import "../styles/info.css";
</style>