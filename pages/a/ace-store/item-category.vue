<template>
  <div id="model-page">
    <div class="container no-padding">
      <v-toolbar flat color="white">
        <v-toolbar-title>Item category</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>


        <!-- Add/Edit Item Dialog -->
        <v-dialog v-model="dialog" max-width="500px" width="500px">
          <v-btn type="button" slot="activator" dark>Add category</v-btn>

          <v-card>
            <v-card-text>
              <h4>{{ formTitle }}</h4>
              <form @submit.prevent="submit">
                <v-card-text>
                  <v-text-field v-model="editedItem.name"
                                label="Name"
                                color="light-green lighten-1">
                  </v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn dark @click="close">Close</v-btn>
                  <v-btn dark type="submit">Save</v-btn>&nbsp;
                </v-card-actions>
              </form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-data-table :headers="table.headers"
                    :items="categories"
                    :loading="table.isLoading"
                    :pagination.sync="pagination"
                    :total-items="table.totalItems"
                    item-key="id">
        <template slot="items" slot-scope="props">
          <td>
            <h3>{{ props.item.name }}</h3>
          </td>
          <td>
            <v-tooltip top>
              <v-icon
                @click="editItem(props.item.id)"
                class="clickable"
                slot="activator">edit</v-icon>
              <span class="uppercase">Edit</span>
            </v-tooltip>
            <v-tooltip top>
              <v-icon
                @click="deleteCategory(props.item.id)"
                class="clickable"
                slot="activator">delete</v-icon>
              <span class="uppercase">Delete</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
      <br><br>
    </div>
  </div>
</template>

<script>
import adminPage from '~/mixins/admin-page.js';
import componentController from './item-category.controller';

export default {
  mixins: [
    adminPage,
    componentController,
  ],
}
</script>

<style scoped>
.discontinued .v-btn {
  background-color: #a9a9a9 !important;
}
.photo-details {
  height: 200px;
  max-height: 200px;
}
</style>
