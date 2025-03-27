# Инструкция по установке  

В терминале установить проект:
   ```bash
   npx create-expo-app@latest Mobile_Lab_1
   ```
Далее выполнить очистку от шаблонного кода:
   ```bash
   npm run reset-project
   ```
Затем установить зависимости:
   ```bash
   npm install expo react-native-maps expo-image-picker expo-router
   ```
Приложение запускается по команде
   ```bash
   npx expo start
   ```

##  Краткое описание реализации  
В types.ts были созданы интерфейсы MarkerData для маркеров и ImageData для картинок.  
  
В _layout.tsx был объявлен контекст, описанный в компоненте MarkerContext.tsx -- он нужен для сохранения состояния между экранами.  
  
Компонент MarkerList.tsx представляет собой отображение маркеров на экране. Свойства -- список MarkerData и функция добавления нового маркера, срабатывающая при долгом нажатии.  
  
Компонент ImageList.tsx представляет собой отображение картинок на экране. Свойства -- список ImageData и функция удаления картинки, срабатывающая по кнопке Удалить.  
  
В index.tsx отображается карта при помощи MapView и маркеры при помощи MarkerList. Здесь объявлен роутер, который переключает экраны, и вызывается контекст, который сохраняет маркеры.  
  
В marker/[id].tsx отображаются картинки при помощи ImageList и кнопка Добавить изображение. Здесь используется id, который был получен при создании маркера, и контекст, из которого можно получить текущий маркер. При нажатии на кнопку Добавить изображение срабатывает функция addImage, которая в текущий маркер добавляет картинку, а по кнопке Удалить срабатывает функция deleteImage, которая удаляет картинку из маркера. Добавление и удаление картинок сохраняется в контексте.  

##  Проблемы или ограничения  
Экран "marker/[id]", согласно _layout.tsx, должен называться Детали, но по какой-то причине приложение выбрасывает в консоль ошибку: No route named "markers/[id]" exists in nested children: ["index", "_sitemap", "+not-found", "marker/[id]"]  
  
Приложение не запускается в браузере и на устройстве Huawei (из-за санкций смартфон не поддерживает гугл-сервисы)  
