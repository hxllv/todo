<template>
  <AddTask v-if="showAddTask" @add-task="addTask" />

  <Tasks
    @delete-task="deleteTask"
    @toggle-reminder="toggleReminder"
    :tasks="tasks"
  />
</template>

<script>
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";

export default {
  components: {
    Tasks,
    AddTask,
  },
  props: {
    showAddTask: Boolean,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async deleteTask(id) {
      if (confirm(`Are you sure?`)) {
        const res = await fetch(`api/tasks/${id}`, {
          method: `DELETE`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });

        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert(`error on delete`);
      }
    },
    async toggleReminder(task) {
      const res = await fetch(`api/tasks/${task.id}`, {
        method: `PUT`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...task, reminder: !task.reminder }),
      });

      const data = await res.json();

      res.status === 200
        ? (this.tasks = this.tasks.map((taskTemp) => {
            return taskTemp.id === task.id
              ? { ...taskTemp, reminder: data.reminder }
              : taskTemp;
          }))
        : alert(`error on toggle`);
    },
    async addTask(task) {
      const res = await fetch(`api/tasks`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      res.status == 201
        ? (this.tasks = [...this.tasks, data])
        : alert(`error on add`);
    },
    async fetchTasks() {
      const res = await fetch(`api/tasks`);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>
