module.exports = {
  purge: [
    './resources/views/**/*.edge',
    './resources/css/**/*.css',
    './resources/js/**/*.js',
    './resources/js/**/*.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'dungeons-and-dragons': "url('../../public/assets/img/dungeons-and-dragons.jpg')",
        'vampire-the-mascarade': "url('../../public/assets/img/vampire-the-mascarade.jpeg')",
        'al-rpg-club': "url('../../public/assets/img/al-rpg-club.jpg')",
        'cyberpunk': "url('../../public/assets/img/cyberpunk.jpg')",
        'logo': "url('../../public/assets/img/pp.jpg')",
        'tabuleiro-rpg': "url('../../public/assets/img/tabuleiro-rpg.jpg')",
      },
      blur: {
        sm: '2px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
