import { useCallback, useEffect, useRef, useState } from 'react'

import { useAppContext } from 'providers/app/modules/context'
import { initializeApis, keepAlive } from 'providers/network/modules/network'
import type { ApiProvider } from 'src/@types/network'

import { NetworkContext } from './modules/context'

export function NetworkProvider({ children }) {
	const [selectedApiProviderState, setSelectedApiProviderState] = useState<ApiProvider>(null)
	const [apiProvidersState, setApiProvidersState] = useState<ApiProvider[]>(null)
	const isMountedRef = useRef<null | boolean>(null)
	const intervalRef = useRef<NodeJS.Timer>(null)
	const { apiProviderConfig } = useAppContext()

	const handleSelectApiProvider = useCallback(
		(apiProvider: ApiProvider) => {
			if (apiProvider) {
				setSelectedApiProviderState(apiProvider)
			}
		},
		[setSelectedApiProviderState],
	)

	useEffect(() => {
		isMountedRef.current = true

		if (apiProviderConfig) {
			// Create and connect to Api
			initializeApis([apiProviderConfig]).then((providers: ApiProvider[]) => {
				if (isMountedRef.current && providers.length) {
					setApiProvidersState(providers)
					setSelectedApiProviderState(providers[0])
					if (!intervalRef.current) {
						intervalRef.current = setInterval(keepAlive, 30000, providers)
					}
				}
			})
		}

		return () => {
			isMountedRef.current = false
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [apiProviderConfig])

	return (
		<NetworkContext.Provider
			value={{
				selectedApiProvider: selectedApiProviderState,
				apiProviders: apiProvidersState,
				selectApiProvider: handleSelectApiProvider,
			}}
		>
			{children}
		</NetworkContext.Provider>
	)
}
