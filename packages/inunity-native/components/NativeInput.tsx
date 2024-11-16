import React from "react";
import { TextInput, View } from "react-native";
import {InputProps} from 'ui'

export const NativeInput = React.forwardRef<TextInput, InputProps>((props, ref) => {
  const { value, setValue, leftIcon, rightIcon, placeholder = "Input Placeholder", masked } = props;

  return (
      <View className="p-2 bg-black/5 rounded-2xl justify-start gap-2 flex">
          {leftIcon && <View className="w-6 h-6 relative">{leftIcon}</View>}
          <TextInput
              ref={ref}
              className="text-black/50 bg-transparent text-p-no font-normal focus:outline-none"
              placeholder={placeholder}
              value={value}
              onChangeText={(value) => setValue(value)}
              textContentType={!masked ? 'none' : 'password'}
          />
          {rightIcon && <View className="w-5 h-5 relative">{rightIcon}</View>}
      </View>
  );
});
export default NativeInput;