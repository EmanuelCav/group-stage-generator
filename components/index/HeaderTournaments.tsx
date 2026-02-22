import { Appbar, useTheme } from "react-native-paper";
import i18n from '@/i18n';

import { HeaderTournamentsPropsType } from "@/types/index.types";

const HeaderTournaments = ({ router }: HeaderTournamentsPropsType) => {

    const { colors } = useTheme()

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.Content title={i18n.t("groupstages")} color="#ffffff" />
            <Appbar.Action icon="devices" color="#ffffff"
                onPress={() => router.navigate("/settings")} />
        </Appbar.Header>
    );
};

export default HeaderTournaments;
