<template>
  <v-container>
    <section>
      <h3>不具合の報告</h3>
      <p>
        もしこのアプリの使用中に不具合が発生した場合は報告していただけるとありがたいです！
        報告はGitHubのIssue
        (<a href="https://github.com/yay4ya/akikunouta/issues" target="_blank">yay4ya/akikunouta</a>)
        かTwitterのメンション・DM・リプライ
        (<a href="https://twitter.com/_yay4ya">@_yay4ya</a>)
        にて受け付けています．
        報告の際は<a href="https://github.com/yay4ya/akikunouta/issues" target="_blank">Issue</a>に同様の報告がないか確認してから報告いただけると大変助かります！
      </p>
    </section>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'BugReport',
  });
</script>

<style lang="scss" scoped>
  h3 {
    padding-bottom: 10px;
  }
  section {
    &:not(:first-child) {
      margin-top: 40px;
    }
  }
</style>
