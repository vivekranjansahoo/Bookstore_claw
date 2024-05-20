const Book = require("../models/book.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

//new book save
module.exports.newbook = async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.price ||
      !request.body.image ||
      !request.body.description ||
      !request.body.category ||
      !request.body.yearofpublished
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: title, author, price,image,description,catagory,yearofpublished",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      price: request.body.price,
      image: request.body.image,
      description: request.body.description,
      category: request.body.category,
      yearofpublished: request.body.yearofpublished,
    };

    const book = await Book.create(newBook);

    return response.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

//get all books
module.exports.allbooks = async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

//particular one book
module.exports.onebook = async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

//update the book details
module.exports.updateBook = async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.price ||
      !request.body.image ||
      !request.body.description ||
      !request.body.category ||
      !request.body.yearofpublished
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

//delete a book
module.exports.deleteBook = async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};
