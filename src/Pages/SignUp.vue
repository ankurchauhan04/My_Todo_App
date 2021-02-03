<template>
    <div>
        <v-app-bar color="orange" depressed dark flat height="150px" style="border-radius:0 0 0 100px">
            <v-spacer></v-spacer>
            <v-toolbar-title style="font-size:30px; font-weight:bold">Todo's</v-toolbar-title>
            <v-spacer style="width:100px"></v-spacer>
        </v-app-bar>
        <div class="background">
            <div class="backCard" v-if="!registered">
                <h2>Register yourself</h2>
                
                <v-form>
                    <v-text-field
                        label="Firstname" v-model="userDetails.firstname" class="mt-n3"
                    ></v-text-field>
                    <v-text-field
                        label="Lastname" v-model="userDetails.lastname" class="mt-n3"
                    ></v-text-field>
                    <v-text-field
                        label="Enter your email" v-model="userDetails.email" class="mt-n3"
                    ></v-text-field>
                    <v-text-field
                        label="Username" v-model="userDetails.username" class="mt-n3"
                    ></v-text-field>
                    <v-text-field
                        label="Password" v-model="userDetails.password" class="mt-n3"
                        type="password"
                    ></v-text-field>
                    <v-text-field
                        label="Re-enter Password" v-model="userDetails.repassword" type="password" class="mt-n3"
                    ></v-text-field>
                    <v-btn elevation="5" color="orange" @click.prevent="post" class="button" >Submit</v-btn>
                </v-form>
            </div>
            <p v-if="!registered">Already have an account? <router-link to="/login">Login</router-link></p>
            <div v-if="registered" class="login">
                <h4>Click here to <router-link to="/login">Login</router-link></h4>
            </div>
        </div>
    </div>
      
</template>

<script>
import Logo from '../components/Logo'
export default {
    name: 'Signup',
    components:{
        'logo': Logo
    },
    data(){
        return{
            userDetails:{
                firstname: null,
                lastname: null,
                email: null,
                password: null,
                repassword: null,
                username: null,
            },
            registered: false,
            registeredUsers : [],
        }
    },
    methods:{

        post(){
            
            let nameRegex = /^[a-z]+$/i;
            let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[\)\(\!\@\#\$\%\^\&])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if(!nameRegex.test(this.userDetails.firstname)){
                alert("Enter only alphabets in Firstname");
                return false;
            }
            if(!nameRegex.test(this.userDetails.lastname)){               //validations
                alert("Enter only alphabets in Lastname");
                return false;
            }
            if(!emailRegex.test(this.userDetails.email)){
                alert("Invalid email");
                return false;
            }
            if(!passwordRegex.test(this.userDetails.password)){
                alert("Password must include one uppercase, one lowercase, one digits and one special characters and it must be 8 characters long");
                return false;
            }
            if(this.userDetails.password !== this.userDetails.repassword){
                alert('Re-password does not match');
                return false;
            }
            for(let i in this.registeredUsers){
                if(this.userDetails.email == this.registeredUsers[i].email){
                    alert('This email is used in another account');
                    return false;
                }
            }
            this.registered = true;                               
            this.$http.post('https://todolist-937d8.firebaseio.com/registeredusers.json',this.userDetails)
            // var userName =this.userDetails.username
            // console.log(userName)

        //   var obj={}
        //   obj[userName] = null
        //   console.log(obj)
        //   this.$http.put('https://todolist-937d8.firebaseio.com/tasks.json',obj).then(function(data){     
        //         console.log(data)         //save the data to database
        //     });
        }
    },
    created(){
        this.$http.get('https://todolist-937d8.firebaseio.com/registeredusers.json').then(function(data){
            return data.json();           //get data from firebase

        }).then(function(data){
            let array = [];
            for(let i in data){
                data[i].id = i;
                array.push(data[i]);
            }
            this.registeredUsers = array;     
            console.log(array);
        })
    },
}
</script>

<style scoped>
    .background{
        background-color: white;
        padding: 30px;
    }
    .backCard{
        max-width: 500px;
        margin: auto;
        background-color: #eee;
        padding: 10px;
        min-height: 480px;
    }
    h2,h1,h4{
        text-align: center;
        color: orange;
        margin: 10px;
    }
    /* v-text-field{
        width: 82%;
        padding: 100px;
        margin: 10px;
        color: white;
    } */
    .button{
        float: right;
        color: white;
        font-size: 50px;
    }
    .login{
        margin: 200px auto;
    }
    p{
        margin: 10px;
    }
    
</style>