<template>
  <div id="model-page">
    <div class="container no-padding">
      <v-toolbar flat color="white">
        <v-toolbar-title>Block collection date</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
      </v-toolbar>
      <br>

      <v-date-picker
        v-model="dates"
        v-bind:readonly="isLoading"
        v-bind:show-current="false"
        v-bind:allowed-dates="allowedDates"
        v-bind:events="events"
        v-on:input="onChangeInput"
        event-color="red"
        color="light-green lighten-1"
        full-width
        landscape
        multiple
        reactive
      ></v-date-picker>
      <br>
    <v-layout row>
      <v-flex size="3">
        <v-checkbox class="mx-2" v-model="isMondayEnabledx" label="Monday"></v-checkbox>
      </v-flex>
      <v-flex size="3">
        <v-checkbox class="mx-2" v-model="isTuesdayEnabledx" label="Tuesday"></v-checkbox>
      </v-flex>
      <v-flex size="3">
        <v-checkbox class="mx-2" v-model="isWednesdayEnabledx" label="Wednesday"></v-checkbox>
      </v-flex>
      <v-flex size="3">
        <v-checkbox class="mx-2" v-model="isThursdayEnabledx" label="Thursday"></v-checkbox>
      </v-flex>
      <v-flex size="3">
        <v-checkbox class="mx-2" v-model="isFridayEnabledx" label="Friday"></v-checkbox>
      </v-flex>
      <v-flex size="3">
        <v-checkbox class="mx-2" v-model="isSaturdayEnabledx" label="Saturday"></v-checkbox>
      </v-flex>
      <v-flex size="3">
        <v-checkbox class="mx-2" v-model="isSundayEnabledx" label="Sunday"></v-checkbox>
      </v-flex>
      <v-flex size="3">
        <v-btn
          color="light-green lighten-1 mx-2"
          class="white--text"
          @click.prevent="updateBlockDays()" :disabled="updateBlockDaysLoading" :loading="updateBlockDaysLoading" >Apply</v-btn>
        </v-flex>
      </v-flex>
    </v-layout row>
      <br>
      <v-btn color="light-green lighten-1" class="white--text"
             @click.prevent="submit()"
             v-bind:disabled="dates.length === 0 || isLoading">Block Dates</v-btn>
      <v-btn color="light-green lighten-1" class="white--text"
             @click.prevent="unblockDates()"
             v-bind:disabled="dates.length === 0 || isLoading">Unblock Dates</v-btn>
      <v-btn color="light-green lighten-1" class="white--text"
             @click.prevent="dates=[]"
             v-bind:disabled="dates.length === 0 || isLoading">Reset</v-btn>
    </div>
  </div>
</template>

<script>
import adminPage from '~/mixins/admin-page.js';
import componentController from './block-collection.controller';

export default {
  mixins: [
    adminPage,
    componentController,
  ],
}
</script>
