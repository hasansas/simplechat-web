class AuthModel {
  constructor() {
    this.model = {
      id: '',
      role: '',
      token: '',
      authenticated: false
    };
  }

  fromJson = async (item) => {
    if (typeof item == 'undefined') {
      return this.model;
    }

    let _item = Object.keys(this.model)
      .reduce((a, key) => (
        { ...a, [key]: item[key] ?? this.model[key] }
      ), {});

    return _item;
  }
}

class ImageModel {
  constructor() {
    this.model = {
      name: null,
      url: null
    };
  }

  fromJson = async (item) => {
    if (typeof item == 'undefined') {
      return this.model;
    }

    let _item = Object.keys(this.model)
      .reduce((a, key) => (
        { ...a, [key]: item[key] ?? this.model[key] }
      ), {});

    return _item;
  }
}

class UserInfoModel {
  constructor() {
    this.model = {
      dateOfBirth: null,
      placeOfBirth: null,
      gender: null
    };
  }

  fromJson = async (item) => {
    if (typeof item == 'undefined') {
      return this.model;
    }

    let _item = Object.keys(this.model)
      .reduce((a, key) => (
        { ...a, [key]: item[key] ?? this.model[key] }
      ), {});

    return _item;
  }
}

class UserModel {
  constructor() {
    this.imageModel = new ImageModel();
    this.userInfoModel = new UserInfoModel();
    this.model = {
      id: "",
      name: "",
      email: "",
      phoneNumber: "",
      image: this.imageModel.model,
      usersInfo: this.userInfoModel.model
    };
  }

  fromJson = async (item) => {
    if (typeof item == 'undefined') {
      return this.model;
    }

    let _item = Object.keys(this.model)
      .reduce((a, key) => (
        { ...a, [key]: item[key] ?? this.model[key] }
      ), {});

    _item.image = item.image ? await this.imageModel.fromJson(item.image) : _item.image;
    _item.usersInfo = item.usersInfo ? await this.userInfoModel.fromJson(item.usersInfo) : _item.usersInfo;
    return _item;
  }
}

module.exports = {
  AuthModel: () => new AuthModel(),
  UserModel: () => new UserModel(),
  ImageModel: () => new ImageModel()
};
