import { Appbar } from "react-native-paper";

import { HeaderTentPropsType } from "@/types/tent.types";

const HeaderTent = ({ colors, router }: HeaderTentPropsType) => {
  return (
    <Appbar.Header style={{ backgroundColor: colors.primary }}>
      <Appbar.BackAction color="#ffffff" onPress={() => router.back()} />
      <Appbar.Content title="Premium" color="#ffffff" />
    </Appbar.Header>
  )
}

export default HeaderTent