function setLoginTokenInLocalStorage(token: string) {
  localStorage.setItem('logintoken', token)
}

function getLoginTokenFromLocalStorage(): string | null {
  return localStorage.getItem('logintoken')
}

function removeLoginTokenInLocalStorage(): void {
  localStorage.removeItem('logintoken')
}

export {
  setLoginTokenInLocalStorage,
  getLoginTokenFromLocalStorage,
  removeLoginTokenInLocalStorage
}