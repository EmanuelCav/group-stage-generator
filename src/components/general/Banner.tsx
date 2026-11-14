import { useState } from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import { generalStyles } from '../../styles/general.styles';

const adUnitId = __DEV__ ? TestIds.BANNER : `${process.env.EXPO_PUBLIC_BANNER}`;

const Banner = () => {

    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return <View style={{ height: '6%' }} />;
    }

    return (
        <View style={generalStyles.containerBanner}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.BANNER}
                onAdLoaded={() => {
                    setHasError(false);
                }}
                onAdFailedToLoad={(error) => {
                    console.warn('Error loading Banner:', error);
                    setHasError(true);
                }}
            />
        </View>
    );
};

export default Banner;