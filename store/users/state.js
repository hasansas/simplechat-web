import { AuthModel, UserModel } from './model'

export default () => ({
  authUser: AuthModel().model,
  user: UserModel().model
})
