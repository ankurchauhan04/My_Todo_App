<template>
  <!-- demo for git -->
  <v-container>
    <v-app-bar color="orange" flat app fixed>
      <v-toolbar-title class="text-capitalize font-weight-bold">Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>

      <AddNewTask @getTasks="getTasks()"></AddNewTask>
      
        <v-btn icon @click="logout">
            <v-icon medium color="black">mdi-logout</v-icon>
        </v-btn>
      
      
    </v-app-bar>

    <v-main>
      <p class="text-capitalize font-weight-bold display-1 text-center" >{{
        'Hello ' + this.user.firstname
      }}</p>
      <p class="text-center" v-if="taskArray.length == 0">You don't have tasks to do.<br>Create new tasks</p>
      <v-row class="justify-center">
        <v-col cols="12" sm="12" md="4" v-for="(task, index) in taskArray" :key="index">
        <template v-if="task && Object.keys(task).length">
              <v-card color="#eee" v-if='!task.edit'>
                <v-toolbar color="#FFB74D">
                  <v-card-title text-color="white">
                    {{ task.title }}
                  </v-card-title>
                  <v-spacer></v-spacer>
                  

                  <v-btn
                    fab
                    small
                    elevation="5"
                    color="#FFCC80"
                    @click="Edit(index)"
                    v-if="!task.completed && !inEdit"
                  >
                    <v-icon color="">mdi-pencil</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-subtitle>
                  <strong>Description:</strong> {{ task.description }}
                </v-card-subtitle>
                <v-chip
                  color="#FFB74D"
                  text-color="black"
                  class="pa-4 mb-3 ml-5 mt-n3"
                  >{{ task.date }}</v-chip
                >
                <v-divider class="mx-3"></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="success"
                    outlined
                    v-if="!task.completed"
                    @click="completeTask(index)"
                  >
                    <v-icon>mdi-check</v-icon>
                   Mark Achieved
                  </v-btn>
                  <v-btn
                    v-if="task.completed"
                    color="success"
                    @click="completeTask(index)"
                  >
                    <v-icon>mdi-check</v-icon>
                    Achieved
                  </v-btn>
                  <v-btn elevation="5" color="error" @click="deleteTask(index)">
                    <v-icon>mdi-trash-can-outline</v-icon>
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-card color="#eee" v-if="task.edit">
                <v-card-text>
                  <v-text-field
                    class="mt-n4"
                    label="Title"
                    v-model="task.title"
                  ></v-text-field>

                  <v-textarea
                    class="mt-n5"
                    clearable
                    rows="2"
                    v-model="task.description"
                    label="Description"
                  ></v-textarea>

                  <v-dialog
                    ref="modall"
                    :return-value.sync="task.date"
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        class="mt-n5"
                        v-model="task.date"
                        label="Picker in dialog"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="task.date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="templateprimary"
                        @click="qq(index, task.date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-card-text>
                <v-divider class="mt-n3"></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="editTask(index)"> Save </v-btn>
                </v-card-actions>
                <v-snackbar
                  :timeout="2000"
                  absolute
                  bottom
                  left
                >
                  Your profile has been updated
                </v-snackbar>
              </v-card>
            
          
        </template>
        </v-col>
      <!-- </div> -->
      </v-row>
    </v-main>
    <v-card flat>
      <v-card-text>
        <v-speed-dial
          v-model="fab"
          right
          fixed
          bottom
          transition="top"
          direction="top"
        >
          <template v-slot:activator>
            <v-btn class="mr-6" v-model="fab" color="orange" fab>
              <v-icon v-if="fab"> mdi-close </v-icon>
              <v-icon v-else> mdi-delete </v-icon>
            </v-btn>
          </template>

          <v-btn class="mr-3" dark small color="red" @click="clearAll">
            Clear All
          </v-btn>
          <v-btn class="mr-14" dark small color="green" @click="clearCompleted">
            Clear Achieved
          </v-btn>
        </v-speed-dial>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { db } from "@/main";
import AddNewTask from "../components/AddNewTask";
export default {
  components: {
    AddNewTask: AddNewTask,
  },
  data() {
    return {
      edit: false,
      date: null,
      model: null,
      registeredUsers: [],
      item: false,
      inEdit: false,
      fab: false,
      show: true,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.user.user,
      // taskArray: (state) => state.task.taskArray
    }),
    ...mapGetters({
      taskArray: 'task/getTask'
    }),
  },
  created(){
    this.getUserFromDatabase().then( () =>{
    this.getTasks();

    })
  },
  mounted() {
    
    
  },

  methods: {

    logout(){
      this.$store.dispatch('user/logout')
      this.$store.dispatch('task/logout')
      this.$router.push('/login')
    },

    async clearCompleted() {
      for (let task in this.taskArray) {
        if (this.taskArray[task] != null) {
          if (this.taskArray[task].completed == true && this.taskArray) {
            await db.ref(`/tasks/${this.user.username}`).child(task).remove();
            this.getTasks();
          }
        }
      }

    },
    async clearAll() {
      this.$store.dispatch('task/clearAll',)
      // await db.ref(`/tasks`).child(this.user.username).remove();
      this.getTasks();
    },
    qq(index, date) {
      this.$refs.modall[0].save(date);
    },
    completeTask(index) {
      this.taskArray[index].completed = !this.taskArray[index].completed;
      const newData = {
        completed: this.taskArray[index].completed,
      };
      db.ref(`/tasks/${this.user.username}`).child(index).update(newData);
    },

    Edit(data) {
      this.taskArray[data].edit = !this.taskArray[data].edit;
      this.inEdit = true;

    },
    // always use async and await when requesting api or data from database
    async deleteTask(data) {
      // use try and catch to catch the errors
      try {
        
        await db.ref(`/tasks/${this.user.username}`).child(data).remove();
        
        this.getTasks();
      } catch (error) {
        console.log("error in delete----> ", error);
      }
    },
    //edit a particular task
    editTask(index) {
      this.taskArray[index].edit = !this.taskArray[index].edit;
      const newData = {
        title: this.taskArray[index].title,
        description: this.taskArray[index].description,
        date: this.taskArray[index].date,
      };
      this.inEdit = false;
      this.$store.dispatch('task/edit_task', {newData,index})
      
    },
    

    async getUserFromDatabase() {
      await this.$store.dispatch('user/getUser');
      console.log(this.user , '<-----user')
    },

    async getTasks() {
      try {
        console.log(this.user.username)
        var userName = this.user.username;
        this.$store.dispatch('task/getTasks',userName)
      } catch (error) {
        console.log("error in get     ----> ", error);
      }
    },
  },
};
</script>