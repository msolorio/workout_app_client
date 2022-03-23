function setLoginTokenInLocalStorage(token: string) {
  localStorage.setItem('logintoken', token)
}

function getLoginTokenFromLocalStorage() {
  return localStorage.getItem('logintoken')
}

function removeLoginTokenInLocalStorage() {
  return localStorage.removeItem('logintoken')
}

export {
  setLoginTokenInLocalStorage,
  getLoginTokenFromLocalStorage,
  removeLoginTokenInLocalStorage
}