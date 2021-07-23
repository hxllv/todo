<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      v-show="homePage"
      @btn-click="$emit(`toggle-add-task`)"
      :text="showAddTask ? `Hide task form` : `Show task form`"
      :color="showAddTask ? `red` : `green`"
    ></Button>
  </header>
</template>

<script>
import Button from "./Button.vue";

export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "Opala",
    },
    showAddTask: Boolean,
  },
  components: {
    Button,
  },
  computed: {
    homePage() {
      if (this.$route.path === `/`) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
