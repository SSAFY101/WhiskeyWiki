--     CREATE DATABASE IF NOT EXISTS whiskeywiki;

--     use whiskeywiki;

    CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        login_id VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        nickname VARCHAR(255) DEFAULT '',
        address VARCHAR(255) DEFAULT '',
        gender VARCHAR(255) DEFAULT '',
        age INT DEFAULT 0,
        refresh_token VARCHAR(255) DEFAULT '',
        latitude DECIMAL(13, 10),
        longitude DECIMAL(13, 10)
    );

    CREATE TABLE IF NOT EXISTS cocktail (
        cocktail_id INT AUTO_INCREMENT PRIMARY KEY,
        reciepe VARCHAR(255),
        cocktail_name VARCHAR(255),
        detail VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS favorite (
        favorite_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        cocktail_id INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (cocktail_id) REFERENCES cocktail(cocktail_id)
    );


    CREATE TABLE IF NOT EXISTS whiskey (
        whiskey_id INT AUTO_INCREMENT PRIMARY KEY,
        whiskey_name_kr VARCHAR(255),
        whiskey_name_en VARCHAR(255),
        whiskey_flavor TEXT,
        abv DOUBLE,
        price INT,
        detail VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS own_whiskey (
        own_whiskey_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        whiskey_id INT,
        is_empty TINYINT DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (whiskey_id) REFERENCES whiskey(whiskey_id)
    );


    CREATE TABLE IF NOT EXISTS ingredient (
        ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS cocktail_ingredient (
        cocktail_ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
        cocktail_id INT,
        ingredient_id INT,
        FOREIGN KEY (cocktail_id) REFERENCES cocktail(cocktail_id),
        FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id)
    );

    CREATE TABLE IF NOT EXISTS base (
        base_id INT AUTO_INCREMENT PRIMARY KEY,
         cocktail_id INT,
         whiskey_id INT,
         FOREIGN KEY (cocktail_id) REFERENCES cocktail(cocktail_id),
        FOREIGN KEY (whiskey_id) REFERENCES whiskey(whiskey_id)
    );


    CREATE TABLE IF NOT EXISTS review (
       review_id INT AUTO_INCREMENT PRIMARY KEY,
       whiskey_id INT,
       user_id INT,
       review_rating VARCHAR(255),
        content VARCHAR(255),
        created_date DATETIME,
        FOREIGN KEY (whiskey_id) REFERENCES whiskey(whiskey_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

    CREATE TABLE IF NOT EXISTS chatrooms (
        chatroom_id INT AUTO_INCREMENT PRIMARY KEY,
        create_time DATETIME,
        edit_time DATETIME
    );

    CREATE TABLE IF NOT EXISTS user_chatrooms (
        user_chatroom_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        chatroom_id INT,
        trade_intention BOOLEAN DEFAULT false,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (chatroom_id) REFERENCES chatrooms(chatroom_id)
    );


    CREATE TABLE IF NOT EXISTS chats (
        chat_id INT AUTO_INCREMENT PRIMARY KEY,
        user_chatroom_id INT,
        user_id INT,
        is_read BOOLEAN,
        chat_visible BOOLEAN,
        message VARCHAR(255),
        date_time DATETIME,
        FOREIGN KEY (user_chatroom_id) REFERENCES user_chatrooms(user_chatroom_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );