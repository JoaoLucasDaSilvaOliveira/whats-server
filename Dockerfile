# Imagem base com Chrome, Node e dependências necessárias para puppeteer
FROM mcr.microsoft.complaywrightv1.39.0-jammy

# Define a pasta de trabalho
WORKDIR app

# Copia e instala as dependências do Node.js
COPY package.json .
RUN npm install

# Copia o restante do projeto
COPY . .

# Expondo a porta usada pelo Express
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [npm, start]