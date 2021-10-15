
// Requiring fs module in which
// writeFile function is defined.
import apiResults from './api_results.js';
import * as fs from 'fs';

const bio_arr = ['Friendship is the marriage of the soul, and this marriage is liable to divorce.', 'An optimist is a person who sees a green light everywhere, while the pessimist sees only the red spotlight... The truly wise person is color-blind.', 'A goal without a plan is just a wish.', 'Those who dare to fail miserably can achieve greatly.', 'A man should look for what is, and not for what he thinks should be.', 'My best friend is the one who brings out the best in me.', 'Be slow to fall into friendship; but when thou art in, continue firm and constant.', 'Wherever a man turns he can find someone who needs him.', 'Difficulties increase the nearer we get to the goal.', 'Instead of saying that man is the creature of circumstance, it would be nearer the mark to say that man is the architect of circumstance.', 'To make no mistakes is not in the power of man; but from their errors and mistakes the wise and good learn wisdom for the future.', 'It is common sense to take a method and try it. If it fails, admit it frankly and try another. But above all, try something.', 'If you correct your mind, the rest of your life will fall into place.', 'All our knowledge begins with the senses, proceeds then to the understanding, and ends with reason. There is nothing higher than reason.', 'Your work is to discover your world and then with all your heart give yourself to it.', 'Study the past, if you would divine the future.', 'Your big opportunity may be right where you are now.', 'Character is like a tree and reputation like a shadow. The shadow is what we think of it; the tree is the real thing.', 'Interestingly, according to modern astronomers, space is finite. This is a very comforting thought-- particularly for people who can never remember where they have left things.', 'It requires wisdom to understand wisdom: the music is nothing if the audience is deaf.'];
const users = apiResults().results;

const file_name = 'posts.txt';

fs.open(file_name, 'w', (err) => {
    console.log(err);
})

for (let i = 1; i <= 200; i++)
{    
    //VARIABLES
    const user = users[(i-1)%20];
    const name = user.name.first + ' ' + user.name.last;
    const geotag = user.location.city + ', ' + user.location.state;
    const email = user.email;
    const username = user.login.username;
    const pass = user.login.password;
    const media = user.picture.medium;
    const bio = bio_arr[(i-1)%20];
    const likes = Math.floor(Math.random() * 1000) + 1;
    const visible = Math.floor(Math.random() * 2);

    
    const randomNull1 = Math.floor(Math.random() * 2);
    const randomNull2 = Math.floor(Math.random() * 2);
    const randomNull3 = Math.floor(Math.random() * 2);
    const randomNull4 = Math.floor(Math.random() * 2);
    
    const ad_rev = Math.floor(Math.random() * 1000) + 1;
    const times_link_clicked = Math.floor(Math.random() * 1000) + 1;
    const cost_of_promotion = Math.floor(Math.random() * 1000) + 1;
    const sponsor_money = Math.floor(Math.random() * 1000) + 1;

    //QUERIES START
    let profile_query = `INSERT INTO profile(user_id, email, bio, name) VALUES(${i},`;
    let posts_query = `INSERT INTO posts(author_id, caption, geotag, media_id, date_posted) VALUES(${i},`;
    let media_query = `INSERT INTO media(media_url) VALUES(`;
    let likes_query = `INSERT INTO likes(post_id, num_likes, visible) VALUES(${i},`;
    let users_query = `INSERT INTO users(username, password, email, vis_likes) VALUES('${username}','${pass}',`;
    let post_rev_query = `INSERT INTO post_revenue(post_id, money_recipient, ad_revenue, times_link_clicked, cost_of_promotion, sponsor_money) VALUES (${i},${(i%20) + 1},`;

    //CONSTRUCTING QUERY
    if(randomNull1){
        post_rev_query = post_rev_query + `${ad_rev},`;
        profile_query = profile_query + `'${email}',`;
        posts_query = posts_query + `'${bio}',`;
        users_query = users_query + `'${email}',`;
        
    } else{
        post_rev_query = post_rev_query + `NULL,`;
        profile_query = profile_query + `NULL,`;
        posts_query = posts_query + `NULL,`;
        users_query = users_query + `NULL,`;
    }

    if(randomNull2){
        post_rev_query = post_rev_query + `${times_link_clicked},`;

        profile_query = profile_query + `'${bio}','${name}');`;

        posts_query = posts_query + `'${geotag}','${i}', now());`;

        users_query = users_query + `${visible});`; 
    } else{

        post_rev_query = post_rev_query + `NULL,`;

        profile_query = profile_query + `NULL,'${name}');`;

        posts_query = posts_query + `NULL,'${i}', now());`;

        users_query = users_query + `NULL);`; 
    }
    
    if(randomNull3){

        post_rev_query = post_rev_query + `${cost_of_promotion},`;

        media_query = media_query + `'${media}');`;
    } else{

        post_rev_query = post_rev_query + `NULL,`;

        media_query = media_query + `NULL);`;
    }

    if(randomNull4){

        post_rev_query = post_rev_query + `${sponsor_money});`;

        likes_query = likes_query + `${likes},${visible});`;
    } else{

        post_rev_query = post_rev_query + `NULL);`;

        likes_query = likes_query + `${likes},NULL);`;
    }
    
    fs.appendFile(file_name, post_rev_query + '\n\n', (err) => {
        if(err)
            console.error(err);
    })

    //console.log(users_query, '\n'); //GOOD
    //console.log(media_query, '\n'); //GOOD
    //console.log(profile_query, '\n'); //GOOD
    //console.log(posts_query, '\n') //GOOD
    //console.log(likes_query, '\n'); //GOOD
    //console.log(post_rev_query, '\n'); //GOOD
}



