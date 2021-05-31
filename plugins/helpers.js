/**
 * Generate pluralize form.
 *
 * @param word {String}
 * @param val {Number}
 *
 * return {String}
 */
const pluralize = function (word='', val = 0) {
  return (val > 1) ? `${val} ${word}s` : `${val} ${word}`;
};

/**
 * Generate URL query string.
 *
 * @param url {String}
 * @param queryParams {Object}
 *
 * return {String}
 */
const queryBuilder = function (url='', queryParams={}) {
  let buildURL = url;

  for (const k in queryParams) {
    if (buildURL.indexOf('?') === -1) {
      buildURL = `${buildURL}?${k}=${queryParams[k]}`;
    } else {
      buildURL = `${buildURL}&${k}=${queryParams[k]}`;
    }
  }

  return buildURL;
};

/**
 * Generate FormData based on the given form object.
 *
 * @param form {Object}
 *
 * return {FormData}
 */
const formDataBuilder = function (form={}) {
  let formData = new FormData();

  for (const key in form) {
    formData.append(key, form[key]);
  }

  return formData;
};

/**
 * Reset form data.
 *
 * @param form {Object}
 * @param defaults {Object}
 */
const resetForm = function (form={}, defaults={}) {
  let formData = new FormData();

  for (const key in form) {
    if (defaults.hasOwnProperty(key)) {
      form[key] = defaults[key];
    } else {
      form[key] = '';
    }
  }
};


export default ({ app }, inject) => {
  inject('pluralize', pluralize);
  inject('queryBuilder', queryBuilder);
  inject('formDataBuilder', formDataBuilder);
  inject('resetForm', resetForm);
};
