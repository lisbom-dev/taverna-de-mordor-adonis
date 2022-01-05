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
        'main-cover': "url('../images/cover-rpg.jpg')",
      },
      blur: {
        sm: '2px',
      },
      keyframes: {
        'slide-from-right': {
          '0%': {
            'transform': 'translateX(100%)',
            'opacity': '0.2',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '100%': {
            'transform': 'translateX(0)',
            'opacity': '1',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'slide-from-right': 'slide-from-right 0.5s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
