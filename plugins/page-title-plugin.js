export default ({ store }, inject) => {
  inject('pageTitle', (title) => store.dispatch('ui/setTitle', title))

}
