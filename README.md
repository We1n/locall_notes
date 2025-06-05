<div align="center">

  <!-- Замените на URL вашего логотипа, если он есть, или удалите эту строку -->
  <!-- <img src="URL_К_ВАШЕМУ_ЛОГОТИПУ" alt="Project Logo" width="150"/> -->

  <h1>📝 Заметки: Онлайн и Офлайн / Notes: Online & Offline</h1>

  <p>
    <strong>Простое и удобное приложение для создания и управления заметками.</strong><br />
    <strong>Simple and convenient application for creating and managing notes.</strong>
  </p>

  <p>
    <a href="#russian-version"><strong>Русская версия</strong></a> ·
    <a href="#english-version"><strong>English Version</strong></a>
  </p>

  <p>
    <!-- Значки (Badges) -->
    <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge" alt="Version"/>
    <!-- Добавьте другие значки, например, лицензию, если она есть -->
    <!-- <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License"/> -->
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  </p>

</div>

---

<a id="russian-version"></a>
<div align="right">
  <a href="#english-version">Switch to English 🇬🇧</a>
</div>

## 🇷🇺 Русская версия

### 🌟 О проекте

**Заметки: Онлайн и Офлайн** — это универсальное приложение, которое поможет вам легко управлять вашими идеями, задачами и любой другой информацией. Оно доступно в двух режимах:
*   **🌍 Офлайн-версия**: Работает прямо в браузере, все данные хранятся локально на вашем устройстве. Идеально для быстрой работы без интернета.
*   **☁️ Онлайн-версия**: Клиент-серверное приложение для доступа к вашим заметкам с любого устройства через веб-интерфейс, с хранением данных на сервере.

### ✨ Ключевые возможности

*   ✍️ **Создание и управление заметками**: Легко добавляйте, просматривайте, редактируйте и удаляйте заметки.
*   🏷️ **Организация**: Используйте теги и категории для структурирования информации.
*   🖼️ **Изображения**: Прикрепляйте изображения к вашим заметкам.
*   🎨 **Темы**: Переключайтесь между светлой и темной темами для комфортной работы.
*   🔄 **Импорт и Экспорт**: Сохраняйте резервные копии (в формате JSON) или переносите данные.
*   🔍 **Поиск и Фильтрация**: Быстро находите нужные заметки.
*   📱 **Два режима**: Полностью офлайн или онлайн с серверной частью.

### 🛠️ Технологический стек

*   **Бэкенд (Онлайн-версия)**:
    *   <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"/> Node.js
    *   <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js"/> Express.js
    *   <img src="https://img.shields.io/badge/Multer-grey?style=flat-square" alt="Multer"/> Multer (для загрузки файлов)
*   **Фронтенд (Обе версии)**:
    *   <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5"/> HTML5
    *   <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3"/> CSS3 (включая <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/> Tailwind CSS для офлайн-версии)
    *   <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"/> JavaScript
*   **Хранение данных**:
    *   Офлайн: `localStorage` браузера.
    *   Онлайн: JSON-файлы на сервере.

### 🖼️ Скриншоты (Офлайн-версия)

<p align="center">
  <img src="notes_offline/screenshot_main.webp" alt="Главный экран офлайн-версии" width="45%"/>
  <img src="notes_offline/screenshot_edit.webp" alt="Редактирование заметки в офлайн-версии" width="45%"/>
</p>

### 🚀 Начало работы

#### 1. 🌍 Офлайн-версия (`notes_offline`)

1.  Перейдите в папку `notes_offline`.
2.  Откройте файл `notes-offline.html` в вашем браузере.
    *   **Важно**: Данные хранятся в `localStorage` и привязаны к браузеру. Используйте экспорт для бэкапа!

#### 2. ☁️ Онлайн-версия (`notes_online`)

