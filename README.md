# Parcel boilerplate

## 🚀 Tech Stack

![Parcel](https://img.shields.io/badge/-Parcel-FF6C37?logo=parcel&logoColor=white&style=flat-square)
![HTML](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=flat-square)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat-square)
![Sass](https://img.shields.io/badge/-Sass-CC6699?logo=sass&logoColor=white&style=flat-square)
![Handlebars](https://img.shields.io/badge/-Handlebars.js-f0772b?logo=handlebarsdotjs&logoColor=white&style=flat-square)
![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white&style=flat-square)
![Notiflix](https://img.shields.io/badge/-Notiflix-FF3D00?logoColor=white&style=flat-square)
![Spin.js](https://img.shields.io/badge/-Spin.js-00BFA5?logoColor=white&style=flat-square)
![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white&style=flat-square)
![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white&style=flat-square)


## Скрытые файлы

Включите отображение скрытых файлов и папок в проводнике своей операционной системы, иначе вы не
сможете выбрать и скопировать себе файлы настроек проекта, имена которых начинаются с точки.

## Зависимости

На компьютере должена быть установлена LTS-версия [Node.js](https://nodejs.org/en/) со всеми
дополнительными инструментами кроме **Chocolatey** - его ставить не нужно.

## Перед началом работы

Один раз на проект установить все зависимости.

```shell
npm ci
```

### Разработка

Запустить режим разработки.

```shell
npm run dev
```

Во вкладке браузера перейти по адресу [http://localhost:1234](http://localhost:1234).

### Деплой

Сборка будет автоматически собирать и деплоить продакшен версию проекта на GitHub Pages, в ветку
`gh-pages`, каждый раз когда обновляется ветка `main`. Например, после прямого пуша или принятого
пул-реквеста. Для этого необходимо в файле `package.json` отредактировать поле `homepage` и скрипт
`build`, заменив `имя_пользователя` и `имя_репозитория` на свои.

```json
"homepage": "https://имя_пользователя.github.io/имя_репозитория",
"scripts": {
  "build": "parcel build src/*.html --public-url /имя_репозитория/"
},
```

На всякий случай стоит зайти в настройки репозитория `Settings` > `Pages` и убедиться что продакшен
версии файлов раздаются из папки `/root` ветки `gh-pages`.

Через какое-то время живую страницу можно будет посмотреть по адресу указанному в отредактированном
свойстве `homepage`, например
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

## Файлы и папки

- Все паршалы файлов стилей должны лежать в папке `src/sass` и импортироваться в
  `src/sass/main.scss`
- Изображения добавляйте в папку `src/images`, заранее оптимизировав их. Сборщик просто копирует
  используемые изображения чтобы не нагружать систему оптимизацией картинок, так как на слабых
  компьютерах это может занять много времени.
