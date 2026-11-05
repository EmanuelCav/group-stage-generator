import { Appbar, Text, TouchableRipple } from "react-native-paper"
import { View } from "react-native"

import { HeaderGetMatchPropsType } from "@/types/match.types"

const HeaderGetMatch = ({ colors, router, t, hideAndShowUpdateMatch }: HeaderGetMatchPropsType) => {
    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction
                color="#ffffff"
                onPress={() => router.back()}
            />
            <Appbar.Content
                title={t("match_title")}
                color="#ffffff"
            />
             <TouchableRipple
                onPress={() => hideAndShowUpdateMatch(true)}
                borderless
                rippleColor="rgba(255, 255, 255, 0.25)"
                style={{ borderRadius: 8 }}
            >
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    gap: 6
                }}>
                    <Appbar.Action
                        icon="pencil"
                        color="#ffffff"
                        size={20}
                        style={{ margin: 0, width: 24, height: 24 }}
                    />
                    <Text variant="labelLarge" style={{ color: "#ffffff" }}>
                        {t("edit")}
                    </Text>
                </View>
            </TouchableRipple>
        </Appbar.Header>
    )
}

export default HeaderGetMatch