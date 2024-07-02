# No Escape API v1.0

## Sobre
**No Escape Tracking** é uma ferramenta inovadora que busca rastrear veículos cadastrado pelo usuário com o mais atual sistema de geolocalização para uma maior segurança e prevenção a eventuais problemas, como roubos. Com uma interface intuitiva e funcionalidades avançadas, o foco principal está no cliente conseguir visualizar e manipular informações sensíveis da maneira mais simples possível. Acesse a interface do sistema [aqui](44.203.35.24).  

## Funcionalidades
* Cadastro de perfil de usuário
* Atualização de informações de perfil de usuário
* Cadastro de rastreios
* Atualização de rastreios
* Exclusão de rastreios

## Como executar
1. Clone esse repositório em sua máquina (Necessário ter o [Git](https://www.git-scm.com/downloads) instalado) por meio do comando **git clone <link_do_repositório>**
2. Navegue até o repositório e aqui você terá duas opções:
2.1. Caso queira, você pode iniciar o projeto com o [Docker](https://docs.docker.com/engine/install/) através do comando **docker-compose up**.
2.2. A outra opção exigirá o [Node.JS](https://nodejs.org/pt/learn/getting-started/how-to-install-nodejs) instalado em sua máquina.   
3. Caso tenha optado por seguir com o Node.JS, será necessário seguir os passos abaixo:
3.1. Rode **npm ci** para instalar as dependências do projeto
3.2. Renomeie o arquivo *.env.example* para *.env* e sete as configurações que desejar para cada variável de ambiente.
3.3. Rode **npm run build** para gerar o build do projeto.
3.4. Rode **npx prisma db push** para sincronizar o modelo de banco de dados com seu servidor de banco de dados local. Aqui será necessário possuir algum SGBD instalado (preferencialmente [MySQL](https://www.mysql.com/downloads/)).
3.5. Por fim, rode **npm run start** para iniciar o projeto.

## Tecnologias
<img src="https://cdn.iconscout.com/icon/free/png-256/free-typescript-3521774-2945272.png?f=webp&w=256" width='120px' />
<img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png" width='100px' />
<img src="https://downloads.marketplace.jetbrains.com/files/14240/159812/icon/pluginIcon.png" width='110px' />
<img src="https://w7.pngwing.com/pngs/747/798/png-transparent-mysql-logo-mysql-database-web-development-computer-software-dolphin-marine-mammal-animals-text-thumbnail.png" width='110px' />
<img src="https://www.manektech.com/storage/developer/1646733543.webp" width='110px' />
<img src="https://iconape.com/wp-content/png_logo_vector/aws-logo.png" width='120px' />