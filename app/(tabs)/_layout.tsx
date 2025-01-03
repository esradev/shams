import { Tabs, Stack } from "expo-router";

import TabBar from "@/components/TabBar";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <AntDesign name="search1" size={20} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <AntDesign name="home" size={20} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, size }) => <AntDesign name="setting" size={20} color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}
