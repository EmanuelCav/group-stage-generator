import { FAB } from "react-native-paper";
import { View } from "react-native";

import { AddButtonPropsType } from "@/types/create.types";

import { generalStyles } from "@/styles/general.styles";

const AddButton = ({ handleAdd, colors }: AddButtonPropsType) => {
  return (
    <View style={generalStyles.addButtonContain}>
      <FAB
        icon="plus"
        size="medium"
        color="#ffffff"
        onPress={handleAdd}
        style={{
          backgroundColor: colors.primary,
        }}
      />
    </View>
  );
};

export default AddButton;
