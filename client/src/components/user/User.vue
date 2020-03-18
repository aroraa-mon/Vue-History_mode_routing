<template>
    <div>
        <h1>{{title}}</h1>
        <hr>
        <!-- <p>Loaded Id: {{id}}</p> -->
        <button @click="navigateToHome" class="btn btn-primary">Home</button>
        <hr>
        <router-view></router-view>
    </div>

</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            id : this.$route.params.id,
            title : ""
        }
    },
    methods : {
        navigateToHome() {
            this.$router.push({path : '/'});
        }
    },
    watch : {
        '$route'(to, from){
            this.id = to.params.id
        }
    },
    created() {
        axios.get(`http://localhost:3000/users`)
        .then(response => {
            // JSON responses are automatically parsed.
            console.log(response);
            this.title = response.data
        })
        .catch(e => {
            console.log(e);
            this.errors.push(e)
        })

        // async / await version (created() becomes async created())
        //
        // try {
        //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
        //   this.posts = response.data
        // } catch (e) {
        //   this.errors.push(e)
        // }
    }

}
</script>