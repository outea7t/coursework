# Курсовая работа по дисциплине "Базы данных"

Кроссплатформенное десктопное приложение на **Electron + React + TypeScript** для расчёта параметров цепной передачи.  
Приложение позволяет задавать исходные (эмпирические) параметры, выбирать условия работы передачи и получать расчёт:
- коэффициентов нагрузки и эксплуатации;
- параметров долговечности шарниров;
- эквивалентной полезной нагрузки и давлений в шарнирах.

---

## Стек

- **Electron** — десктопное приложение
- **React 18 + TypeScript** — интерфейс и логика
- **Vite** — сборка и dev-сервер

---

## Требования

- Node.js **≥ 20**
- npm **≥ 10**

---

## Установка

```bash
git clone https://github.com/outea7t/coursework.git
cd coursework
npm install
```

## Запуск
```bash
npm run build                                                             ─╯
npm run start
```

## Запуск в режиме разработки
```bash
npm run dev
```

## Структура проекта
```text
electron/
  main.ts          # Точка входа Electron (main process)
src/
  domain/
    formulas.ts    # Формулы расчёта
    tables.ts      # Табличные коэффициенты
    types.ts       # Типы входных/выходных параметров
  renderer/
    App.tsx        # Основной интерфейс
    main.tsx       # Вход для React
    theme.css      # Оформление
index.html         # Шаблон для Vite
vite.config.mjs    # Конфигурация Vite
tsconfig.json      # Конфигурация TypeScript
```
