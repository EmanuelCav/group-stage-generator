import {
    InterstitialAd,
    AdEventType,
} from 'react-native-google-mobile-ads'

class InterstitialService {

    private ad: InterstitialAd | null = null
    private loaded: boolean = false

    initialize(adUnitId: string) {
        if (this.ad) return

        this.ad = InterstitialAd.createForAdRequest(adUnitId)

        this.ad.addAdEventListener(AdEventType.LOADED, () => {
            this.loaded = true
        })

        this.ad.addAdEventListener(AdEventType.CLOSED, () => {
            this.loaded = false
            this.ad?.load()
        })

        this.ad.addAdEventListener(AdEventType.ERROR, () => {
            this.loaded = false
        })

        this.ad.load()
    }

    show() {
        if (this.ad) {
            if (this.ad.loaded || this.loaded) {
                this.ad.show()
            }
        }
    }

    isLoaded() {
        return (this.loaded || this.ad?.loaded)
    }
}

export const interstitialService = new InterstitialService()