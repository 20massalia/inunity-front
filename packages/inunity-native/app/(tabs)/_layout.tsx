import React, { createContext, useContext, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { WebViewProvider, useWebView } from '../../components/useWebView'

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const webView = useWebView();
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        const url = route.params?.pathname;
        const isFocused = url === webView.url;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // 여기서 라우팅 대신 원하는 동작을 수행합니다
            console.log(`Tab ${label} pressed`);

            if (url)
              webView.setUrl(url)
            // 예: 특정 함수 호출 또는 상태 변경
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', padding: 16 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};




export default function TabLayout() {
  return (
    <WebViewProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false }} initialParams={{ pathname: '/' }} />
        <Tabs.Screen name="board" options={{ title: 'Board' }} initialParams={{ pathname: '/board' }} />
        {/* <Tabs.Screen name="board" options={{ title: 'Settings' }} /> */}
      </Tabs>
    </WebViewProvider>
  );
}