# Fluxo Padrão

Esse arquivo serve de uma breve descrição do fluxo do javascript e vem descrever os processos principais do desenvolvimento ionic.

## Criando uma tela

Exemplo, tela de cadastro. Url /cadastro/

* edita www/coffee/routes.coffee e adiciona

```
$stateProvider.state 'register',
  url: '/cadastro'
  templateUrl: 'templates/register.html'
  controller: 'RegisterCtrl'
``` 

* cria www/coffee/controllers/RegisterCtrl.coffee

```
app.controller 'RegisterCtrl', ['$scope', ($scope) ->

]
```
* adiciona RegisterCtrl ao www/index.html

```
<script src="js/controllers/RegisterCtrl.js"></script>
```

* cria www/templates/register.html 
```
<p>register.html</p>
```

* verifica se carregou corretamente no navegador