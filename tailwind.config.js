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
      spacing: {
        110: '28rem',
      },
      backgroundImage: {
        'dungeons-and-dragons': "url('../images/dungeons-and-dragons.jpg')",
        'vampire-the-mascarade': "url('../images/vampire-the-mascarade.jpeg')",
        'al-rpg-club': "url('../images/al-rpg-club.jpg')",
        'cyberpunk': "url('../images/cyberpunk.jpg')",
        'logo': "url('../images/pp.jpg')",
        'tabuleiro-rpg': "url('../images/tabuleiro-rpg.jpg')",
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
