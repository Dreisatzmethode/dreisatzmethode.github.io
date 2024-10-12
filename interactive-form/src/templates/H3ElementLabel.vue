<template>
  <!-- If label is a component -->
  <h3 v-if="label && isLabelComponent" :class="classes.container" :for="name" :id="id">
    <span :class="classes.wrapper"><component v-if="isLabelComponent" :is="label" /></span>
    <ElementInfo><slot name="info" /></ElementInfo>
    <ElementRequired><slot name="required" /></ElementRequired>
  </h3>

  <!-- If label is HTML -->
  <h3 v-else-if="label" :class="classes.container" :for="name" :id="id">
    <span :class="classes.wrapper" v-html="label"></span>
    <ElementInfo><slot name="info" /></ElementInfo>
    <ElementRequired><slot name="required" /></ElementRequired>
  </h3>

  <!-- If label is a slot -->
  <h3 v-else-if="isSlot" :class="classes.container" :for="name" :id="id">
    <span :class="classes.wrapper"><slot /></span>
    <ElementInfo><slot name="info" /></ElementInfo>
    <ElementRequired><slot name="required" /></ElementRequired>
  </h3>

  <!-- If labels are forced but has no value -->
  <h3 v-else-if="hasLabel" :class="classes.container" :for="name" :id="id" />
</template>

<script>
export default {
  name: "ElementLabel",
  data() {
    return {
      merge: true,
      defaultClasses: {
        container: "vf-label",
        container_sm: "vf-label-sm",
        container_md: "",
        container_lg: "vf-label-lg",
        container_horizontal_sm: "vf-horizontal-label-sm",
        container_horizontal_md: "vf-horizontal-label",
        container_horizontal_lg: "vf-horizontal-label-lg",
        container_vertical_sm: "vf-vertical-label-sm",
        container_vertical_md: "vf-vertical-label",
        container_vertical_lg: "vf-vertical-label-lg",
        wrapper: "",
        $container: (classes, { el$, Size }) => [
          classes.container,
          classes[`container_${Size}`],
          !el$.inline ? el$.columnsClasses.label : null,
          el$.cols.default.label < 12 ? classes[`container_horizontal_${Size}`] : classes[`container_vertical_${Size}`],
          ...(Object.keys(el$.cols).length > 1
            ? (el$.$vueform.config.breakpoints || ["sm", "md", "lg", "xl", "2xl"]).map((breakpoint) => {
                if (!el$.cols[breakpoint]?.label) {
                  return null;
                }

                return el$.cols[breakpoint].label < 12
                  ? classes[`container_horizontal_${Size}`].map((c) => `vf-${breakpoint}:${c}`).join(" ")
                  : classes[`container_vertical_${Size}`].map((c) => `vf-${breakpoint}:${c}`).join(" ");
              })
            : []),
        ],
      },
    };
  },
};
</script>

<style lang="scss"></style>
