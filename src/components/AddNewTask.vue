<template>
    <v-dialog max-width="500px" transition="dialog-transition" v-model="show">
        <template v-slot:activator="{ on }">
          <v-btn icon color="" v-on="on" @click="show = true">
            <v-icon large color="black">mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card color="#eee">
          <v-card-title primary-title> Add new task </v-card-title>
          <v-card-text>
            <v-text-field
              label="Title"
              v-model="taskDetails.title"
            ></v-text-field>
            <v-textarea
              class="mt-n2"
              clearable
              rows="2"
              v-model="taskDetails.description"
              label="Description"
            ></v-textarea>
            <v-dialog
              ref="dialog"
              :return-value.sync="taskDetails.date"
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="mt-n2"
                  v-model="taskDetails.date"
                  label="Picker in dialog"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="taskDetails.date" scrollable>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(taskDetails.date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-card-text>
          <v-divider class="mt-n3"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="addNewTask"> Save </v-btn>
          </v-card-actions>
          <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
            Your profile has been updated
          </v-snackbar>
        </v-card>
      </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import { db } from "@/main";
export default {
    name: 'AddNewTask',
    data() {
        return {
            taskDetails: {
                title: null,
                description: null,
                date: null,
                completed: false,
                edit: false,
            },
            hasSaved: false,
            show: null
        }
    },
    computed: {
        ...mapState({
        user: (state) => state.user.user,
        }),
    },
    methods:{
      async addNewTask() {
            this.show = false
            var userName = this.user.username;
            let index = Date.now()
            await db.ref(`/tasks/${this.user.username}/${index}`).set(this.taskDetails);
            this.hasSaved = true;
            this.taskDetails.title = null;
            this.taskDetails.description = null;
            this.taskDetails.date = null;
            this.$emit('getTasks')
        },
    }
}
</script>