import { FAB } from "react-native-paper";
import { View } from "../Themed";

import { generalStyles } from "@/styles/general.styles";

import { SettingsFABPropsType } from "@/types/props.types";

const SettingsFAB = ({ colors, router }: SettingsFABPropsType) => {
  return (
    <View style={generalStyles.settingsFABContain}>
      <FAB
        icon="cog"
        size="medium"
        color="#ffffff"
        onPress={() => router.replace("/config")}
        style={{
          backgroundColor: colors.primary,
        }}
      />
    </View>
  );
};

export default SettingsFAB;
