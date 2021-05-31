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

                            <table id="tablelist" class="v-datatable v-table theme--light table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th width="50px"><input type="checkbox" id="master"></th>
                                    <th>Category</th>
                                    <th>Label</th>                
                                    
                                    <th>Edit </th>
                                    <th >Delete</th>
                                    <th width="100px">Date / Time</th>
                                
                                </tr>
                                </thead>	
                                <tbody>

                                    <Faq v-for="faq in faqs" :key="faq.id" :id="faq.id" :categoryname="faq.categoryname" :value="faq.value" :datecreate="faq.created_at" />
                            
                                </tbody>
                            </table>
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
import JQuery from 'jquery'
window.$ = JQuery
import adminPage from '~/mixins/admin-page.js';
import dateToFromPicker from '~/mixins/dateToFromPicker.js';
import downloadExcel from '~/mixins/downloadExcel.js';
import Faq from '~/components/admin/cms/index';

// user '~' in import for root location

export default {

    head () {
        return {
            script: [
                { src: 'https://code.jquery.com/jquery-3.5.1.js' },
                // { src: 'https://code.jquery.com/ui/1.12.1/jquery-ui.js' },
                // { src: 'https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js' },
                // { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js' },
                // { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js' },
            ],
            link: [ 
                // { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }
            ],
            
        }
    },
    components: {
        Faq
    },
    data () {
        return{
            faqs:[]
        }
    },
    async created() {

        const config ={
            headers:{
                'Accept': 'application/json'
            }
        }

        var url = process.env.API_URL;
        try {

            const response = await axios.get(url+'/api/fetch-faq',config)
            console.log(response.data['data']['faq']);
            this.faqs = response.data['data']['faq'];

        } catch (error) {
            
        }

    },
    mixins: [
        adminPage,
        // dateToFromPicker,
    ],
    mounted() {


    },


    computed: {
    
    },
    methods: {

    },
    watch: {

            
    },
};

    $(document).ready(function() {

            console.log("jquery inside")
		    // $('#tablelist').DataTable( {
			//    'columnDefs': [ {
			//         'targets': [0,1,2,3,4,5], /* column index */
			//         'orderable': false, /* true or false */
			//      }]
			// } );
    });
    
</script>


<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
