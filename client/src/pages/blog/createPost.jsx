import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomButton from "../../components/buttons/CustomButton";
import TextInput from "../../components/inputField/TextInput";
import FileInput from "../../components/inputField/FileInput";
import { useCallback } from "react";
import { toastError, toastSuccess } from "../../utils/toast";
import axios from "axios";
import { createPost } from "../../apis/blog/createPost";
import { useSelector } from "react-redux";
import TextArea from "../../components/inputField/TextArea";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/userProvider";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialFormData = {
    title: "",
    summary: "",
    content: "",
    image: "",
    user: "",
  };
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
    user: "",
  });

  const [file, setFile] = useState({
    preview: "",
    data: "",
  });

  const userId = useSelector((state) => state.user.data?._id);
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    // const name = file.name;
    if (!file) {
      toastError("Please select a file");
    }

    setFile({
      preview: URL.createObjectURL(file),
      data: file,
    });
    console.log(file);
  }, []);

  //Image cloudinary ma upload garni
  const cloudinaryUpload = async (form) => {
    console.log(form)
    
    const response = await axios.post(
      "http://localhost:8000/api/cloudinary",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    formData.user = userId;
    //check if formaData has empty fields or fields with only space  and return a error
    for (const key in formData) {
      if (key === "image") continue;
      if (formData[key].trim() === "") {
        setLoading(false);
        toastError("Please fill all the fields");
        return;
      }
    }
    if (!file.data){
      toastError("No file selected!")
      return;
    }
    const form = new FormData();
    form.append("file", file.data);

    const cloudinaryResponse = await cloudinaryUpload(form); //vako img file lai cloudinary ma upload gareko
    console.log(cloudinaryResponse); //just check garya

    if (cloudinaryResponse.status === 200) {
      console.log(formData);

      // Cloudinary bata return aako response url lai form data ko img ma assign/save garya (string ma kina vani backend ma img string ma save hunxa)
      if (cloudinaryResponse.data.url) {
        formData.image = cloudinaryResponse.data.url;
      }
      const response = await createPost(formData);
      if (response.success) {
        toastSuccess("Blog posted successfully");
        setFormData(initialFormData);
        setFile({
          preview: "",
          data: "",
        });
        setLoading(false);
        navigate("/blog");
      } else {
        setLoading(false);
        toastError(response.error);
      }

      console.log("response", response);
    } else {
      setLoading(false);
      toastError("Cloudinary upload failed");
      console.log("error");
    }
  };

  //console.log("user", userData);
  return (
    <section
      style={{
        background: "#F1EEE3",
        // height: "100vh",
        display: "flex",
        justifyContent: "center",
        // alignItems: "end",
      }}
    >
      <section
        style={{
          background: "#FDFBF7",
          // height: "100vh",
          width: "1100px",
          padding: "100px ",
          // display: "flex",
          // flexDirection: "column",
          // gap: 30,
        }}
      >
        <div style={styles.container}>
          <h1>Create a new Blog Post</h1>
          <form onSubmit={submitHandler} style={styles.form}>
            <TextInput
              type="title"
              name="title"
              label="Title"
              value={formData.title}
              onChange={changeHandler}
            />
            <TextArea
              type="summary"
              name="summary"
              label="Summary"
              value={formData.summary}
              onChange={changeHandler}
            />

            {/* <img src={file.preview} width={250} height={300} /> */}

            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(newValue) =>
                setFormData({ ...formData, content: newValue })
              }
              modules={modules}
              formats={formats}
              style={{
                height: "400px",
                width: "860px" /* Specify your desired height here */,
              }}
            />

            <FileInput
              type="file"
              // label="Product Image"
              name="productImage"
              onChange={handleFileChange}
              style={{ width: "400px" }}
            />

            <CustomButton isDisabled={loading} type="submit" name="Submit" />
          </form>
        </div>
      </section>
    </section>
  );
};

export default CreatePost;

const styles = {
  container: {
    // margin: "165px",
    padding: "50px",
    display: "flex",
    gap: 20,
    flexDirection: "column",
  },

  form: {
    display: "flex",
    gap: 50,
    flexDirection: "column",
  },
};
