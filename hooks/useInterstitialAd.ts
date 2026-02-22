import { useEffect, useRef, useState } from "react";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";

export const useInterstitialAd = (adUnitId: string | null) => {

    const adRef = useRef<InterstitialAd | null>(null)
    const mounted = useRef(true)
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {

        if (!adUnitId) return

        const ad = InterstitialAd.createForAdRequest(adUnitId, {
            keywords: ['fashion', 'clothing'],
        })

        adRef.current = ad

        const onLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
            if (mounted.current) setLoaded(true)
        })

        const onClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
            if (mounted.current) {
                setLoaded(false)
                ad.load()
            }
        })

        ad.load()

        return () => {
            mounted.current = false
            onLoaded()
            onClosed()
        }

    }, [adUnitId])

    return {
        interstitial: adRef.current,
        isLoaded: loaded
    }
}