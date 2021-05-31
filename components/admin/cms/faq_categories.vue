<template>

        <tr v-bind:id="id">
            <td><input type="checkbox" class="sub_chk" data-id=""></td>            
            <td>{{value}}</td>
            <td><a href="/edit" class="btn btn-primary">Edit</a></td>
            <td><a href="/edit" class="btn btn-danger">Delete</a></td>
            <td>{{datecreated}}</td>
            <input type="hidden" value="" id="item" name="item">
        </tr>
          
</template>

<script>

    export default {
      name:"FaqCategories",
      props:["id","value","datecreated"]
    }

</script>

<style>

</style>