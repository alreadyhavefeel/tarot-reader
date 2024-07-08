About this project
Tarot-Reader Project is a for summary of learning with Dr.Angela with The Complete 2024 Web Development.

## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database
1. This project use local PostgreSQL for keeping card reader detail.
2. You can download and install pgAdmin 4 [https://www.postgresql.org/download/]
3. Create database as you want.
4. Create table name cards, categories and cardcategories (You can only create a cards table for this part!)
    4.1 In cards tables store a column name following 1.card_id 2.name 3.name_th 4.image_url 5.description 6.work_meaning 7.money_meaning 8.love_meaning 9.health_meaning

```bash
CREATE TABLE cards (
    card_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_th VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    description TEXT,
    work_meaning TEXT,
    money_meaning TEXT,
    love_meaning TEXT,
    health_meaning TEXT
);
```
5. config .env for connection database

Starting explore
