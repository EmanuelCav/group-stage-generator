import { View } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import { generalStyles } from '../../styles/general.styles'

const adUnitId = __DEV__ ? TestIds.BANNER : `${process.env.EXPO_PUBLIC_BANNER}`;

const Banner = () => {
    return (
        <View style={generalStyles.containerBanner}>
            <BannerAd
                key={adUnitId}
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
        </View>
    )
}

export default Banner