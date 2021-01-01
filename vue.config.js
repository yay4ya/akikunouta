module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/akikunouta/' : '/',
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'アキくんのおうた',
    },
  },
}
