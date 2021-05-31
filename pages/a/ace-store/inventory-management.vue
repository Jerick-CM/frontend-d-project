<template>
  <div id="model-page">
    <div class="container no-padding">
      <v-toolbar flat color="white">
        <v-toolbar-title style="width: 250px;">Inventory management</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <!-- Add/Edit Item Dialog -->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-btn type="button" slot="activator" dark>Add Item</v-btn>

          <v-card>
            <v-toolbar dark>
              <v-btn icon dark @click="close()">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  v-bind:loading="isSaving"
                  v-on:click="submit()"
                  dark
                  flat>Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <v-card-text>
              <div class="container--flex mb-4">
                <div class="flex-1 preview-item">
                  <h4>
                    <span style="vertical-align: middle;">Item photos</span>
                    <v-btn
                      dark
                      @click.prevent="sortMode = !sortMode"
                      style="vertical-align: middle;"
                      v-if="editedItem.primary_photo"
                    >
                      <span v-if="sortMode">Done</span>
                      <span v-else>Edit sort</span>
                    </v-btn>
                  </h4>
                  <div class="photo-details mt-4" v-if="editedItem.primary_photo">
                    <div class="container--flex container--flex-wrap align-center" v-if="!sortMode">
                      <div
                        v-for="(photo, idx) in editedItem.inventory_photos"
                        :key="idx"
                        class="flex-1"
                        style="max-width: 150px; position: relative; height: 150px; margin: 0 20px;"
                      >
                        <i
                          class="material-icons"
                          v-if="photo.is_primary === 1"
                          style="position: absolute; top: 0; left: 0; color: #94b944"
                        >star</i>
                        <img
                          class="responsive-img clickable"
                          :key="idx"
                          :src="photo.file"
                          @click="setPrimaryPhoto(photo.id, idx)"
                        />
                        <i
                          class="material-icons clickable"
                          style="position: absolute; top: 0;"
                          @click="deleteOtherPhoto(photo.id, idx)"
                          v-if="photo.is_primary !== 1"
                        >highlight_off</i>
                      </div>
                    </div>
                    <div v-else>
                      <draggable
                        v-model="editedItem.inventory_photos"
                        @start="drag=true"
                        @end="drag=false"
                        class="container--flex container--flex-wrap align-center"
                      >
                        <div
                          v-for="(photo, idx) in editedItem.inventory_photos"
                          class="flex-1 clickable"
                          style="max-width: 150px; position: relative; height: 150px; margin: 0 20px;"
                          :key="idx"
                        >
                          <img class="responsive-img" :key="idx" :src="photo.file" />
                        </div>
                      </draggable>
                    </div>
                  </div>
                  <span>Add photo(s)</span>
                  <dropzone
                    ref="otherPhotoDropzone"
                    :options="dropzoneOpts.otherOptions"
                    :duplicateCheck="dropzoneOpts.duplicateCheck"
                    :destroyDropzone="dropzoneOpts.destroyDropzone"
                  ></dropzone>
                </div>
              </div>
              <v-text-field
                v-model="editedItem.name"
                label="Name"
                color="light-green lighten-1"
                maxlength="40"
                counter="40"
                required
              ></v-text-field>
              <v-textarea
                label="Description"
                color="light-green lighten-1"
                v-model="editedItem.description"
              ></v-textarea>
              <v-text-field
                v-model="editedItem.short_desc"
                label="New product description"
                color="light-green lighten-1"
                maxlength="50"
                counter="50"
                required
              ></v-text-field>
              <!-- <v-text-field v-model="editedItem.new_description"
                            label="New Product Description"
                            color="light-green lighten-1"
                            maxlength="50"
                            counter="50"
                            required>
              </v-text-field>-->
              <v-text-field
                v-model="editedItem.stock"
                label="Quantity"
                type="number"
                required
                min="0"
                color="light-green lighten-1"
                v-if="editedIndex === -1"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.unit_price"
                label="Unit price"
                type="number"
                min="0"
                color="light-green lighten-1"
                required
              ></v-text-field>

              <v-combobox
                v-model="editedItem.categories"
                :items="categories"
                :loading="isCategoryLoading"
                v-on:change="onCategoryChange"
                item-text="name"
                item-value="id"
                label="Category"
                color="light-green lighten-1"
                clearable
                multiple
                chips
              >
                <template slot="no-data">
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        Press
                        <kbd>enter</kbd> to add.
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-combobox>
              <v-checkbox
                v-model="editedItem.is_visible"
                label="Discontinued"
                :true-value="0"
                :false-value="1"
                color="light-green lighten-1"
              ></v-checkbox>
              <v-checkbox
                v-model="editedItem.is_preorder"
                label="Pre-order"
                :true-value="1"
                :false-value="0"
                color="light-green lighten-1"
              ></v-checkbox>
              <br />
              <br />
              <h5>Item metadata</h5>
              <v-container fluid grid-list-md v-if="editedItem.meta" style="margin: 0 !important;">
                <v-layout v-for="(item, idx) in editedItem.meta" :key="idx" row wrap>
                  <v-flex xs5>
                    <v-text-field
                      v-model="item.key"
                      label="Label"
                      color="light-green lighten-1"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs5>
                    <v-text-field
                      v-model="item.val"
                      label="Value"
                      color="light-green lighten-1"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn flat small @click="removeMeta(idx)">
                      <v-icon>remove_circle</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-btn flat small @click="addItemMeta()">
                <v-icon left dark>add</v-icon>Add item metadata
              </v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <!-- Edit Stock Dialog -->
      <v-dialog v-model="stockDialog" max-width="500px" width="500px">
        <v-card>
          <v-card-title>
            <h3>{{ stockFormTitle }}</h3>
          </v-card-title>
          <form @submit.prevent="submitEditStock">
            <v-card-text>
              <v-text-field
                v-model="editStockAmount"
                label="Quantity"
                type="number"
                min="0"
                placeholder="0"
                color="light-green lighten-1"
                v-if="editedIndex === -1"
                ref="txtEditStock"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark @click="closeStockDialog">Close</v-btn>
              <v-btn dark type="submit">Save</v-btn>&nbsp;
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>

      <v-data-table
        :headers="table.headers"
        :items="rewards"
        :loading="table.isLoading"
        :pagination.sync="pagination"
        :total-items="table.totalItems"
        item-key="id"
      >
        <template slot="items" slot-scope="props">
          <td>
            <img
              class="pt-1"
              :src="getItemPhoto(props.item.primary_photo)"
              width="100"
              :alt="props.item.name"
            />
          </td>
          <td>
            <h3>{{ props.item.name }}</h3>
          </td>
          <td>
            <h3>{{ $moment(props.item.updated_at).format('DD MMM YYYY') }}</h3>
          </td>
          <td>
            <h3>{{ props.item.stock }}</h3>
          </td>
          <td>
            <h3>{{ props.item.unit_price }}</h3>
          </td>
          <td :class="{ 'discontinued': props.item.is_visible === 0 }">
            <v-btn
              small
              color="light-green lighten-1"
              class="white--text"
              @click.prevent="editItem(props.item.id)"
            >Edit</v-btn>
            <v-btn
              small
              color="light-green lighten-1"
              class="white--text"
              @click.prevent="editStock(props.item.id, 1)"
            >Add Stock</v-btn>
            <v-btn
              small
              color="light-green lighten-1"
              class="white--text"
              @click.prevent="editStock(props.item.id, 0)"
            >Reduce Stock</v-btn>
            <v-btn
              v-bind:loading="props.item.isDeleting"
              small
              class="white--text"
              style="background: #ee2323 !important;"
              @click.prevent="deleteItem(props.item.id)"
            >Delete</v-btn>
          </td>
        </template>
      </v-data-table>
      <div class="container no-padding" style="margin-top: 25px !important">
        <v-toolbar flat color="white" class="pt-4">
          <v-toolbar-title>Downloadable logs</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-btn
            class="right"
            dark
            v-on:click="generateCsv()"
            >Generate log file</v-btn
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table
          v-bind:headers="logsTable.headers"
          v-bind:items="downloadableLogs"
          v-bind:loading="logsTable.isLoading"
          v-bind:pagination.sync="logsTablePagination"
          v-bind:total-items="logsTable.totalItems"
          item-key="id"
        >
          <template slot="items" slot-scope="props">
            <td>
              <h3>{{ props.item.created_at }}</h3>
            </td>
            <td>
              <h3>{{ props.item.status }}</h3>
            </td>
            <td>
              <v-btn
                class="right"
                v-if="props.item.status == 'ready'"
                dark
                v-on:click="downloadFile(props.item)"
                >Download</v-btn
              >
            </td>
          </template>
        </v-data-table>
      </div>
      <br />
      <br />
    </div>
  </div>
</template>


<script>

import draggable from "vuedraggable";
import Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";



import adminPage from "~/mixins/admin-page.js";

import componentController from './inventory-management.controller';
export default {
  components: {
    Dropzone,
    draggable
  },
  mixins: [
    adminPage,
    componentController,
  ],
};
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
