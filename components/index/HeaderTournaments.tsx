import { Appbar, useTheme } from "react-native-paper";

import { HeaderTournamentsPropsType } from "@/types/index.types";

const HeaderTournaments = ({ router, t }: HeaderTournamentsPropsType) => {

    const { colors } = useTheme()

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.Content title={t("groupstages")} color="#ffffff" />
            <Appbar.Action icon="devices" color="#ffffff"
                onPress={() => router.navigate("/settings")} />
        </Appbar.Header>
    );
};

export default HeaderTournaments;
