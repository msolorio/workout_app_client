import { useEffect } from 'react';
import { useAppDispatch } from '../redux/app/hooks'
import { storeLoginTokenInRdx, removeLoginTokenInRdx } from '../redux/app/features/auth/authSlice';
import { getLoginTokenFromLocalStorage } from '../utils/authUtils';

function useSyncToken(): void {
  const dispatch = useAppDispatch()

  // Temporary fix for this react bug - https://stackoverflow.com/questions/70368760/react-uncaught-referenceerror-process-is-not-defined/70791920#70791920
  useEffect(() => {    
    // @ts-ignore
    window.process = { ...window.process, }
  })

  const token = getLoginTokenFromLocalStorage()

  token
  ? dispatch(storeLoginTokenInRdx(token))
  : dispatch(removeLoginTokenInRdx())
}

export default useSyncToken
