<template>
  <div id="achievement-summary">
    <span>Your achievement badges:</span>

    <div class="container--flex achievement-summary-content">
      <div class="p-lg-vertical container--flex container--flex-wrap flex-2 p-0-horizontal"
           style="position: relative;">
        <div class="help-btn">
          <v-dialog v-model="badgeDialog" width="60%">
            <div class="help" slot="activator">
              <img class="responsive-img" src="~assets/img/icons/question-mark.png" alt="help" />
            </div>
            <div id="nomination-modal">
              <v-card>
                <v-card-title class="pa-0">
                  <div class="cancel clickable" @click="badgeDialog=false">
                    <img class="responsive-img" src="~assets/img/icons/close.png" />
                  </div>
                </v-card-title>

                <v-card-text>
                  <div class="container--flex container--flex-wrap container--flex-justify-center">
                    <div class="badge mt-3" v-for="(b, idx) in badges" :key="idx">
                      <div class="badge-img">
                        <img class="responsive-img" :src="b.img" />
                      </div>
                      <p class="mb-0"><strong v-html="b.title_html" /></p>
                      <p>{{ b.description }}</p>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-dialog>
        </div>
        <div class="badge" v-for="(b, i) in userAchievements" :key="i">
          <img v-if="b.count > 0" :src="b.badge.img" :alt="b.badge.title" />
          <img v-else :src="b.badge.img_alt" :alt="b.badge.title" />
          <br>
          <p v-bind:style="{ color: b.count > 0 ? '#000000' : '#eaeaea' }"
             v-html="b.badge.title_html"></p>
          <div class="badge-count" v-if="b.count > 0">x{{ b.count }}</div>
        </div>
      </div>
      <div class="flex-1 prospect-help">
        <v-dialog v-model="dialog" width="80%">
          <div class="help" slot="activator">
            <img class="responsive-img" src="~assets/img/icons/question-mark.png" alt="help" />
          </div>
          <div id="prospect-modal">
            <v-card>
              <v-card-title>
                <div class="cancel clickable" @click="dialog = false">
                  <img class="responsive-img" src="~assets/img/icons/close.png" />
                </div>
              </v-card-title>

              <v-card-text>
                <div class="ranking-tiers container--flex">
                  <div class="tier flex-1 center" v-for="(rt, i) in rankingTiers" :key="i">
                    <img class="mb-4" :src="rt.badge_img" :alt="rt.title" width="150" />
                    <p class="title mb-2">{{ rt.title }}</p>
                    <span v-html="displayRange(rt.prospect.min, rt.prospect.max)">
                    </span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-dialog>

        <div class="prospect-img">
          <img class="responsive-img"
               :src="currentProspect.img"
               :alt="currentProspect.name"
               v-if="currentProspect !== null" />
        </div>
        <p class="prospect-text center" style="fon">
          <strong>{{ currentProspect ? currentProspect.name : '' }}</strong>
        </p>
        <p class="prospect-text center" style="font-size: 14px;">
          <strong>You have collected a total of {{ badgeReceiveCount }} badges!</strong>
        </p>
        <p class="center" style="color: #858585; font-size: 14px;" v-if="nextAchievement.tier !== null">
          <strong>
            Collect {{ $pluralize('more badge', nextAchievement.remaining) }} to unlock "{{ (nextAchievement.tier) ? nextAchievement.tier.name : '' }}" as your Personal Growth Achievement!
          </strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      badgeDialog: false,
    };
  },
  methods: {
    displayRange(min, max) {
      return max > 0 ? `${min} &mdash; ${max} badges` : ` > ${min - 1} badges`;
    },
  },
  computed: {
    ...mapGetters({
      prospects: 'ranking/GET_PROSPECTS',
      userBadges: 'profile/GET_BADGES',
      user: 'profile/GET_USER_PROFILE',
      tiers: 'ranking/GET_TIERS',
      badges: 'badges/GET',
    }),
    rankingTiers() {
      return this.tiers
                 .map(t => {
                   return {
                     title: t.name,
                     badge_img: t.img,
                     prospect: this.prospects
                                   .filter(p => p.tier_id === t.id)
                                   .reduce((acc, cur) => cur, null),
                   };
                 });
    },
    userAchievements() {
      return this.badges
                 .map(b => {
                   return {
                     badge: b,
                     count: this.userBadges
                                .filter(ub => ub.badge_id === b.id)
                                .map(ub => ub['count(id)'])
                                .reduce((acc, cur) => cur, 0),
                   };
                 });
    },
    badgeReceiveCount() {
      return this.userAchievements
                 .map(ub => ub.count)
                 .reduce((acc, cur) => acc + cur, 0);
    },
    currentProspect() {
      return this.prospects
                 .filter(p => this.badgeReceiveCount >= p.min)
                 .map(p => {
                    return this.tiers
                               .filter(t => t.id === p.tier_id)
                               .reduce((acc, cur) => cur, null);
                 })
                 .reduce((acc, cur) => cur, null);
    },
    nextAchievement() {
      const next = this.prospects
                       .find(p => p.min - this.badgeReceiveCount > 0);

      return {
        remaining: (next) ? next.min - this.badgeReceiveCount : 0,
        prospect: (next) ? next : { title: '' },
        tier: (next) ? this.tiers.find(t => t.id === next.tier_id) : null,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/vue/components/achievement-summary.scss";
</style>
