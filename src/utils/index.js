const TOKEN_KEY = 'token'

export const loginHelper = (value) => {
  localStorage.setItem(TOKEN_KEY, value)
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true
  }

  return false
}
