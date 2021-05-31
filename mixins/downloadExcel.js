const fileDownload = require('js-file-download');

export default {
  methods: {
    downloadExcel() {
      if (this.isDownloading) return;

      this.isDownloading = true;
      this.$axios
          .get(`${this.currentDownloadCSVURL}&download=1`, { responseType: 'blob' })
          .then((res) => {
             fileDownload(res.data, 'reports.xlsx');
          })
          .catch((err) => {
            this.$toast.error(err.response.data.message);
          })
          .finally(() => {
            this.isDownloading = false;
          });
    },
  },
  data() {
    return {
      currentDownloadCSVURL: '',
      isDownloading: false,
    };
  },
};
