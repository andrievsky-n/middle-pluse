## Как использовать?

Допустим мы хотим вставить иконку с названием fb и добавить ей класс `icon__btn`. Для этого вызываем компонент `icon` и передаем ему аргументы `icon` и `class`:

```twig
{% include "@icon" with { icon: 'fb', class: 'btn__icon' } %}
```

Это превратится в такой html:

```html
<svg class="icon icon_fb btn__icon">
    <use xlink:href="/assets/images/icons.svg#icon_fb" />
</svg>
```
