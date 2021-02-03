<template>
    <div>
        <v-app-bar color="orange" depressed dark flat height="150px" style="border-radius:0 0 0 100px">
            <v-spacer></v-spacer>
            <v-toolbar-title style="font-size:30px; font-weight:bold">Todo's</v-toolbar-title>
            <v-spacer style="width:100px"></v-spacer>
        </v-app-bar>
        <div class="background">
            
            <div class="backCard">
                <h2>Login</h2>
                <v-form class="form">
                    <v-text-field label="Email" v-model="email" required></v-text-field>
                    <v-text-field label="Password" type="password" v-model="password" required></v-text-field>
                    <v-btn elevation="5" color="orange" @click.prevent="onSubmit" class="button">Submit</v-btn>
                    
                    <!-- <button @click.prevent="onSubmit"></button> -->
                    <p v-if="loggedIn == 'yes'">you are logged in</p>
                    <p v-if="loggedIn == 'no'">Email or password is invalid</p>
                </v-form>
            </div>
            <p>Don't have an account? <router-link to="/signup">SignUp</router-link></p>
        </div>
    </div>
</template>

<script>
import Logo from '../components/Logo'
export default {
    props: [name],
    name: 'Login',
    components:{
        'logo': Logo
    },
    data(){
        return{
            email : '',
            password : '',
            registeredUsers : [],
            loggedIn: '',
        }
    },
    methods:{
        onSubmit(){
            for(let i in this.registeredUsers)
                if(this.registeredUsers[i].email == this.email && this.registeredUsers[i].password == this.password){
                    this.loggedIn = 'yes';
                    this.password = '';                                      //login success
                    console.log('Logged In')
                    this.$router.push({ name: 'HomePage' })            

                    this.setEmail();
                }
                else{
                    this.loggedIn = 'no';                                   //login failed
                    
                }
        },

        async setEmail() {                    //send user email to the module
            try {
                await this.$store.dispatch('user/setEmail',this.email)  
            }
            catch {
            }
        }
    },
    created(){
        this.$http.get('https://todolist-937d8.firebaseio.com/registeredusers.json').then(function(data){  
            return data.json();        //get data from firebase

        }).then(function(data){
            let array = [];
            for(let i in data){
                data[i].id = i;
                array.push(data[i]);
            }
            this.registeredUsers = array;    
        })
    },

    
}
</script>

<style scoped>
    .background{
        background-color: white;
        padding: 30px;
        /* height: 665px; */
        /* background-image: image(); */
    }
    .backCard{
        max-width: 500px;
        margin: auto;
        background-color: rgb(255, 247, 247);
        padding: 5px;
        min-height: 300px;
        border-radius: 10px;
    }
    h2{
        text-align: center;
        margin: 10px;
        font-size: 30px;
        color: orange;
    }
    input{
        width: 82%;
        padding: 7px;
        margin: 10px;
    }
    .form{
        margin: 10px;
    }
    .button{
        float: right;
        color: white;
    }
    
</style>