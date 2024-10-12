<template>
  <!-- If label is a component -->
  <h4 v-if="label && isLabelComponent" :class="classes.container" :for="name" :id="id">
    <span :class="classes.wrapper"><component v-if="isLabelComponent" :is="label" /></span>
    <ElementInfo><slot name="info" /></ElementInfo>
    <ElementRequired><slot name="required" /></ElementRequired>
  </h4>

  <!-- If label is HTML -->
  <h4 v-else-if="label" :class="classes.container" :for="name" :id="id">
    <span :class="classes.wrapper" v-html="label"></span>
    <ElementInfo><slot name="info" /></ElementInfo>
    <ElementRequired><slot name="required" /></ElementRequired>
  </h4>

  <!-- If label is a slot -->
  <h4 v-else-if="isSlot" :class="classes.container" :for="name" :id="id">
    <span :class="classes.wrapper"><slot /></span>
    <ElementInfo><slot name="info" /></ElementInfo>
    <ElementRequired><slot name="required" /></ElementRequired>
  </h4>

  <!-- If labels are forced but has no value -->
  <h4 v-else-if="hasLabel" :class="classes.container" :for="name" :id="id" />
</template>

<script>
export default {
  name: "H4ElementLabel",
  data() {
    return {
      merge: true,
      defaultClasses: {
        container: "",
        wrapper: "",
      },
    };
  },
};
</script>

<style lang="scss"></style>
