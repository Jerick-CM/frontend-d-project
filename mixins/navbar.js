import { mapGetters } from 'vuex';

// import TransactionHistoryModal from '~/components/modals/TransactionHistoryModal.vue';
import CartModal from '~/components/modals/CartModal.vue';

export default {
  components: {
    // TransactionHistoryModal,
    CartModal,
  },
  computed: {
    ...mapGetters({
      profile: 'session/GET_PROFILE',
    }),
  },
  methods: {
    getClass(name) {
      switch(name) {
        case 'index':
        case 'Home':
          return { 'index': true };
        case 'admin':
          return { 'admin': true };
        case 'profile':
        case 'Profile':
          return { 'profile': true };
        case 'redeem':
        case 'Redeem':
          return { 'redeem': true };
        case 'faq':
        case 'FAQ':
          return { 'faq': true };
      }
    },
  },
}
