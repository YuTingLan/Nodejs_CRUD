import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';


const app = express();
app.use(bodyParser.json());

//取得所有資料, 路徑 http://localhost:8000/api/books
app.get('/api/books', async (req, res) => {
    const client = await MongoClient.connect(
        'mongodb://localhost:27017',
        { useNewUrlParser: true, useUnifiedTopology: true },
    );

    const db = client.db('nodejs_CRUD');
    const books = await db.collection('book').find({}).toArray();
    
    res.status(200).json(books);
    client.close();
});

// 取得單一資料, api/books/0001
app.get('/api/books/:bookId', (req, res) => {
    // req.params = /:bookId
    const { bookId } = req.params;
    const book = books.find((book) => book.id === bookId);
    if(book){
        res.status(200).json(book);
    }
    else{
        res.status(404).json('Book Not Found!');
    }
});

// create a new book
app.post('/api/books', (req, res) => {
    const { id, name, price, description, imageUrl, averageRating } = req.body;
    const newBook = {  id, name, price, description, imageUrl, averageRating };

    books.push(newBook);
    res.status(200).json('Create Successfully!');
});

// update a new book
app.post('/api/books/:bookId', (req, res) => {
    // req.params = /:bookId
    const { bookId } = req.params;
    const { id, name, price, description, imageUrl, averageRating } = req.body;

    const book = books.find((book) => book.id === bookId);
    if(book){
        book.id = id;
        book.name = name;
        book.price = price;
        book.description = description;
        book.imageUrl = imageUrl;
        book.averageRating = averageRating;

        res.status(200).json('Book Update!');
    }
    else{
        res.status(404).json('Book Not Found!');
    }
});

// delete a new book
app.delete('/api/books/:bookId', (req, res) => {
    // req.params = /:bookId
    const { bookId } = req.params;
    // 刪除指定的bookId
    books = books.filter(book => (book.id != bookId))
    res.status(200).json('Delete Successfully!')
});

// 監聽 PORT：8000
app.listen(8000, () => {
    console.log('listening on port8000');
});