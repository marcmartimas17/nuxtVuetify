<template>
  <div>
    <v-card v-show="displayCard">
      <v-toolbar>
        <v-toolbar-title>Comentaris</v-toolbar-title>
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
            v-model="newName"
            qa="input_text_new_name"
            class="mr-3"
            required
            autofocus
            autocomplete="off"
            placeholder="Nom del comentari"
            @keyup.enter="addComment()"
          ></v-text-field>
          <v-text-field
            v-model="newBody"
            qa="input_text_new_body"
            required
            autocomplete="off"
            placeholder="Cos del comentari"
            @keyup.enter="addComment()"
          ></v-text-field>
          <v-btn
            class="ml-4"
            color="primary"
            qa="add-comment-submit-button"
            @click="addComment()"
            >Afegir</v-btn
          >
        </v-form>
      </v-toolbar>
      <v-list v-show="displayList" qa="comments-list">
        <!-- FOR dins d'un div per a que es pugui repetir el divider -->
        <div v-for="comment in filteredComments" :key="comment.id">
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="comment.read"
                qa="comment-list-item-toggle"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>
              <span
                v-if="commentEdited.id != comment.id"
                qa="comments-list-item"
                :class="{ read: comment.read === true }"
                @dblclick="initEdit(comment)"
              >
                {{ comment.name }} {{ comment.body }}
              </span>
              <div style="display: flex">
                <v-text-field
                  v-if="commentEdited.id == comment.id"
                  v-model="editName"
                  qa="name_edit_comment"
                  class="input"
                  autocomplete="off"
                  autofocus
                  @keyup.enter="editComment()"
                  @keyup.esc="cancelEdit()"
                ></v-text-field>
                <v-text-field
                  v-if="commentEdited.id == comment.id"
                  v-model="editBody"
                  qa="body_edit_comment"
                  class="input"
                  autocomplete="off"
                  @keyup.enter="editComment()"
                  @keyup.esc="cancelEdit()"
                ></v-text-field>
              </div>
            </v-list-item-title>
            <v-list-item-action>
              <v-btn
                icon
                color="secondary"
                qa="comment-list-item-edit-btn"
                @click="initEdit(comment)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn
                icon
                color="error"
                qa="comment-list-item-delete-btn"
                @click="initDeleteDialog(comment)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
      <v-toolbar v-show="displayList">
        <v-toolbar-title qa="footer_title">{{
          notReadComments
        }}</v-toolbar-title>
        <div class="ml-auto">
          <v-btn
            href="#/all"
            class="mx-3 filter-button"
            qa="filter_all"
            :class="{ selected: visibility === 'all' }"
            >Tots</v-btn
          >

          <v-btn
            href="#/read"
            class="mx-3 filter-button"
            qa="filter_read"
            :class="{ selected: visibility === 'read' }"
            >Llegits</v-btn
          >
          <v-btn
            href="#/noRead"
            class="mx-3 filter-button"
            qa="filter_no_read"
            :class="{ selected: visibility === 'noRead' }"
            >No llegits</v-btn
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
          >Estàs a punt d'esborrar un comentari. Vols continuar?</v-card-text
        >
        <v-card-actions>
          <v-spacer />
          <v-btn text qa="cancel_button" @click="showDeleteDialog = false"
            >Cancel·lar</v-btn
          >
          <v-btn color="error" qa="delete_button" @click="deleteComment()"
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
  commentsStorage,
  filters,
  listCommentsDisplay,
} from '../repositori/comments'

export default {
  name: 'Comments',
  data() {
    return {
      comments: [],
      newName: '',
      newBody: '',
      commentEdited: {},
      editName: '',
      editBody: '',
      showDeleteDialog: false,
      showSnackbar: false,
      snackBarMessage: '',
      commentToDelete: {},
      visibility: 'all',
      displayCard: true,
      displayList: true,
    }
  },
  computed: {
    filteredComments() {
      return filters[this.visibility](this.comments)
    },
    notReadComments() {
      const count = this.comments.filter((comment) => !comment.read).length
      if (count === 0) {
        return 'No tens comentaris sense llegir'
      } else if (count === 1) {
        return 'Tens ' + count + ' comentari sense llegir'
      } else {
        return 'Tens ' + count + ' comentaris sense llegir'
      }
    },
  },
  watch: {
    comments: {
      handler(comments) {
        commentsStorage.save(comments)
      },
      deep: true,
    },
    displayList: {
      handler(status) {
        listCommentsDisplay.save(status)
      },
      deep: true,
    },
  },
  mounted() {
    this.comments = commentsStorage.fetch()
    this.displayList = listCommentsDisplay.fetch()
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
    addComment() {
      if (this.newName !== '' && this.newBody !== '') {
        const comment = {
          id: uuidv4(),
          name: this.newName,
          body: this.newBody,
          read: false,
          user_id: uuidv4(),
        }
        this.comments.push(comment)
        this.newName = ''
        this.newBody = ''
        this.showSnackbar = true
        this.snackBarMessage = 'Comentari afegit correctament'
      } else {
        this.showSnackbar = true
        this.snackBarMessage = 'No es pot afegir el comentari'
      }
    },
    initEdit(comment) {
      this.commentEdited = comment
      this.editName = comment.name
      this.editBody = comment.body
    },
    editComment() {
      if (this.editName !== '' && this.editBody !== '') {
        const comment = this.comments.find(
          (c) => c.id === this.commentEdited.id
        )
        comment.name = this.editName
        comment.body = this.editBody
        this.commentEdited = {}
        this.editName = ''
        this.editBody = ''
        this.showSnackbar = true
        this.snackBarMessage = 'Comentari editat correctament'
      } else {
        this.showSnackbar = true
        this.snackBarMessage = "No s'ha pogut editar el comentari"
      }
    },
    cancelEdit() {
      this.editName = ''
      this.editBody = ''
      this.commentEdited = {}
    },
    initDeleteDialog(comment) {
      this.showDeleteDialog = true
      this.commentToDelete = comment
    },
    deleteComment() {
      this.comments.splice(
        this.comments.indexOf(
          this.comments.find((t) => t.id === this.commentToDelete.id)
        ),
        1
      )
      this.taskToDelete = {}
      this.showDeleteDialog = false
      this.snackBarMessage = "S'ha eliminat el comentari correctament"
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
.read {
  text-decoration: line-through;
}
.filter-button {
  background-color: #3b8070 !important;
}
.selected {
  background-color: #35495e !important;
}
.input {
  width: 50%;
}
</style>
