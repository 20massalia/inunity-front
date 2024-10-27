import { StoryFn } from "@storybook/react";
import { MenuProvider } from "./contexts/MenuContext";



export const WithMenuProvider = (Story: StoryFn) => (
    <MenuProvider>
      <Story />
    </MenuProvider>
  );  