<template />

<script>
import Vue from 'vue';
import text from '../src/modules/text/text.vue';
import accordion from '../src/components/accordion/accordion.vue';
import header from '../src/modules/header/header.vue';

Vue.component("textComponent", text);
Vue.component("accordionComponent", accordion);
Vue.component("headerComponent", header);

export default {
  name: "App"
};
</script>

<style />
