import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-paper';

import { createStyles } from '@/styles/create.styles';

import { LimitTeamsPropsType } from '@/types/create.types';

const LimitToast = ({ router, colors, title, t }: LimitTeamsPropsType) => {

    return (
        <View style={createStyles.warningTeams}>
            <View style={createStyles.contentWarningTeams}>
                <Icon source="alert-circle" size={32} color="#F57F17" />
                <Text
                    variant="bodyMedium"
                    style={{ flex: 1, color: '#5D4037' }}
                >
                    {title}
                </Text>
            </View>

            <Button
                mode="contained"
                buttonColor={colors.primary}
                textColor="#FFF"
                onPress={() => router.navigate("/tent")}
                icon="crown"
            >
                {t("teams_limit_button")}
            </Button>
        </View>
    );
};

export default LimitToast