export default {
  mounted() {
    this.fetch();
  },
  methods: {
    create() {
      this.$router.push(`/admin/model/${this.slug}/create`);
    },
    read(data) {
      this.$router.push({ path: `/admin/model/${this.slug}/${data.id}`, params: { data } });
    },
    update(id) {},
    delete(id) {},
    async fetch() {
      const res = await this.$axios.get(`/admin/${this.slug}`);

      this.data = res.data.data;
    },
  },
  data() {
    return {
      data: [],
      slug: this.$router.history.current.params.slug || '',
      selectedID: this.$router.history.current.params.id || 0,
    };
  },
};
