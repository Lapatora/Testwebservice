#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Запуск Testwebservice...${NC}\n"

# Функция для очистки при выходе
cleanup() {
    echo -e "\n${YELLOW}⏹️  Остановка серверов...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo -e "${GREEN}✅ Бэкенд остановлен${NC}"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo -e "${GREEN}✅ Фронтенд остановлен${NC}"
    fi
    exit 0
}

# Устанавливаем обработчик сигналов
trap cleanup SIGINT SIGTERM

# Проверяем наличие .env файла в server
if [ ! -f "server/.env" ]; then
    echo -e "${YELLOW}⚠️  Файл server/.env не найден. Создаю из .env.example...${NC}"
    if [ -f "server/.env.example" ]; then
        cp server/.env.example server/.env
        echo -e "${GREEN}✅ Файл server/.env создан${NC}"
        echo -e "${YELLOW}⚠️  Не забудьте настроить DATABASE_URL в server/.env!${NC}\n"
    else
        echo -e "${RED}❌ Файл server/.env.example не найден!${NC}"
        exit 1
    fi
fi

# Проверяем зависимости бэкенда
if [ ! -d "server/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Зависимости бэкенда не установлены. Устанавливаю...${NC}"
    cd server
    npm install
    cd ..
fi

# Проверяем зависимости фронтенда
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Зависимости фронтенда не установлены. Устанавливаю...${NC}"
    npm install
fi

# Запускаем бэкенд
echo -e "${BLUE}📡 Запуск бэкенда...${NC}"
cd server
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Ждем немного, чтобы бэкенд запустился
sleep 2

# Проверяем, что бэкенд запустился
if ps -p $BACKEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Бэкенд запущен (PID: $BACKEND_PID)${NC}"
    echo -e "${BLUE}   Логи: tail -f backend.log${NC}\n"
else
    echo -e "${RED}❌ Ошибка запуска бэкенда. Проверьте backend.log${NC}"
    exit 1
fi

# Запускаем фронтенд
echo -e "${BLUE}🎨 Запуск фронтенда...${NC}"
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!

# Ждем немного, чтобы фронтенд запустился
sleep 2

# Проверяем, что фронтенд запустился
if ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Фронтенд запущен (PID: $FRONTEND_PID)${NC}"
    echo -e "${BLUE}   Логи: tail -f frontend.log${NC}\n"
else
    echo -e "${RED}❌ Ошибка запуска фронтенда. Проверьте frontend.log${NC}"
    cleanup
    exit 1
fi

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ Серверы запущены!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📡 Бэкенд:${NC} http://localhost:5000"
echo -e "${BLUE}🎨 Фронтенд:${NC} http://localhost:3000"
echo -e "${BLUE}📊 Health check:${NC} http://localhost:5000/api/health"
echo -e ""
echo -e "${YELLOW}Нажмите Ctrl+C для остановки${NC}\n"

# Ждем завершения процессов
wait

