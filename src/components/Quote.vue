<template>
  <div class="all-wr">
    <div @click="newQuote" class="newBtn">
      Documents
    </div>
    <div @click="generateReport(1)" class="downloadInBtn">
      Invoice
    </div>
    <div @click="generateReport(2)" class="downloadBtn">
      Quote
    </div>
      <div class="all">
        <VueHtml2pdf
          class="view"
          :show-layout="true"
          :float-layout="false"
          :enable-download="true"
          :paginate-elements-by-height="1400"
          filename="invoice"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="800px"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <div class="h-content">
              <div class="h-header">
                <img src="../assets/tag-logo.png" class="h-logo" />
              </div>
              <div class="h-body">
                <div class="h-title-sec">
                  <div class="h-title">{{ file }}</div>
                  <div class="h-pin">PIN: A005483753Y</div>
                </div>

                <div class="h-first">
                  <div class="h-item">
                    <div class="i-name">CLIENT</div>
                    <div class="ii-value">{{ clientName }}</div>
                  </div>
                  <div class="h-item">
                    <div class="i-name">DATE</div>
                    <div class="ii-value">{{ getDate() }}</div>
                  </div>
                </div>

                <div class="h-second">
                  <div class="h-item">
                    <div class="i-name">PAYMENT TERMS</div>
                    <div class="ii-value">70% Up Front, 30% On Delivery</div>
                  </div>
                  <div class="h-item">
                    <div class="i-name">PAYMENT MODE</div>
                    <div class="ii-value">BANK TRANSFER/MPESA</div>
                  </div>
                </div>

                <div class="h-table">
                  <div style="margin-bottom: 20px;" class="h-table-header">
                    <div class="h-desc">DESCRIPTION</div>
                    <div class="h-cen">QTY</div>
                    <div class="h-cen">@</div>
                    <div class="h-cen">SHS</div>
                  </div>
                  <div
                    v-for="(item, i) in items"
                    :key="i"
                    style="margin-top: 15px"
                    class="h-table-header"
                  >
                    <div class="h-desc-blue">
                      {{ item.description }}
                    </div>
                    <div class="h-cen-blue">
                      {{ new Intl.NumberFormat().format(item.quantity) }}
                    </div>
                    <div class="h-cen-blue">
                      {{ new Intl.NumberFormat().format(item.price) }}
                    </div>
                    <div class="h-cen-blue">
                      {{ getTotal(item.quantity, item.price) }}
                    </div>
                  </div>
                </div>

                <div class="h-third">
                  <div class="h-third-item">
                    <div class="i-third-name">TOTAL</div>
                    <div class="i-third-value">{{ new Intl.NumberFormat().format(total) }}</div>
                  </div>
                </div>

                <div class="h-footer">
                  <span class="f-highlight">TERMS</span> <br />
                  Cheques are payable to "TAG CREATIVE" <br />
                  <span class="f-highlight">MPESA PAYBILL</span> Payments should
                  be made to
                  <span class="f-highlight">Paybill no. 714777</span>, Account
                  No, 0721396569 <br />
                  <span class="f-highlight">MPESA</span> payments should be sent
                  to
                  <span class="f-highlight"
                    >0721 39 65 69 (GITONGA RUCHIAMI)</span
                  >
                  <br />
                  <span class="f-highlight">EFT/RTGS PAYMENTS</span> can be made
                  to <span class="f-highlight">TAG CREATIVE, EQUITY BANK</span>
                  <br />
                  <span class="f-highlight">(A/C no. </span>1250298074388
                  <span class="f-highlight">SWIFT CODE:</span> EQBLKENA
                  <span class="f-highlight">BRANCH CODE:</span> 125
                  <span class="f-highlight"> BANK CODE:</span> 068)
                </div>
              </div>
            </div>
          </section>
        </VueHtml2pdf>
      </div>
    </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import moment from 'moment'
import store from '../store'

export default {
    components: {
        VueHtml2pdf,
    },
    computed: {
      items: () => {
        return store.getters.getItems;
      },

      file: () => {
        return store.getters.getFileName
      },

      clientName: () => {
        return store.getters.getClientName
      },

      total: () => {
        return store.getters.getTotal;
      }
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
        store.dispatch("changeInfoPageState", false)
        store.dispatch("changeDocumentsPageState", true)
      },
        getDate(){
            return moment().format('MMMM Do YYYY')
        },

        getTotal(f, n) {
          return new Intl.NumberFormat().format(f * n);
        },
    }
}
</script>

<style>
@import "../styles/Hello.css";
</style>