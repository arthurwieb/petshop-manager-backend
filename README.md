se der pau com permissão na instalação, rode
sudo chown -R $USER:$USER node_modules

No package.json existem alguns scripts que são utilizados para auxiliar no desenvolvimento, é uma forma de simplificar os comandos e não ter que ficar escrevendo toda vez aquele monte de comando do docker, vou resumir o que cada um faz:

docker compose up
Sobe o servidor e os containers, sempre começar por esse comando.

yarn doall
Roda migration e popula o db.

yarn build
Pega os arquivos TS em transforma em JS para que fique acessível no browser. Não queremos fazer isso manualmente, deixa que as operações do docker vão fazer isso na hora de rebuildar e etc.

yarn start
Executa o servidor sem usar o docker(quase nunca precisamos disso, mas tem que ter o script para que o docker-compose execute)

yarn start:docker
Executa o servidor no docker(O docker compose vai executar isso)

yarn db:console
Te garante acesso ao db via terminal caso não queira utilizar uma extensão ou software terceira.

yarn migrate
Pega o que foi definido no arquivo Prisma.prisma e gera uma migration, criando as tabelas do banco de dados.

yarn rebuild
Rebuilda o backend no docker.

yarn restart
Reseta o backend, é basicamente o que faz quando dá ctrl S, mas as vezes dá pau na extensão.

yarn migrate:undo
Desfaz a migration e apaga tudo no banco.

yarn db:reset
Comando auxiliar no desenvolvimento só para dar um reset completo no BD e criar os dados novamente, provavelmente será descartado no futuro.

yarn seed
Popula o db com as informações que foram definidas em um arquivo específico de seed.


