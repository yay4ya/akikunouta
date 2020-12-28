<template>
  <v-container>
    <section class="item">
      <h3>データのエクスポート (未実装)</h3>
      <p>
        このブラウザ上に保存されている<b>いいね</b>・<b>プレイリスト</b>のデータをクリップボードに出力します。
      </p>
      <v-btn depressed>
        <v-icon>mdi-content-copy</v-icon>
        データをコピー
      </v-btn>
    </section>

    <section>
      <h3>データのインポート (未実装)</h3>
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
        このブラウザ上に保存されている<b>いいね</b>・<b>プレイリスト</b>・<b>キュー</b>を全て削除します。
      </p>
      <v-dialog
        max-width="400px"
        v-model="deleteDialog"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            color="error"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-delete</v-icon>
            データを削除
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            データを削除しますか？
          </v-card-title>
          <v-card-text>
            この操作を行うと，このブラウザ上に保存されている<b>いいね</b>・<b>プレイリスト</b>・<b>キュー</b>が全て削除されます。
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="cleanAll(); deleteDialog = false;">はい</v-btn>
            <v-btn text color="red" @click="deleteDialog = false">いいえ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </section>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapMutations} from 'vuex';
  import * as VuexMutation from '@/store/mutation-types';

  export default Vue.extend({
    name: 'DataManager',
    data() {
      return {
        deleteDialog: false,
      }
    },
    methods: {
      ...mapMutations({
        cleanAll: VuexMutation.CLEAN_ALL,
      }),
    },
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
