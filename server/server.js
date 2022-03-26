require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.get('/api/v1/restaurants', async (req, res) => {

  try {
    const results = await db.query('select * from restaurants');
    res.json({
      status: 'good!',
      results: results.rows.length,
      data: {
        restaurants: results.rows
      }
    });

  } catch (err) {
    console.log(err);
  }
});

app.get('/api/v1/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const restaurant = await db.query("select * from restaurants where id=$1", [restaurantId]);
    res.json({
      status: 'success',
      restaurant: restaurant.rows
    })

  } catch (err) {
    console.log(err);
  }
})

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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});