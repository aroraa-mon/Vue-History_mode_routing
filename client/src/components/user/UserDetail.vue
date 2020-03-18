<template>
    <div>
        <h3>Some User <a href="/detail">Details</a></h3>
        <p>User loaded with id : {{$route.params.id}}</p>
        <router-link tag="button" :to="{name : 'Edituser', params: {id:$route.params.id}, query : {locale : 'en'}}" class="btn btn-primary" >Edit User</router-link>
    </div>
</template>