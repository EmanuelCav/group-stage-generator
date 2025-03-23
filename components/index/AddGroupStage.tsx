import { FAB } from "react-native-paper";

import { AddGroupStagePropsType } from "@/types/index.types";

import { generalStyles } from "@/styles/general.styles";
import { Pressable } from "react-native";

const AddGroupStage = ({ colors, handleCreateTournament }: AddGroupStagePropsType) => {
  return (
    <Pressable onPress={handleCreateTournament}
    style={generalStyles.addButtonContain}>
      <FAB
        icon="plus"
        size="medium"
        color="#ffffff"
        style={{
          backgroundColor: colors.primary,
        }}
      />
    </Pressable>
  );
};

export default AddGroupStage;
