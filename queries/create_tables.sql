CREATE TABLE users(user_id SERIAL PRIMARY KEY, username VARCHAR(50), password VARCHAR(30), email VARCHAR(30), vis_likes INTEGER);

CREATE TABLE profile(profile_id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(user_id), email VARCHAR(50), bio VARCHAR(250), name VARCHAR(50));

CREATE TABLE posts(post_id SERIAL PRIMARY KEY, author_id INTEGER REFERENCES users(user_id), caption VARCHAR(200), geotag VARCHAR(75), media_id INTEGER REFERENCES media(media_id), date_posted TIMESTAMP);

CREATE TABLE media(media_id SERIAL PRIMARY KEY, media_url VARCHAR(500));

CREATE TABLE likes(like_id SERIAL PRIMARY KEY, post_id INTEGER REFERENCES posts(post_id),  num_likes INTEGER, visible INTEGER);

--New Table
CREATE TABLE post_revenue(post_rev_id SERIAL PRIMARY KEY, post_id INTEGER REFERENCES posts(post_id), money_recipient INTEGER REFERENCES users(user_id), ad_revenue INTEGER, times_link_clicked INTEGER, cost_of_promotion INTEGER, sponsor_money INTEGER);
