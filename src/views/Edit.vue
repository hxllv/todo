<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <input v-model="text" :placeholder="task.text" type="text" name="text" />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input v-model="day" :placeholder="task.day" type="text" name="day" />
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input v-model="reminder" type="checkbox" name="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
  <router-link to="/">Go back</router-link>
</template>

<script>
export default {
  name: `Edit`,
  data() {
    return {
      task: {},
      text: ``,
      day: ``,
      reminder: false,
    };
  },
  props: {
    id: String,
  },
  async created() {
    this.task = await this.fetchTask(this.id);
    this.reminder = this.task.reminder;
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const newTask = {
        id: this.id,
        text: this.text ? this.text : this.task.text,
        day: this.day ? this.day : this.task.day,
        reminder: this.reminder,
      };

      const res = await fetch(`api/tasks/${this.id}`, {
        method: `PUT`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      /* const data = await res.json(); */

      if (res.status === 200) {
        alert(`Task edited succesfully!`);
        this.$router.push(`/`);
        return;
      }
      alert(`error on edit`);
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`);
      const data = await res.json();
      return data;
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
