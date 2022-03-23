function setLoginToken(token: string) {
  localStorage.setItem('logintoken', token)
}

function getLoginToken() {
  return localStorage.getItem('logintoken')
}

function removeLoginToken() {
  return localStorage.removeItem('logintoken')
}

export {
  setLoginToken,
  getLoginToken,
  removeLoginToken
}