import express from "express";
import bodyParser from "body-parser";

let books = [{
    id: '0001',
    name: 'Book_0001',
    price: '1600.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/book_0001.jpg',
    averageRating: '5.0',
  }, {
    id: '0002',
    name: 'Book_0002',
    price: '1200.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/Book_0002.jpg',
    averageRating: '2.0',
  }, {
    id: '0003',
    name: 'Book_0003',
    price: '900.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/Book_0003.jpg',
    averageRating: '3.0',
  }];

const app = express();
app.use(bodyParser.json());

//取得所有資料, 路徑 http://localhost:8000/api/books
app.get('/api/books', (req, res) => {
    // 成功會返回jason
    res.status(200).json(books);
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