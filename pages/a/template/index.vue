<template>
  <div id="faq" class="container">
    <h1 class="grey--text text--darken-2 capitalize">
      Frequently Asked Questions

      <button @click="downloadPDF" style="position: absolute; right: 241px; top: 121px; z-index: 9999;">
        <img src="~/assets/img/faq/download-guide.jpg" width="120" />
      </button>
    </h1>

    <v-expansion-panel
      v-model="gettingStartedPanel"
      v-bind:expand="true">
      <v-expansion-panel-content class="no-border"
        v-bind:expand-icon="(gettingStartedPanel[0]) ? 'remove' : 'add'">
        <div slot="header" class="m-md-vertical" v-on:click="clearPanel('gettingStarted')">
          <h4>Getting started</h4>
        </div>
        <v-card>
          <v-card-text class="py-0">
            <v-expansion-panel
              v-model="gettingStarted"
              v-bind:expand="true">
              <v-expansion-panel-content class="no-border"
                v-bind:expand-icon="(gettingStarted[idx]) ? 'remove' : 'add'"
                v-for="(faq,idx) in sortedGettingStarted"
                v-bind:key="idx">
                <div slot="header" class="m-md-vertical">
                  <h4 class="ml-2">{{ faq.title }}</h4>
                </div>
                <v-card>
                  <v-card-text class="ml-3 py-0">
                    <div v-html="faq.content"></div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel
      v-model="acePanel"
      v-bind:expand="true">
      <v-expansion-panel-content class="no-border"
        v-bind:expand-icon="(acePanel[0]) ? 'remove' : 'add'">
        <div slot="header" class="m-md-vertical" v-on:click="clearPanel('faqsPanel')">
          <h4>About the ACE Portal</h4>
        </div>
        <v-card>
          <v-card-text class="py-0">
            <v-expansion-panel
              v-model="faqsPanel"
              v-bind:expand="true">
              <v-expansion-panel-content class="no-border"
                v-bind:expand-icon="(faqsPanel[idx]) ? 'remove' : 'add'"
                v-for="(faq,idx) in sortedAceFaq"
                v-bind:key="idx">
                <div slot="header" class="m-md-vertical">
                  <h4 class="ml-2">{{ faq.title }}</h4>
                </div>
                <v-card>
                  <v-card-text class="ml-3 py-0">
                    <div v-html="faq.content"></div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel
      v-model="giftPanel"
      v-bind:expand="true">
      <v-expansion-panel-content class="no-border"
        v-bind:expand-icon="(giftPanel[0]) ? 'remove' : 'add'">
        <div slot="header" class="m-md-vertical" v-on:click="clearPanel('giftFaqsPanel')">
          <h4>Redemption</h4>
        </div>
        <v-card>
          <v-card-text class="py-0">
            <v-expansion-panel
              v-model="giftFaqsPanel"
              v-bind:expand="true">
              <v-expansion-panel-content class="no-border"
                v-bind:expand-icon="(giftFaqsPanel[idx]) ? 'remove' : 'add'"
                v-for="(faq,idx) in sortedGiftFaq"
                v-bind:key="idx">
                <div slot="header" class="m-md-vertical"><h4 class="ml-2">{{ faq.title }}</h4></div>
                <v-card>
                  <v-card-text class="ml-3 py-0">
                    <div v-html="faq.content"></div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel
      v-model="technicalPanel"
      v-bind:expand="true">
      <v-expansion-panel-content class="no-border"
        v-bind:expand-icon="(technicalPanel[0]) ? 'remove' : 'add'">
        <div slot="header" class="m-md-vertical" v-on:click="clearPanel('technicalFaqsPanel')">
          <h4>Technical issues</h4>
        </div>
        <v-card>
          <v-card-text class="py-0">
            <v-expansion-panel
              v-model="technicalFaqsPanel"
              v-bind:expand="true">
              <v-expansion-panel-content class="no-border"
                v-bind:expand-icon="(technicalFaqsPanel[idx]) ? 'remove' : 'add'"
                v-for="(faq,idx) in sortedTechnicalFaq"
                v-bind:key="idx">
                <div slot="header" class="m-md-vertical">
                  <h4 class="ml-2">{{ faq.title }}</h4>
                </div>
                <v-card>
                  <v-card-text class="ml-3 py-0">
                    <div v-html="faq.content"></div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <br />

    <contact-us />

    <a href="#" class="back-to-top" @click.prevent="backToTop">
      <v-tooltip top>
        <i class="material-icons" slot="activator">arrow_upward</i>
        <span class="uppercase">BACK TO TOP</span>
      </v-tooltip>
    </a>
  </div>
</template>

<script>
import authenticatedPage from '~/mixins/authenticated-page.js';
import fixture from "~/fixtures/faq";
import ContactUs from "~/components/ContactUs";

export default {
  components: {
    ContactUs,
  },
  mixins: [
    authenticatedPage,
  ],
  methods: {
    handleScroll() {
      if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        document.querySelector('.back-to-top').style.display = 'block';
      } else {
        document.querySelector('.back-to-top').style.display = 'none';
      }
    },
    backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    downloadPDF() {
      window.open('/files/faq/ace-faq.pdf', '_blank');
    },
    clearPanel(panel) {
      this[panel] = []
    },
  },
  data() {
    return {
      gettingStartedPanel: [],
      gettingStarted: [],
      acePanel: [],
      giftPanel: [],
      technicalPanel: [],
      faqsPanel: [],
      technicalFaqsPanel: [],
      giftFaqsPanel: [],
    };
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    sortedGettingStarted() {
      return fixture.gettingStarted;
    },
    sortedAceFaq() {
      return fixture.aceFaq;
    },
    sortedTechnicalFaq() {
      return fixture.technicalFaq;
    },
    sortedGiftFaq() {
      return fixture.giftFaq;
    },
  },
  mounted() {
    if (this.$route.hash) {
      this.$vuetify.goTo(this.$route.hash, {
        duration: 300,
      })
    }
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/vue/pages/faq.scss";
</style>
