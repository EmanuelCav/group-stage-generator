import { FAB } from "react-native-paper";
import { Link } from "expo-router";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { generalStyles } from "@/styles/general.styles";

const SettingsFAB = ({ colors }: { colors: MD3Colors }) => {
  return (
    <Link href="/config" style={generalStyles.settingsFABContain}>
      <FAB
        icon="cog"
        size="medium"
        color="#ffffff"
        style={{
          backgroundColor: colors.primary,
        }}
      />
    </Link>
  );
};

export default SettingsFAB;
