const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const ObjectId = require('mongodb').ObjectId;

// const port = process.env.PORT || 5000 ;
const port = 5000 ;

const cors= require('cors');

app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://mydbuser1:7ph3TFXr5LwOMErj@cluster0.hes3p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async  function run (){
    try{
        await client.connect();
        const database =client.db('foodCluster');
        const usersCollection = database.collection('users');

        app.get('/users/:id' ,async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const user = await usersCollection.findOne(query)
            console.log('load user' , id)
            res.send(user)
        });

        // get api 
        app.get('/users', async (req, res)=>{
            const cursor = usersCollection.find({});
            const users= await cursor.toArray();
            res.send(users)
        })
    //    post api 

            app.post('/users', async(req, res) => {
                const newUser= req.body;
                const result = await usersCollection.insertOne(newUser)
                console.log('hit the post', req.body)
                console.log('addd user' ,req.body)
                console.log(result)
                    res.send('hit the post')
            });

           

            // deleat api

            app.delete('/users/:id', async(req , res)=>{
                const id = req.params.id;

                const query = {_id: ObjectId(id)};
                const result = await usersCollection.deleteOne(query);
                console.log(result)
                console.log("delete id " ,id);
                res.json(reault)
            });

      
    }finally{
        // await client.close()
    }

}

run().catch(console.dir);






// const uri = "mongodb+srv://mydbuser1:7ph3TFXr5LwOMErj@cluster0.hes3p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("foodmaster").collection("user");
//   // perform actions on the collection object
//   console.log('hitting the database')
// const user ={name:'opu bisshas', email: 'opu@gmail.com',phone: '017125454522'}
//   collection.insertOne(user)
//   .then( ()=>{
//       console.log('insert database')
//   })
// //   client.close();
// });

// Replace the uri string with your MongoDB deployment's connection string.
// const uri = "<connection string uri>";


// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("foodmaster");
//     const usersCollection = database.collection("users");
//     // create a document to insert
//     const doc = {
//       title: "special one ",
//       email: "special@hotmail.com",
//     }
//     const result = await usersCollection.insertOne(doc);
//     console.log(`A document was inserted with the _id: ${result.insertedId}`);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);






app.get('/', (req , res)=>{
    res.send('mongodb')
});

// pass: 7ph3TFXr5LwOMErj     user  mydbuser1

app.listen(port, ()=>{
    console.log("running port",port)
});


