export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.getters['users/authUser'].authenticated) {
    return redirect('/')
  }
}
