<template>
  <nav id="navbar" class="navbar-admin">
    <div
      class="desktop-menu container container--flex container--flex-align-item-center no-padding"
      style="width: 95vw !important"
    >
      <ul class="list list--inline flex-1 no-padding">
        <li v-for="(i, idx) in navAdminItems" :key="idx">
          <v-menu offset-y :open-on-hover="true" v-if="i.children.length > 0">
            <nuxt-link
              :to="{ name: i.name }"
              :class="{
                'nuxt-link-active': isChildActive(i.name),
              }"
              slot="activator"
              >{{ i.title }}</nuxt-link
            >
            <v-list>
              <v-list-tile
                class="clickable"
                v-for="(item, index) in i.children"
                :key="index"
              >
                <nuxt-link
                  class="light-green--text lighten-1"
                  :to="{ name: item.name }"
                  >{{ item.title }}</nuxt-link
                >
              </v-list-tile>
            </v-list>
          </v-menu>
          <nuxt-link :to="{ name: i.name }" v-else>{{ i.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import NavbarMixin from "~/mixins/navbar";

export default {
  mixins: [NavbarMixin],
  data() {
    return {
      navAdminItems: [
        {
          name: "a-user-management-user-profiles",
          title: "User Management",
          icon: "",
          children: [
            {
              name: "a-user-management-user-profiles",
              title: "User Profiles",
              icon: "",
            },
            {
              name: "a-user-management-user-access",
              title: "User Access",
              icon: "",
            },
            {
              name: "a-user-management-user-tokens-recognise",
              title: "Recognise Others Token",
              icon: "",
            },
            {
              name: "a-user-management-user-tokens-rewards",
              title: "My Rewards Token",
              icon: "",
            },

            {
              name: "a-user-management-user-levels",
              title: "User Levels",
              icon: "",
            },
            {
              name: "a-user-management-departments",
              title: "Departments",
              icon: "",
            },
            {
              name: "a-user-management-user-badge-promotion-token",
              title: "Badge Promotion Token",
              icon: "",
            },
            {
              name: "a-user-management-mass-token-update",
              title: "Mass Token Update",
              icon: "",
            },
          ],
        },
        {
          name: "a-edm-management-templatebody",
          title: "EDM Management",
          icon: "",
          children: [
            {
              name: "a-edm-management-headeredit",
              icon: "",
              title: "EDM Header",
            },
            // {
            //   name: "a-edm-management-templates",
            //   icon: "",
            //   title: "EDM Templates",
            // },
            {
              name: "a-edm-management-templatebody",
              icon: "",
              title: "EDM Template Body",
            },
            {
              name: "a-edm-management-sentlog",
              icon: "",
              title: "EDM Sent Logs",
            },

            {
              name: "a-edm-management-footeredit",
              icon: "",
              title: "EDM Footer",
            },
          ],
        },
        {
          name: "a-carousel-management-home",
          title: "Carousel Management",
          icon: "",
          children: [
            {
              name: "a-carousel-management-home",
              icon: "",
              title: "Home Page",
            },
            {
              name: "a-carousel-management-redeem",
              icon: "",
              title: "Redeem Page",
            },
          ],
        },
        {
          name: "a-ace-store-inventory-management",
          title: "ACE e-Store",
          icon: "",
          children: [
            {
              name: "a-ace-store-inventory-management",
              icon: "",
              title: "Inventory Management",
            },
            {
              name: "a-ace-store-block-collection",
              icon: "",
              title: "Block Collection Date",
            },
            {
              name: "a-ace-store-item-category",
              icon: "",
              title: "Item Category",
            },
          ],
        },
        {
          name: "a-transaction-reports-received",
          title: "Transaction Reports",
          icon: "",
          children: [
            {
              name: "a-transaction-reports-received",
              icon: "",
              title: "System-to-User Transaction",
            },
            {
              name: "a-transaction-reports-sent",
              icon: "",
              title: "User-to-User Transaction",
            },
            {
              name: "a-transaction-reports-redeem",
              icon: "",
              title: "ACE e-Store Transaction",
            },
          ],
        },
        {
          name: "a-activity-log",
          title: "Administrator Activity Log",
          icon: "",
          children: [],
        },
        {
          name: "a-cms-faq",
          title: "CMS",
          icon: "",
          children: [
            { name: "a-cms-faq", icon: "", title: "FAQs" },
            { name: "a-cms-faqcategories", icon: "", title: "FAQ Categories" },
            { name: "a-cms-faquploads", icon: "", title: "FAQ Upload" },
            { name: "a-cms-menu", icon: "", title: "Menu Pages" },
          ],
        },
        //  add admin menu here ..
      ],
      navItems: [
        { name: "index", icon: "/img/icons/home-ico.svg", title: "Home" },
        {
          name: "profile",
          icon: "/img/icons/person-ico.svg",
          title: "Profile",
        },
        { name: "redeem", icon: "/img/icons/gift-ico.svg", title: "Redeem" },
      ],
    };
  },
  methods: {
    isChildActive(parent) {
      const currentRoute = this.$route.name;
      const parentRoute = this.navAdminItems.find((i) => i.name === parent);

      if (parentRoute.children) {
        const childRoute = parentRoute.children.findIndex(
          (c) => c.name === currentRoute
        );
        return childRoute >= 0;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/vue/components/navbar.scss";
</style>
