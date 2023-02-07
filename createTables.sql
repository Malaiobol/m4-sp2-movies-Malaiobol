CREATE DATABASE movies_data;

CREATE TABLE IF NOT EXISTS movies_list (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR,
    duration NUMERIC(10, 2),
    price NUMERIC
);

INSERT INTO
    movies_list(name, description, price, duration)

VALUES
    ('teste1', 'teste1', 111.00, 1.11),
    ('teste2', 'teste2', 222.00, 1.22),
    ('teste3', 'teste3', 333.00, 1.33),
    ('teste4', 'teste4', 444.00, 1.44),
    ('teste5', 'teste5', 555.00, 1.55);