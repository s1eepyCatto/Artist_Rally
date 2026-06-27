import mysql from 'mysql2';

// view mysql via "mysql -u root -p"

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

const sql = `
  DROP DATABASE IF EXISTS ArtistRally;
  CREATE DATABASE ArtistRally;
  USE ArtistRally;

  CREATE TABLE IF NOT EXISTS maps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    map_image VARCHAR(255),
    startdate DATETIME,
    enddate DATETIME,
    UNIQUE(name)
  );

  CREATE TABLE IF NOT EXISTS accounts (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    convention_id INT,
    isArtist BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (convention_id) REFERENCES maps(id)
  );

  CREATE TABLE IF NOT EXISTS artists (
    userid INT PRIMARY KEY,
    artist_handle VARCHAR(255),
    artist_social VARCHAR(255),
    artist_tablenum VARCHAR(50),
    artist_note VARCHAR(255),
    artist_mappos VARCHAR(255),
    FOREIGN KEY (userid) REFERENCES accounts(userid)
  );

  CREATE TABLE IF NOT EXISTS rallies (
    rally_id INT AUTO_INCREMENT PRIMARY KEY,
    rally_name VARCHAR(255),
    fandom VARCHAR(255),
    host_id INT,
    info VARCHAR(255),
    link VARCHAR(255),
    convention_id INT,
    FOREIGN KEY (host_id) REFERENCES accounts(userid),
    FOREIGN KEY (convention_id) REFERENCES maps(id)
  );

  CREATE TABLE IF NOT EXISTS account_liked_rallies (
    account_id INT,
    rally_id INT,
    PRIMARY KEY (account_id, rally_id),
    FOREIGN KEY (account_id) REFERENCES accounts(userid),
    FOREIGN KEY (rally_id) REFERENCES rallies(rally_id)
  );

  INSERT INTO maps (name, address, map_image, startdate, enddate) VALUES
    ('Smash 2026', 'icc convention center', '/data/maps/smash.png', '2025-07-11', '2025-07-13'),
    ('Supanova 2026', 'olympic park', '/data/maps/supanova.png', '2025-06-26', '2025-06-28'),
    ('some other random one', 'idk', '/data/maps/smash.png', '2025-09-14', '2025-09-15');

  INSERT INTO accounts (username, password, convention_id) VALUES
    ('wago',         '1111', 1),
    ('coco',         'a',    1),
    ('miss teacher', 'b',    1),
    ('Vein',         'c',    1),
    ('Ivan',         'abc',  1),
    ('Punisher',     'abc',  1),
    ('Mr Fool',      'abc',  1),
    ('Salad',        'abc',  1),
    ('john wick',    '1111', 1),
    ('a',            'a',    1),
    ('b',            'b',    1),
    ('c',            'c',    1),
    ('abc',          'abc',  1);

  INSERT INTO rallies (rally_name, fandom, host_id, info, link, convention_id) VALUES
    ('limbus company rally',       'Limbus Company',               1, 'an ideal stamp rally',              'www.youtube.com', 1),
    ('olruggio babygirl rally',    'Witch Hat Atelier',            2, 'why is olruggio so babygirl',       'www.youtube.com', 1),
    ('The Magic School Bus rally', 'The Magic School Bus',         3, 'idk i dont remember much from it', 'www.youtube.com', 1),
    ('Link Click rally',           'Link Click',                   4, 'Stop thinkin bout it',             'www.youtube.com', 1),
    ('Doomed Yuri/Yaoi rally',     'Misc',                         5, 'its what the people want',         'www.youtube.com', 1),
    ('ORV rally',                  'Omniscient Readers Viewpoint', 6, 'he died for our sins',             'www.youtube.com', 1),
    ('klein moretti rally',        'Lord of The Mysteries',        7, 'I like trains',                    'www.youtube.com', 1),
    ('Eevee rally',                'Pokemon',                      8, 'Ditto your wallet is gone',        'www.youtube.com', 1);

  INSERT INTO account_liked_rallies (account_id, rally_id) VALUES
    (9, 1),  (9, 3),
    (10, 1), (10, 3),
    (11, 1), (11, 3),
    (12, 1), (12, 3),
    (13, 1), (13, 3);
`;

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Database initialised!");
    con.end();
  });
});