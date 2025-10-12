import debounce from './modules/debounce'

const directivesList = {
  debounce,
}

const directives = {
  install: function (app) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  },
}

export default directives
