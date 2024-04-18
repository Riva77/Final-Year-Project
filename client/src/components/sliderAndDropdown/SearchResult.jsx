import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ searchQuery }) => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.data);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute self-center top-[30px] z-10 mt-3 w-96 max-h-80 divide-y divide-gray-100 rounded-md border border-gray-100 bg-[#FDFBF7] shadow-lg transition-transform duration-300 ease-in-out transform translate-y-2 overflow-y-auto">
      <div className="p-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              className="cursor-pointer flex items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-[#F1EEE3]  hover:text-gray-700 justify-between border-b-2 border-[#F1EEE3]"
              onClick={() => {
                navigate(`/shop/productDetails/${product._id}`);
                window.location.reload();
              }}
            >
              <div className="flex items-start gap-3">
                <img src={product.image} className="w-10" />
                <span className="flex flex-col">
                  <spanc className="text-[#4C2B21] font-semibold text-md">
                    {product.name}
                  </spanc>
                  <span className="text-xs"> Author: {product.author.name}</span>
                </span>
              </div>
              <span className="text-[#4C2B21] text-lg">${product.price}</span>
            </div>
          ))
        ) : (
          <div className="cursor-pointer flex items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-[#F1EEE3]  hover:text-gray-700">
            No result found for &nbsp; <strong>{searchQuery}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
