import {
    InterstitialAd,
    AdEventType,
} from 'react-native-google-mobile-ads';

class InterstitialService {

    private ad: InterstitialAd | null = null;
    private adUnitId = '';

    private loaded = false;
    private isLoading = false;
    private isShowing = false;

    private retryTimeout: ReturnType<typeof setTimeout> | null = null;
    private retryAttempt = 0;

    private unsubscribe: (() => void)[] = [];

    initialize(adUnitId: string) {

        if (this.ad && this.adUnitId === adUnitId) return;

        this.adUnitId = adUnitId;
        this.loadAd();
    }

    private loadAd() {

        if (!this.adUnitId) return;
        if (this.isLoading || this.loaded || this.isShowing) return;

        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
            this.retryTimeout = null;
        }

        this.isLoading = true;

        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        this.unsubscribe = [];

        this.ad = InterstitialAd.createForAdRequest(this.adUnitId);

        this.unsubscribe.push(
            this.ad.addAdEventListener(AdEventType.LOADED, () => {
                this.loaded = true;
                this.isLoading = false;
                this.retryAttempt = 0;
            })
        );

        this.unsubscribe.push(
            this.ad.addAdEventListener(AdEventType.OPENED, () => {
                this.loaded = false;
                this.isShowing = true;
            })

        );

        this.unsubscribe.push(
            this.ad.addAdEventListener(AdEventType.CLOSED, () => {

                this.loaded = false;
                this.isShowing = false;

                this.unsubscribe.forEach(unsubscribe => unsubscribe());
                this.unsubscribe = [];

                this.loadAd();
            })
        );

        this.unsubscribe.push(
            this.ad.addAdEventListener(AdEventType.ERROR, (error) => {
                console.warn("Interstitial error:", error);

                this.loaded = false;
                this.isLoading = false;
                this.isShowing = false;

                this.unsubscribe.forEach(unsubscribe => unsubscribe());
                this.unsubscribe = [];

                this.scheduleRetry();
            })
        );

        this.ad.load();
    }

    private scheduleRetry() {

        if (this.retryTimeout) return;

        const delay = Math.min(
            15000 * Math.pow(2, this.retryAttempt),
            120000
        );

        this.retryAttempt++;

        this.retryTimeout = setTimeout(() => {
            this.retryTimeout = null;
            this.loadAd();
        }, delay);
    }

    async show(): Promise<boolean> {
        if (!this.ad || !this.loaded || this.isShowing) {
            this.loadAd();
            return false;
        }

        try {
            await this.ad.show();
            return true;
        } catch (error) {

            console.warn("Error showing interstitial:", error);

            this.loaded = false;
            this.isLoading = false;
            this.isShowing = false;
            this.scheduleRetry();

            return false;
        }
    }

    isLoaded(): boolean {
        return this.loaded && (this.ad?.loaded ?? false) && !this.isShowing;
    }

}

export const interstitialService = new InterstitialService();