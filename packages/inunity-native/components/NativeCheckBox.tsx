import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import { GestureDetector, TouchableWithoutFeedback } from "react-native-gesture-handler";

export type CheckBoxProps = {
  checked: boolean;
  setChecked: ((updator: boolean) => void) 
};

export default function NativeCheckBox({ checked, setChecked }: CheckBoxProps) {
  return (
    <TouchableWithoutFeedback className="" onPress={() => setChecked(!checked)}
    >
      <View
         className={`w-5 h-5 flex justify-center items-center ${
          checked ? "bg-primary" : "bg-unselected"
        }`}>
      {checked && <FontAwesome5 name="check" color="white" />}
      </View>
    </TouchableWithoutFeedback>
  );
}
