export default {
  methods: {
    formatDate(date, format = 'DD MMM YYYY') {
      if (date) {
        return this.$moment(date).format(format);
      }
      return '';
    },
    resetDateSelection() {
      this.dateFrom = '';
      this.dateTo = '';
      this.dateFromFormatted = '';
      this.dateToFormatted = '';
    },
  },
  watch: {
    dateTo(val) {
      this.dateToFormatted = this.formatDate(this.dateTo);
    },
    dateFrom(val) {
      this.dateFromFormatted = this.formatDate(this.dateFrom);
    },
  },
  computed: {
    hasDateSelected() {
      return this.dateFrom.length > 0 || this.dateTo.length > 0;
    },
  },
  data() {
    return {
      dateFrom: '',
      dateFromFormatted: '',
      dateTo: '',
      dateToFormatted: '',
      menuFrom: false,
      menuTo: false,
    };
  },
};
