<template>
  <slot :isVisible="isVisible" :toggle="toggle"/>
</template>

<script>
export default {
  name: 'text',
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    toggle() {
      this.isVisible = !this.isVisible;
    }
  }
};
</script>

<style />
