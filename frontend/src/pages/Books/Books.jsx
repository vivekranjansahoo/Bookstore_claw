import React, { useEffect, useState } from "react";
import { bookimgurl } from "../../Utils/image";
import axios from "axios";
import {
  newbookRoute,
  allbooks,
  onebookroute,
  updateBook,
  deleteBook,
} from "../../routes/Allroutes";
const Books = () => {
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState(bookimgurl);
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [yearofpublished, setyearofpublished] = useState("");
  const [book, setbook] = useState([]);
  const [onebook, setonebook] = useState([]);

  const handleaddnewbook = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(newbookRoute, {
        title,
        author,
        price,
        image,
        category,
        description,
        yearofpublished,
      });
      console.log(response);
      if (response.data) {
        alert("success");
      }
    } catch (error) {
      alert("error");
    }
  };

  const handleallbooks = async () => {
    try {
      const responsebook = await axios.get(allbooks);
      console.log(responsebook);
      setbook(responsebook.data);
    } catch (error) {
      alert("error");
    }
  };

  useEffect(() => {
    handleallbooks();
  }, []);

  const handlemodal = async (id) => {
    document.getElementById("modal_update").showModal();
    console.log(id);
    try {
      const res = await axios.get(`${onebookroute}/${id}`);
      console.log(res);
      setonebook(res.data);
    } catch (error) {
      alert("error in update");
    }
  };

  const handldelete = async (id) => {
    console.log(id);
    try {
      const resss = await axios.delete(`${deleteBook}/${id}`);
      console.log(resss);
      if (resss.data.message == "Book deleted successfully") {
        alert("delete successful");
      }
    } catch (error) {
      alert("error in deleting book");
    }
  };

  const handleupdate = async (id) => {
    try {
      const ress = await axios.put(`${updateBook}/${id}`, {
        title,
        author,
        price,
        image,
        category,
        description,
        yearofpublished,
      });
      console.log(ress);
      if (ress.data.message == "Book updated successfully") {
        alert("update successful");
      }
    } catch (error) {
      alert("error");
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <button
          className="btn btn-warning"
          onClick={() => document.getElementById("modalnewbook").showModal()}
        >
          Add Book
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Yearofpublished</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* row 1 */}
            {book.data &&
              book.data.map((card, index) => (
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={card.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{card.title}</div>
                        <div className="text-sm opacity-50">{card.author}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {card.description}
                    <br />
                  </td>
                  <td>{card.category}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      {card.price}
                    </button>
                  </th>
                  <th>
                    <h3>{card.yearofpublished}</h3>
                  </th>
                  <th>
                    <button
                      className="btn btn-info mr-4"
                      onClick={() => handlemodal(card._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => handldelete(card._id)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}

            <dialog
              id="modalnewbook"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Add new the Product!</h3>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <br />
                <span className="mr-10">Title</span>
                <input
                  type="text"
                  placeholder="Title here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => settitle(e.target.value)}
                />
                <br />
                <br />
                <span className="mr-6">Author</span>
                <input
                  type="text"
                  placeholder="author name"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setauthor(e.target.value)}
                />
                <br />
                <br />
                <span className="mr-10">Price</span>
                <input
                  type="text"
                  placeholder="price"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setprice(e.target.value)}
                />
                <br />
                <br />
                <span className="mr-4">Category</span>
                <input
                  type="text"
                  placeholder="category"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setcategory(e.target.value)}
                />
                <br />
                <br />
                <span className="mr-10">Desc</span>
                <input
                  type="text"
                  placeholder="desc"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setdescription(e.target.value)}
                />
                <br />
                <br />
                <span className="mr-10">YOP</span>
                <input
                  type="text"
                  placeholder="YYYY"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setyearofpublished(e.target.value)}
                />
                <div className="mt-5 flex justify-center">
                  <button
                    className="btn btn-success"
                    onClick={handleaddnewbook}
                  >
                    Save
                  </button>
                </div>
              </div>
            </dialog>

            <dialog
              id="modal_update"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Update the Product!</h3>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <br />
                <span className="mr-10">Title</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder={onebook.title}
                  onChange={(e) => settitle(e.target.value)}
                />
                <br />
                <br />
                <span className="mr-6">Author</span>
                <input
                  type="text"
                  placeholder={onebook.author}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setauthor(e.target.value)}
                />
                <br />
                <br />
                <span className="mr-10">Price</span>
                <input
                  type="text"
                  placeholder={onebook.price}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setprice(e.target.value)}
                />
                <br />
                <br />
                <span className="mr-4">Category</span>
                <input
                  type="text"
                  placeholder={onebook.category}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setcategory(e.target.value)}
                />
                <br />
                <br />
                <span className="mr-10">Desc</span>
                <input
                  type="text"
                  placeholder={onebook.description}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setdescription(e.target.value)}
                />
                <br />
                <br />
                <span className="mr-10">YOP</span>
                <input
                  type="text"
                  placeholder={onebook.yearofpublished}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setyearofpublished(e.target.value)}
                />
                <div className="mt-5 flex justify-center">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleupdate(onebook._id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </dialog>

            {/* row 4 */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Books;
