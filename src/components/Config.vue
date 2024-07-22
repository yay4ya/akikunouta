<template>
  <v-container>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-information-outline
        </v-icon>
        このアプリについて
      </v-tab>

      <v-tab>
        <v-icon left>
          mdi-database
        </v-icon>
        データの管理
      </v-tab>

      <v-tab>
        <v-icon left>
          mdi-bug
        </v-icon>
        不具合の報告
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <About/>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <DataManager/>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <BugReport/>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'Config',
    components: {
      About: () => import('./About.vue'),
      DataManager: () => import('./DataManager.vue'),
      BugReport: () => import('./BugReport.vue'),
    }
  });
</script>
