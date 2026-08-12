# Calculadora de Idade - React Native

Este projeto é uma aplicação mobile desenvolvida em React Native que calcula com precisão a idade de uma pessoa (em anos, meses e dias) a partir de sua data de nascimento. Além disso, o aplicativo classifica a faixa etária do usuário (Jovem, Adulto ou Idoso), uma funcionalidade inspirada em sistemas de triagem de clínicas médicas.

Projeto desenvolvido como parte da Atividade Prática 1 da disciplina de Programação para Dispositivos Móveis II, do curso de Desenvolvimento de Software Multiplataforma na Fatec.

## Funcionalidades

* **Cálculo Preciso:** Determina a idade exata considerando anos bissextos e a variação de dias nos meses.
* **Classificação Etária:**
    * Jovem: até 19 anos
    * Adulto: de 20 a 59 anos
    * Idoso: 60 anos ou mais
* **Validação de Entrada:** Impede datas no futuro, meses inválidos e dias inexistentes (como 30 de fevereiro).
* **Interface Amigável:** Layout limpo e responsivo com feedback visual em cores e emojis baseado no resultado.

## Tecnologias Utilizadas

* React Native
* Expo
* JavaScript

## Como Executar o Projeto

Certifique-se de ter o Node.js instalado em sua máquina. Para rodar o projeto localmente, siga os passos abaixo:

1. Clone este repositório:

    git clone https://github.com/SEU_USUARIO/calculadora-idade-react-native.git

2. Acesse a pasta do projeto:

    cd calculadora-idade-react-native

3. Instale as dependências:

    npm install

4. Inicie o servidor do Expo:

    npx expo start

Após iniciar, você pode escanear o QR Code gerado no terminal usando o aplicativo Expo Go no seu celular, ou pressionar "w" para abrir na web, "a" para emulador Android ou "i" para simulador iOS.

## Estrutura do Projeto

O código foi organizado seguindo boas práticas de modularização para manter a legibilidade em uma única tela:

    /
    ├── App.js
    └── src/
        ├── utils/
        │   └── idade.js
        ├── styles/
        │   └── homeStyles.js
        └── screens/
            └── Home.js

## Autor

Kauã Hiro dos Santos Mizumoto
Estudante de Desenvolvimento de Software Multiplataforma na Fatec.
