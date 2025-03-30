# petshop-manager-backend

# If you get an error with node_modules not created

See: <https://yarnpkg.com/getting-started/install>
Run: yarn config set nodeLinker node-modules
Run: yarn install

Primeira versão de readme, preciso validar tudo, vou escrever os passos meio que de cabeça que eu fiz ontem

Buildar o docker

````
docker build . -t fastify-app`
````

Iniciar o container
````
docker compose up -d
````

Teoricamente, aqui tudo já está rodando, banco e o server

Rodar migrations e depois seeder
````
criar o script aqui
````


para acessar o banco via psql
`````
docker exec -it NOME_DO_CONTAINER bash`

psql -Upostgres mydb

\d -- aparece todas tabelas
`````


