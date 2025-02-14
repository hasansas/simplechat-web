import _ from 'lodash'

const _object = {
  fill: function (source, target) {
    if (typeof target !== 'undefined') {
      return _.keys(source)
        .reduce((a, key) => (
          { ...a, [key]: target[key] ?? source[key] }
        ), {})
    } else return source
  }
}

export default _object
