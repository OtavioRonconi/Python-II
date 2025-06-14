/** @type {import('postcss').Config} */
const config = {
  plugins: {
    // A chave aqui agora é o nome do novo pacote
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}

export default config;