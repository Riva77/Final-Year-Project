import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthorTable from "../../../components/admin/AuthorTable";
import CustomButton from "../../../components/buttons/CustomButton";
import { setAuthorModal } from "../../../features/modalSlice";
import { getAuthor } from "../../../apis/Author/getAuthor";

const  Author = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [author, setAuthor] = useState(null);

  const fetchAuthor = async () => {
    const authorData = await getAuthor();
    setAuthor(authorData?.data);
  };

  useEffect(() => {
    fetchAuthor();
  }, []);



  // Filter products based on the search query
  const filteredAuthor = useMemo(() => {
    return author?.filter((data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [author, searchQuery]);


  const dispatch = useDispatch();
  const handleAddAuthor = () => {
    dispatch(setAuthorModal());
  };

  return (
    <div className="w-full my-2 flex flex-col gap-4">
      <h1 className="flex text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2 items-center"> Author Details</h1>

      <CustomButton type="Add" name="Add  Author"  onClick={handleAddAuthor} />
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search author"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-72 p-2 border border-gray-300 rounded"
      />

      
      
      {/* Pass filtered products to the Table component */}
      < AuthorTable items={filteredAuthor} />
    </div>
  );
};

export default  Author;