<template>
  <v-container>
    <section>
      <h3>
        <v-icon>mdi-github</v-icon>
        <a
          href="https://github.com/yay4ya/akikunouta"
          target="_blank"
        >yay4ya/akikunouta</a>
      </h3>
      <p>
        このアプリは<b>にじさんじ</b>所属のバーチャルライバー<b>鈴谷アキ</b>
        <a href="https://twitter.com/aki_suzuya" target="_blank"><v-icon size="1.2em">mdi-twitter</v-icon></a>
        <a href="https://www.youtube.com/channel/UCpnvhOIJ6BN-vPkYU9ls-Eg?sub_confirmation=1" target="_blank"><v-icon size="1.2em">mdi-youtube</v-icon></a>
        くんのお歌をより手軽に聞くためのWebアプリです。
        アキくんがこれまでに配信や歌ってみた動画で歌ったお歌を集めて1曲ずつ聞けるようにしました。
        <b>いいね</b>や<b>プレイリスト</b>機能をつかってお気に入りのお歌を管理することもできます。
        あなたの大好きなお歌を見つけよう！
      </p>
    </section>

    <section>
      <h3>お知らせ</h3>
      <p>
        2024年8月31日のアキくん卒業に伴って歌枠などの配信動画は視聴できなくなりましたが、
        これまでの活動を振り返られるように楽曲はすべてそのまま残すこととしました。
        たくさん歌ってくれてありがとう💐 アキくんすき！
      </p>
    </section>

    <section>
      <h3>おことわり</h3>
      <ul>
        <li>サムネイル画像は当時の動画・配信から引用しています</li>
        <li>このWebアプリはアキくんのファンである<b>ややや個人によるもの</b>であり、ANYCOLOR株式会社及びにじさんじプロジェクトとは
一切関係ありません</li>
        <li>不具合等ありましたら下記までご連絡ください</li>
      </ul>
    </section>

    <section>
      <h3>製作者</h3>
      <p>
        <b>ややや</b> :
        <a
          href="https://twitter.com/_yay4ya"
          target="_blank"
        >
          <v-icon
            size="1.2em"
          >
            mdi-twitter
          </v-icon>
          @_yay4ya
        </a>

        <a
          href="https://github.com/yay4ya"
          target="_blank"
        >
          <v-icon
            size="1.2em"
          >
            mdi-github
          </v-icon>
          yay4ya
        </a>
      </p>

    </section>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'About',
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
