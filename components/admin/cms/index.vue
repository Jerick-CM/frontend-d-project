<template>

    <tr v-bind:id="id">
        <td><input type="checkbox" class="sub_chk" data-id=""></td>
        <td>{{categoryname}}</td>
        <td>{{value}}</td>
        <td><a href="/edit" class="btn btn-primary">Edit</a></td>
        <td>
            <button class="btn btn-danger" 
                v-on:click="fireDelete(id)" >Delete</button>
        </td>
        <td>{{datecreate}}</td>
        <input type="hidden" value="" id="item" name="item">
    </tr>
          
</template>

<script>

    const axios = require('axios');

    import log from '../../../mixins/log';

    export default {      
        name:"Faq",
        mixins: [log],
        props:["id","categoryname","value",'datecreate'],
        methods: {
            fireDelete(id) {
                this.l(id)
            }
        },
    }
  

</script>

<style>

</style>