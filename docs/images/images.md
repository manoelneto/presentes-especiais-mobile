# Imagens

Como trabalhar com imagens

## Pasta de imagens

  www/img

## Sprite

Não há necessidade de fazer sprite, ou seja, pegar todos os ícones e colocar em 1 unico arquivo, referenciar ele ao inves da imagem pra evitar requisição, ja que não vai fazer requisição http pra pegar as imagens, mas pra facilitar o desenvolvimento, foi desenvolvido um esquema de sprite.

*   do psd, gere 2 arquivos

```
nome_do_arquivo.png
nome_do_arquivo@2x.png
```

* o @2x é o mesmo arquivo com o dobro do tamanho, isso pra dispositivos retinas

* Dica o plugin cut and slice me do photoshop faz isso

* coloque na pasta img

* Abra o arquivo de imagens do scss

```
scss/_images.scss
```

* adicione o nome da imagem que foi adicionada ao each.

pronto, agora só utilizar a imagem no código

```
<i class="nome_do_arquivo"></i>
```
