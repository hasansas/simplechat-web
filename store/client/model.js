class ClientModel {
  constructor() {
    this.model = {
      id: '',
      name: '',
      email: '',
      phoneNumber: '',
      image: '',
      address: '',
      serverKey: '',
      clientKey: '',
      sdkKey: ''
    };
  }

  fromJson = async (items) => {
    let config = items
    if (Array.isArray(items)) {
      config = items.reduce(function (arr, elm) {
        arr[elm.name] = elm.value
        return arr
      }, {})
    }

    let _item = Object.keys(this.model)
      .reduce((a, key) => (
        { ...a, [key]: config[key] ?? this.model[key] }
      ), {});

    _item.mail_is_use_system_email = !config.mail_is_use_system_email || config.mail_is_use_system_email === 'false' ? false : true

    return _item;
  }
}

class ClientConfigurationModel {
  constructor() {
    this.model = {
      mail_is_use_system_email: true,
      mail_driver: '',
      mail_host: '',
      mail_port: '',
      mail_username: '',
      mail_password: '',
      mail_from: '',
      mail_from_name: '',
    };
  }

  fromJson = async (items) => {
    let config = items
    if (Array.isArray(items)) {
      config = items.reduce(function (arr, elm) {
        arr[elm.name] = elm.value
        return arr
      }, {})
    }

    let _item = Object.keys(this.model)
      .reduce((a, key) => (
        { ...a, [key]: config[key] ?? this.model[key] }
      ), {});

    _item.mail_is_use_system_email = !config.mail_is_use_system_email || config.mail_is_use_system_email === 'false' ? false : true

    return _item;
  }
}

module.exports = {
  ClientConfigurationModel: () => new ClientConfigurationModel(),
  ClientModel: () => new ClientModel(),
};
