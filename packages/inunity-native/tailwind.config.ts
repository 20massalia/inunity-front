import baseConfig from 'ui/tailwind.config';
import type { Config } from "tailwindcss";

const config: Config = {
  ...baseConfig,
  presets: [require("nativewind/preset")],
};
export default config;
