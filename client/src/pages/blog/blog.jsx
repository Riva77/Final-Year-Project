// import { useState } from "react";
// import TextInput from "../../components/inputField/TextInput";
// import TextArea from "../../components/inputField/TextArea";
// import FileInput from "../../components/inputField/FileInput";
// import CustomButton from "../../components/buttons/CustomButton";
// import { toastError, toastSuccess } from "../../../utils/toast";
// import { useCallback } from "react";
// import { addProduct } from "../../../apis/addProduct";
// import axios from "axios";
// import { Preview } from "@mui/icons-material";

// // import { addProduct } from "../../../apis/addProduct";

// const Blog = () => {
//   const initialFormData = {
//     name: "",
//     price: "",
//     description: "",
//     image: "",
//     author: "",
//     synopsis: "",
//     genre: "",
//     publisher: "",
//     pages: "",
//     date: "",
//   };
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: "",
//     author: "",
//     synopsis: "",
//     genre: "",
//     publisher: "",
//     pages: "",
//     date: "",
//   });

//   const [file, setFile] = useState({
//     preview: "",
//     data: "",
//   });

//   const changeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = useCallback((e) => {
//     const file = e.target.files[0];
//     // const name = file.name;
//     if (!file) {
//       toastError("Please select a file");
//     }

//     setFile({
//       preview: URL.createObjectURL(file),
//       data: file,
//     });
//     console.log(file);
//   }, []);

//   const cloudinaryUpload = async (form) => {
//     const response = await axios.post(
//       "http://localhost:8000/api/cloudinary",
//       form,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     return response;
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append("file", file.data);

//     const cloudinaryResponse = await cloudinaryUpload(form); //vako img file lai cloudinary ma upload gareko
//     console.log(cloudinaryResponse); //just check garya

//     if (cloudinaryResponse.status === 200) {
//       console.log(formData);

//       // Cloudinary bata return aako response url lai form data ko img ma assign/save garya (string ma kina vani backend ma img string ma save hunxa)
//       if (cloudinaryResponse.data.url) {
//         formData.image = cloudinaryResponse.data.url;
//       }
//       const response = await addProduct(formData);
//       if (response.success) {
//         toastSuccess(response.message);
//         setFormData(initialFormData);
//         setFile({ data: "", preview: "" });
//       } else {
//         toastError(response.error);
//       }
//       console.log("response", response);
//     } else {
//       toastError("Cloudinary upload failed");
//       console.log("error");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.heading}>Add Product</div>
//       <form action="" style={styles.form} onSubmit={submitHandler}>
//         <TextInput
//           type="text"
//           label="Name"
//           name="name"
//           value={formData.name}
//           onChange={changeHandler}
//           style={{ width: "860px" }}
//         />
//         <TextInput
//           type="text"
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={changeHandler}
//           style={{ width: "860px" }}
//         />
//         <TextArea
//           label="Synopsis"
//           name="synopsis"
//           value={formData.synopsis}
//           onChange={changeHandler}
//         />
//         <div style={styles.duoField}>
//           <TextInput
//             type="text"
//             label="Price"
//             name="price"
//             value={formData.price}
//             onChange={changeHandler}
//             style={{ width: "400px" }}
//           />{" "}
//           <TextInput
//             type="text"
//             label="Genre"
//             name="genre"
//             value={formData.genre}
//             onChange={changeHandler}
//             style={{ width: "400px" }}
//           />
//         </div>
//         <div style={styles.duoField}>
//           <TextInput
//             type="text"
//             label="Author"
//             name="author"
//             value={formData.author}
//             onChange={changeHandler}
//             style={{ width: "400px" }}
//           />

//           <TextInput
//             type="text"
//             label="Publisher"
//             name="publisher"
//             value={formData.publisher}
//             onChange={changeHandler}
//             style={{ width: "400px" }}
//           />
//         </div>
//         <div style={styles.duoField}>
//           <TextInput
//             type="text"
//             label="Pages"
//             name="pages"
//             value={formData.pages}
//             onChange={changeHandler}
//             style={{ width: "400px" }}
//           />
//           <TextInput
//             type="text"
//             label="Date"
//             name="date"
//             value={formData.date}
//             onChange={changeHandler}
//             style={{ width: "400px" }}
//           />
//         </div>
//         <FileInput
//           type="file"
//           label="Product Image"
//           name="productImage"
//           onChange={handleFileChange}
//           style={{ width: "400px" }}
//         />
//         <img src={file.preview} width={250} height={300} />
//         <SecondaryButton type="submit" name="Add Product" />
//       </form>
//     </div>
//   );
// };

// export default Blog;

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 30,
//   },

//   heading: {
//     fontSize: "20px",
//     fontWeight: 700,
//   },

//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 20,
//   },
//   duoField: {
//     display: "flex",
//     gap: 20,
//   },
// };
import React from "react";

const Blog = () => {
  return <div>Blog </div>;
};

export default Blog;
