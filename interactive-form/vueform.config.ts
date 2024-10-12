import de from "@vueform/vueform/locales/de";
import theme from "@vueform/vueform/dist/bootstrap";
import { defineConfig } from "@vueform/vueform";
// @ts-ignore
import PluginMask from "@vueform/plugin-mask";
import H3ElementLabel from "./src/templates/H3ElementLabel.vue";
import H4ElementLabel from "./src/templates/H3ElementLabel.vue";

export default defineConfig({
  theme,
  locales: { de },
  locale: "de",
  classHelpers: true,
  plugins: [PluginMask],
  templates: {
    ElementLabel_H3Label: H3ElementLabel,
    ElementLabel_H4Label: H4ElementLabel,
  },
});
