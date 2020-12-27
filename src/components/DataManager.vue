<template>
  <v-container>
    <section class="item">
      <h3>データのエクスポート</h3>
      <p>
        このブラウザ上に保存されている<b>いいね</b>・<b>プレイリスト</b>のデータを出力します。
      </p>
      <v-btn depressed>
        <v-icon>mdi-content-copy</v-icon>
        データをコピー
      </v-btn>
    </section>

    <section>
      <h3>データのインポート</h3>
      <p>
        エクスポートされたデータから<b>いいね</b>・<b>プレイリスト</b>を復元します。
      </p>
      <v-textarea
        rows="1"
      >
      </v-textarea>
      <v-btn depressed>
        <v-icon>mdi-import</v-icon>
        インポート
      </v-btn>
    </section>

    <section>
      <h3>データの削除</h3>
      <p>
        このブラウザ上に保存されている<b>いいね</b>・<b>プレイリスト</b>を全て削除します。
      </p>
      <v-btn depressed color="error">
        <v-icon>mdi-delete</v-icon>
        データを削除
      </v-btn>
    </section>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'DataManager',
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
