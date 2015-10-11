# Swiper

Cria um slider com setas

Utiliza o [idangerous.swiper](http://www.idangero.us/swiper)

## Desenvolvido

### Filhos com width variados

```
<swiper-slider class='no-slide-width'>

  <div class="swiper-slide">
    <a href="#">
      <img src="http://placehold.it/20x20" alt="">
      Xícaras
    </a>
  </div>

  <div class="swiper-slide">
    <a href="#">
      <img src="http://placehold.it/20x20" alt="">
      Canecas
    </a>
  </div>

</swiper-slider>
```

## Ideias de implementação

### Filhos com width fixas

Mostrar N slides por tela

Utilizar o atributo data-slide-per-view=2

```
<swiper-slider data-slide-per-view=2>

</swiper-slider>

```
