export default {
  async asyncData({ params, error, $axios }) {
    const { data } = await $axios.get("/admin/collection/blockdays");
    const blockedDays = data.blockedDays;
    return {
      isMondayEnabled: blockedDays.isMondayEnabled,
      isTuesdayEnabled: blockedDays.isTuesdayEnabled,
      isThursdayEnabled: blockedDays.isThursdayEnabled,
      isWednesdayEnabled: blockedDays.isWednesdayEnabled,
      isFridayEnabled: blockedDays.isFridayEnabled,
      isSaturdayEnabled: blockedDays.isSaturdayEnabled,
      isSundayEnabled: blockedDays.isSundayEnabled,
      isMondayEnabledx: blockedDays.isMondayEnabled,
      isTuesdayEnabledx: blockedDays.isTuesdayEnabled,
      isThursdayEnabledx: blockedDays.isThursdayEnabled,
      isWednesdayEnabledx: blockedDays.isWednesdayEnabled,
      isFridayEnabledx: blockedDays.isFridayEnabled,
      isSaturdayEnabledx: blockedDays.isSaturdayEnabled,
      isSundayEnabledx: blockedDays.isSundayEnabled,
    }
  },
  methods: {
    allowedDates(date) {
      const day = new Date(date).getDay();
      var daysAllowed = [];
      if (this.test) {
        return day === 3;
      }
      if (this.isMondayEnabled) {
        daysAllowed.push(1);
      }
      if (this.isTuesdayEnabled) {
        daysAllowed.push(2);
      }
      if (this.isWednesdayEnabled) {
        daysAllowed.push(3);
      }
      if (this.isThursdayEnabled) {
        daysAllowed.push(4);
      }
      if (this.isFridayEnabled) {
        daysAllowed.push(5);
      }
      if (this.isSaturdayEnabled) {
        daysAllowed.push(6);
      }
      if (this.isSundayEnabled) {
        daysAllowed.push(0);
      }
      return daysAllowed.indexOf(day) !== -1;
    },
    submit() {
      const promises = [];

      for (let i = 0, limit = this.dates.length; i < limit; ++i) {
        const payload = {
          date: this.dates[i]
        };

        promises.push(this.$axios.post(this.$queryBuilder('/admin/collection/blocks', payload)));
      }

      Promise.all(promises)
             .then((res) => {
                res.forEach((item) => {
                  this.blockedDates.push(item.data);
                })
                this.dates = [];
             })
             .catch((err) => {
                reject(err.response);
             });
    },
    unblockDates() {
      const promises = [];

      let toDeleteIdx = [];

      for (let i = 0, limit = this.dates.length; i < limit; ++i) {
        const date = this.dates[i];
        const idx = this.blockedDates.findIndex(d => d.date === date);

        // Skip for non existent dates
        if (idx === -1) continue;

        toDeleteIdx.push(idx);

        const collection_block_id = this.blockedDates[idx].id;

        promises.push(this.$axios.delete(`/admin/collection/blocks/${collection_block_id}`));
      }

      Promise.all(promises)
             .then((res) => {
                toDeleteIdx.forEach((idx) => {
                  this.blockedDates.splice(idx, 1);
                })
                this.dates = [];
             })
             .catch((err) => {
                reject(err.response);
             });
    },
    fetchBlockDates() {
      if (this.currentMonth === null) {
        return;
      }

      this.isLoading = true;

      return new Promise((resolve, reject) => {
        let payload = {
          paginate: 0,
          date: this.currentMonth,
        };

        this.$axios
            .get(this.$queryBuilder('/admin/collection/blocks', payload))
            .then((res) => {
              this.blockedDates = res.data;
            })
            .catch((err) => {
              reject(err.response);
            })
            .finally(() => {
              this.isLoading = false;
            });
      });
    },
    events(evt) {
      const month = evt.substring(0,7);

      if (this.currentMonth === null) {
        this.currentMonth = evt.substring(0,7);
      }
      if (this.currentMonth !== month) {
        this.currentMonth = month;
      }

      const idx = this.blockedDatesMap.indexOf(evt);

      return idx !== -1;
    },
    updateBlockDays()
    {
        this.updateBlockDaysLoading = true;
        this.$axios
            .post('/admin/collection/blockdays', {
              isMondayEnabled: this.isMondayEnabledx,
              isTuesdayEnabled: this.isTuesdayEnabledx,
              isWednesdayEnabled: this.isWednesdayEnabledx,
              isThursdayEnabled: this.isThursdayEnabledx,
              isFridayEnabled: this.isFridayEnabledx,
              isSaturdayEnabled: this.isSaturdayEnabledx,
              isSundayEnabled: this.isSundayEnabledx
            })
            .then((res) => {
              this.isMondayEnabled = this.isMondayEnabledx;
              this.isTuesdayEnabled = this.isTuesdayEnabledx;
              this.isWednesdayEnabled = this.isWednesdayEnabledx;
              this.isThursdayEnabled = this.isThursdayEnabledx;
              this.isFridayEnabled = this.isFridayEnabledx;
              this.isSaturdayEnabled = this.isSaturdayEnabledx;
              this.isSundayEnabled = this.isSundayEnabledx;
            })
            .catch((err) => {
              reject(err.response);
            })
            .finally(() => {
              this.updateBlockDaysLoading = false;
            });
    }
  },
  data() {
    return {
      dateValue: new Date().toISOString().substr(0, 10),
      dates: [],
      test: false,
      blockedDates: [],
      currentMonth: null,
      isLoading: false,
      updateBlockDaysLoading: false,
      isMondayEnabledx: false,
      isTuesdayEnabledx: false,
      isThursdayEnabledx: false,
      isWednesdayEnabledx: false,
      isFridayEnabledx: false,
      isSaturdayEnabledx: false,
      isSundayEnabledx: false
    };
  },
  computed: {
    blockedDatesMap() {
      return this.blockedDates.map(d => { return d.date; });
    },
  },
  watch: {
    currentMonth() {
      this.fetchBlockDates();
    },
  },
}
