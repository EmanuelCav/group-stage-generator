import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'

export const useConnection = () => {

  const [isConnected, setIsConnected] = useState<boolean>(true)

  useEffect(() => {

    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected ?? true)
    })

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected)
    })

    return unsubscribe
  }, [])

  return isConnected
}