1.  Убедитесь, что у вас установлен [Node.js](https://nodejs.org/).
2.  Откройте терминал в папке `notes_online`.
3.  Установите зависимости: `npm install`
4.  Запустите сервер: `npm start` (или `node server.js`)
5.  Откройте в браузере: `http://localhost:3000`

### 🗺️ Планы развития (Roadmap)

*   [ ] Улучшение безопасности `notes_online` (аутентификация).
*   [ ] Оптимизация хранения данных `notes_online` (например, SQLite).
*   [ ] Синхронизация между офлайн и онлайн версиями.
*   [ ] Расширенный редактор текста (Markdown/WYSIWYG).
*   [ ] Улучшение UI/UX.

### 🤝 Участие в разработке

Предложения и пул-реквесты приветствуются! Если у вас есть идеи по улучшению, пожалуйста, создайте Issue или Fork'ните репозиторий и сделайте свои изменения.

1.  Форкните проект.
2.  Создайте свою ветку для фичи (`git checkout -b feature/AmazingFeature`).
3.  Закоммитьте свои изменения (`git commit -m 'Add some AmazingFeature'`).
4.  Отправьте в удаленный репозиторий (`git push origin feature/AmazingFeature`).
5.  Откройте Пул-Реквест.

### 📜 Лицензия

Этот проект распространяется под лицензией MIT. Подробнее см. в файле `LICENSE`.
*(Примечание: добавьте файл LICENSE в ваш репозиторий, например, с текстом лицензии MIT).*

### 👤 Автор и Поддержка

*   **Автор**: KarpovTatts
*   **Telegram**: [![Telegram](https://img.shields.io/badge/Telegram-KarpovTatts-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/karpovtatts)
*   **Поддержать разработку**: [![Поддержать проект](https://img.shields.io/badge/Поддержать%20Проект-Донат-ff69b4?style=for-the-badge)](https://pay.cloudtips.ru/p/86838cfa)

---
<div align="center"><a href="#top">⬆️ Наверх</a></div>
---

<a id="english-version"></a>
<div align="right">
  <a href="#russian-version">Переключиться на Русский 🇷🇺</a>
</div>

## 🇬🇧 English Version

### 🌟 About The Project

**Notes: Online & Offline** is a versatile application designed to help you easily manage your ideas, tasks, and any other information. It is available in two modes:
*   **🌍 Offline Version**: Runs directly in your browser, with all data stored locally on your device. Perfect for quick work without an internet connection.
*   **☁️ Online Version**: A client-server application to access your notes from any device via a web interface, with data stored on the server.

### ✨ Key Features

*   ✍️ **Create & Manage Notes**: Easily add, view, edit, and delete notes.
*   🏷️ **Organization**: Use tags and categories to structure your information.
*   🖼️ **Images**: Attach images to your notes.
*   🎨 **Themes**: Switch between light and dark themes for comfortable work.
*   🔄 **Import & Export**: Save backups (in JSON format) or transfer your data.
*   🔍 **Search & Filter**: Quickly find the notes you need.
*   📱 **Dual Mode**: Fully offline or online with a server backend.

### 🛠️ Tech Stack

*   **Backend (Online Version)**:
    *   <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"/> Node.js
    *   <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js"/> Express.js
    *   <img src="https://img.shields.io/badge/Multer-grey?style=flat-square" alt="Multer"/> Multer (for file uploads)
*   **Frontend (Both Versions)**:
    *   <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5"/> HTML5
    *   <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3"/> CSS3 (including <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/> Tailwind CSS for offline version)
    *   <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"/> JavaScript
*   **Data Storage**:
    *   Offline: Browser `localStorage`.
    *   Online: JSON files on the server.

### 🖼️ Screenshots (Offline Version)

<p align="center">
  <img src="notes_offline/screenshot_main.webp" alt="Main screen of offline version" width="45%"/>
  <img src="notes_offline/screenshot_edit.webp" alt="Editing a note in offline version" width="45%"/>
</p>

### 🚀 Getting Started

#### 1. 🌍 Offline Version (`notes_offline`)

1.  Navigate to the `notes_offline` folder.
2.  Open the `notes-offline.html` file in your browser.
    *   **Important**: Data is stored in `localStorage` and is browser-specific. Use export for backups!

#### 2. ☁️ Online Version (`notes_online`)

1.  Ensure you have [Node.js](https://nodejs.org/) installed.
2.  Open your terminal in the `notes_online` folder.
3.  Install dependencies: `npm install`
4.  Start the server: `npm start` (or `node server.js`)
5.  Open in browser: `http://localhost:3000`

### 🗺️ Roadmap

*   [ ] Enhance `notes_online` security (authentication).
*   [ ] Optimize `notes_online` data storage (e.g., SQLite).
*   [ ] Synchronization between offline and online versions.
*   [ ] Advanced text editor (Markdown/WYSIWYG).
*   [ ] UI/UX improvements.

### 🤝 Contributing

Contributions are welcome! If you have ideas for improvement, please open an issue or fork the repository and make your changes.

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

### 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
*(Note: Add a LICENSE file to your repository, e.g., with the MIT License text).*

### 👤 Author & Support

*   **Author**: KarpovTatts
*   **Telegram**: [![Telegram](https://img.shields.io/badge/Telegram-KarpovTatts-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/karpovtatts)
*   **Support Development**: [![Support Project](https://img.shields.io/badge/Support%20Project-Donate-ff69b4?style=for-the-badge)](https://pay.cloudtips.ru/p/86838cfa)

---
<div align="center"><a href="#top">⬆️ Back to Top</a></div>
---
