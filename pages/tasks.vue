<template>
  <div>
    <v-card v-show="displayCard">
      <v-toolbar>
        <v-toolbar-title>Tasques</v-toolbar-title>
        <div class="ml-auto">
          <v-btn v-show="displayList" class="mx-1" @click="changeStatus(false)">
            <v-icon>mdi-window-minimize</v-icon>
          </v-btn>
          <v-btn v-show="!displayList" class="mx-1" @click="changeStatus(true)">
            <v-icon>mdi-window-maximize</v-icon>
          </v-btn>
          <v-btn class="mx-1" @click="closeCard(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-toolbar>
      <v-toolbar v-show="displayList">
        <v-form class="d-flex align-baseline" @submit.prevent="">
          <v-text-field
            v-model="newTask"
            required
            autofocus
            autocomplete="off"
            placeholder="Què cal fer?"
            qa="input_text_new_task"
            @keyup.enter="addTask()"
          ></v-text-field>
          <v-btn
            class="ml-4"
            color="primary"
            qa="add-todo-submit-button"
            @click="addTask()"
            >Afegir</v-btn
          >
        </v-form>
      </v-toolbar>
      <v-list v-show="displayList" qa="tasks-list">
        <!-- FOR dins d'un div per a que es pugui repetir el divider -->
        <div v-for="task in filteredTasks" :key="task.id">
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="task.completed"
                qa="task-list-item-toggle"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>
              <span
                v-if="taskEdited.id != task.id"
                :class="{ completed: task.completed === true }"
                qa="task-list-item"
                @dblclick="showTask(task)"
              >
                {{ task.title }}
              </span>
              <v-text-field
                v-if="taskEdited.id == task.id"
                v-model="taskEdited.title"
                autocomplete="off"
                autofocus
                qa="input_edit_task"
                @keyup.enter="editTask()"
                @keyup.esc="cancelEdit()"
              ></v-text-field>
            </v-list-item-title>
            <v-list-item-action>
              <v-btn
                icon
                color="secondary"
                qa="task-list-item-edit-btn"
                @click="showTask(task)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn
                icon
                color="error"
                qa="task-list-item-delete-btn"
                @click="initDeleteDialog(task)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
      <v-toolbar v-show="displayList">
        <v-toolbar-title qa="footer_title">{{ pendentTasks }}</v-toolbar-title>
        <div class="ml-auto">
          <v-btn
            href="#/all"
            class="mx-3 filter-button"
            qa="filter_all"
            :class="{ selected: visibility === 'all' }"
            >Totes</v-btn
          >
          <v-btn
            href="#/active"
            class="mx-3 filter-button"
            qa="filter_pending"
            :class="{ selected: visibility === 'active' }"
            >Actives</v-btn
          >
          <v-btn
            href="#/completed"
            class="mx-3 filter-button"
            qa="filter_completed"
            :class="{ selected: visibility === 'completed' }"
            >Completades</v-btn
          >
        </div>
      </v-toolbar>
    </v-card>
    <v-snackbar v-model="showSnackbar" qa="flash_message">
      {{ snackBarMessage }}
    </v-snackbar>
    <v-dialog v-model="showDeleteDialog" max-width="480">
      <v-card>
        <v-card-title> Eliminar tasca </v-card-title>
        <v-card-text
          >Estàs a punt d'esborrar una tasca. Vols continuar?</v-card-text
        >
        <v-card-actions>
          <v-spacer />
          <v-btn text qa="cancel_button" @click="showDeleteDialog = false"
            >Cancel·lar</v-btn
          >
          <v-btn color="error" qa="delete_button" @click="deleteTask(task)"
            >Eliminar</v-btn
          >
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import {
  // tasksStorage,
  // tasksStorageApi,
  listTasksDisplay,
  filters,
} from '../repositori/tasks'

export default {
  name: 'Tasks',
  async asyncData({ $axios, $config }) {
    $axios.setToken($config.apiToken, 'Bearer')
    console.log($config)
    const response = await $axios.$get($config.apiURL + 'user/tasks')
    return {
      tasks: response,
    }
  },
  data() {
    return {
      active: true,
      tasks: [],
      newTask: '',
      taskEdited: {},
      editTitle: '',
      taskToDelete: null,
      showDeleteDialog: false,
      showSnackbar: false,
      snackBarMessage: '',
      visibility: 'all',
      displayList: true,
      displayCard: true,
    }
  },
  computed: {
    filteredTasks() {
      return filters[this.visibility](this.tasks)
    },
    pendentTasks() {
      const count = this.tasks.filter((task) => !task.completed).length
      if (count === 0) {
        return 'Enhorabona, no tens tasques pendents!'
      } else if (count === 1) {
        return 'Tens ' + count + ' tasca pendent'
      } else {
        return 'Tens ' + count + ' tasques pendents'
      }
    },
  },
  watch: {
    tasks: {
      handler(tasks) {
        // tasksStorage.save(tasks)
        this.$axios.setToken(this.$config.apiToken, 'Bearer')
        this.$axios.$put(this.$config.apiURL + 'user/tasks', {
          tasks,
        })
      },
      deep: true,
    },
    displayList: {
      handler(status) {
        listTasksDisplay.save(status)
      },
      deep: true,
    },
  },

  /* Al carregar la pàgina executar la funció per a comptar les tasques pendents
    i carregar totes les tasques a l'array Filtered */

  mounted() {
    // this.tasks = tasksStorage.fetch()
    this.displayList = listTasksDisplay.fetch()
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
  },
  methods: {
    onHashChange() {
      const visibility = window.location.hash.replace(/#\/?/, '')
      if (filters[visibility]) {
        this.visibility = visibility
      } else {
        window.location.hash = ''
        this.visibility = 'all'
      }
    },
    addTask() {
      if (this.newTask !== '') {
        const task = {
          id: uuidv4(),
          title: this.newTask,
          completed: false,
        }
        this.tasks.push(task)
        this.newTask = ''
        this.snackBarMessage = "S'ha afegit la tasca correctament"
        this.showSnackbar = true
      } else {
        this.snackBarMessage = "No s'ha pogut afegir la tasca"
        this.showSnackbar = true
      }
    },
    showTask(task) {
      this.taskEdited = { ...task } // Fer una còpia -> Pas per valor i no per referència
    },
    editTask() {
      if (this.taskEdited.title !== '') {
        const task = this.tasks.find((t) => t.id === this.taskEdited.id)
        task.title = this.taskEdited.title
        this.taskEdited = {}
        this.snackBarMessage = "S'ha editat la tasca correctament"
        this.showSnackbar = true
      } else {
        this.snackBarMessage = "No s'ha pogut editar la tasca"
        this.showSnackbar = true
      }
    },
    cancelEdit() {
      this.editTitle = ''
      this.taskEdited = {}
    },
    initDeleteDialog(task) {
      this.showDeleteDialog = true
      this.taskToDelete = task
    },
    deleteTask() {
      this.tasks.splice(
        this.tasks.indexOf(
          this.tasks.find((t) => t.id === this.taskToDelete.id)
        ),
        1
      )
      this.taskToDelete = null
      this.showDeleteDialog = false
      this.snackBarMessage = "S'ha eliminat la tasca correctament"
      this.showSnackbar = true
    },
    changeStatus(status) {
      this.displayList = status
    },
    closeCard(status) {
      this.displayCard = status
    },
  },
}
</script>

<style>
.completed {
  text-decoration: line-through;
}
.filter-button {
  background-color: #3b8070 !important;
}
.selected {
  background-color: #35495e !important;
}
.minimize {
  display: none;
}
</style>
