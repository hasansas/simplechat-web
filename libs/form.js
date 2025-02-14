import HttpRequest from '~/helpers/http_request.js';

const form = {
  validation: function (formRrules) {
    var validateForm = true;
    Object.entries(formRrules).forEach(([formInput, value]) => {
      var input = document.getElementById(formInput);
      var inputLabel =
        input.parentNode.previousElementSibling !== null
          ? input.parentNode.previousElementSibling.innerText
          : "";
      var inputRules = value.split("|");
      inputRules.forEach(v => {
        var arrRules = v.split("|");
        arrRules.forEach(rules => {
          var rule = rules.split(":");
          var ruleName = rule[0];
          var ruleValue = typeof rule[1] !== "undefined" ? rule[1] : null;
          var errorInfo =
            document.getElementById("description-" + formInput) !== null
              ? document.getElementById("description-" + formInput)
              : document.createElement("small");
          errorInfo.setAttribute("id", "description-" + formInput);
          errorInfo.classList.add("text-danger");

          // Required
          if (ruleName === "required") {
            if (input.value === "") {
              errorInfo.innerText = inputLabel + " required";
              input.classList.add("form-error");
              input.parentNode.insertBefore(errorInfo, input.nextSibling);
              validateForm = false;
              return false;
            }
            input.classList.remove("form-error");
            errorInfo.remove();
          }

          // email
          if (ruleName === "email") {
            if (!this.isEmail(input.value)) {
              errorInfo.innerText = "Please enter a valid email address";
              input.classList.add("form-error");
              input.parentNode.insertBefore(errorInfo, input.nextSibling);
              validateForm = false;
              return false;
            }
            input.classList.remove("form-error");
            errorInfo.remove();
          }

          // password
          if (ruleName === "password") {
            if (!this.validPassword(input.value)) {
              errorInfo.innerText = "Your password must be at least 8 characters long and must contain at least \n1 upper case letter, 1 lower case letter & 1 number.";
              input.classList.add("form-error");
              input.parentNode.insertBefore(errorInfo, input.nextSibling);
              validateForm = false;
              return false;
            }
            input.classList.remove("form-error");
            errorInfo.remove();
          }

          // url
          if (ruleName === "url") {
            if (input.value !== "" && !this.isURL(input.value)) {
              errorInfo.innerText = "Please enter a valid URL";
              input.classList.add("form-error");
              input.parentNode.insertBefore(errorInfo, input.nextSibling);
              validateForm = false;
              return false;
            }
            input.classList.remove("form-error");
            errorInfo.remove();
          }
        });
      });
    });
    return validateForm;
  },
  isEmail: function (email) {
    var lastAtPos = email.lastIndexOf('@');
    var lastDotPos = email.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2);
  },
  isNumber: function (evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (
      charCode > 31 &&
      (charCode < 48 || charCode > 57) &&
      charCode !== 46
    ) {
      evt.preventDefault();
    } else {
      return true;
    }
  },
  isURL(str) {
    return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(str);
  },
  validPassword: function (password) {
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/.test(password);
  },
  alert(store, text, dismissCountDown, variant) {
    var alert = {
      text: text,
      dismissCountDown: dismissCountDown,
      variant: variant
    };
    store.commit("form/setAlert", alert);
  },
  upload: function (nuxt, file) {
    const httpRequest = new HttpRequest(nuxt.$axios);

    return new Promise(function (resolve) {
      const _url = '/v1/upload';
      const _body = file;
      httpRequest.post(_url, _body).then(async (res) => {
        resolve(res);
      });
    });
  },
  formResponse: function (nuxt, { message, style }) {
    if (typeof nuxt.$refs.spinner !== 'undefined') {
      const spinner = nuxt.$refs.spinner;
      spinner.classList.add("d-none");
    }
    nuxt.disabledForm = false;
    nuxt.$snotify.create({
      body: message,
      closeOnClick: true,
      pauseOnHover: true,
      config: {
        timeout: 5000,
        showProgressBar: false,
        position: "rightBottom",
        type: style
      }
    });
  }
}

export default form;
