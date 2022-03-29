require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

//get all restaurants data and reviews
app.get('/api/v1/restaurants', async (req, res) => {

  try {
    const restaurantRatingsData = await db.query('select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;');
    res.json({
      status: 'success',
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows
      }
    });

  } catch (err) {
    console.log(err);
  }
});

//get a restaurant data and review
app.get('/api/v1/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;
  try {

    const restaurant = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id=$1;", [restaurantId]);
    const reviews = await db.query("select * from reviews where restaurant_id=$1", [restaurantId]);

    res.json({
      status: 'success',
      restaurant: restaurant.rows,
      reviews: reviews.rows
    })

  } catch (err) {
    console.log(err);
  }
})

//create a restaurant in db
app.post('/api/v1/restaurants', async (req, res) => {

  try {
    const newRestaurant = await db.query(
      "insert into restaurants (name, location, price_range) values ($1,$2,$3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status('201').json({
      status: 'success',
      data: {
        restaurant: newRestaurant.rows[0]
      }
    })


  } catch (err) {
    console.log(err);
  }

})

//update a restaurant in db
app.put('/api/v1/restaurants/:id', async (req, res) => {

  try {
    const editRestaurant = await db.query(
      "update restaurants set name = $1, location =$2, price_range=$3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status('200').json({
      status: 'success',
      data: {
        restaurant: editRestaurant.rows[0]
      }
    })

  } catch (err) {
    console.log(err);
  }

})

//remove a restaurant from db
app.delete('/api/v1/restaurants/:id', async (req, res) => {

  try {
    const deleteRestaurant = await db.query(
      "delete from restaurants where id=$1",
      [req.params.id]);

    res.status('200').json({
      status: 'success',
    })

  } catch (err) {
    console.log(err);
  }
})

//add a review into db
app.post('/api/v1/restaurants/:id/review', async (req, res) => {

  try {
    const addReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1,$2,$3,$4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    )
    console.log('XXXXYYY',addReview)
    res.status(201).json({
      status: 'success',
      data:{
        review: addReview.rows[0]
      }
    })

  } catch (err) {
    console.log(err);
  }

})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});