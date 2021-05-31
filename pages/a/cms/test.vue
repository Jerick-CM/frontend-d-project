<template>
    <div id="cms-page">
        <div class="container no-padding">

            <v-toolbar flat color="white" class="pt-4">

                <v-toolbar-title>FAQ</v-toolbar-title>

                <v-divider class="mx-2" inset vertical></v-divider>
                <v-spacer></v-spacer>
                
                <div class="container--flex container--flex-align-item-center " >
                 

                </div>

            </v-toolbar>
            
            <div class="container no-padding" style="background-color:white;" >  

                 <div class="container">
                    <div class="row">
                        <div class="faq col-md-12">

                            <table>
                                <tr><th>Sample Table</th></tr>
                                <tr v-for="(content, index) in tableRows" :key="index">
                                    <td>{{content}}</td><td><button @click='deleteTableRow(index)' >Delete</button></td>
                                </tr>
                            </table>

                            <br>
                            <button @click='addTableRow()' >Add New Row</button>


                        </div>
                    </div>
                </div>
           </div>

            <div class="controls m-lg-vertical">
               
            </div>

        </div>
    </div>

</template>



<script>


const axios = require('axios');
// import JQuery from 'jquery'
// window.$ = JQuery
import adminPage from '~/mixins/admin-page.js';
import dateToFromPicker from '~/mixins/dateToFromPicker.js';
import downloadExcel from '~/mixins/downloadExcel.js';
import Faq from '~/components/admin/cms/index';

// user '~' in import for root location

export default {
  data: {
    tableRows:['Table Row 1', 'Table Row 2'],
    counter:2
  },
   methods:{
        addTableRow: function () { 
            this.counter++;
            this.tableRows.push("Table Row "+this.counter);
        
        },
        deleteTableRow: function (idx) { 
            this.counter--;
            this.tableRows.splice(idx, 1);      
         }
   }  
};


    
</script>


<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
