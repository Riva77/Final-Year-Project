const OrderTable = ({ items }) => {
  if (items) {
    console.log(items);
  }
  return (
    <div className="w-full">
      <table className="min-w-72 divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              S.N.
            </th>
            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Product
              </th> */}
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Date
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Order No
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Status
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Price
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {items?.map((item, index) => {
            return (
              <tr key={item._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {index + 1}
                </td>
                {/* <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    {item.products.product.name}
                  </td> */}
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {item.orderDate}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {item._id}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default OrderTable;
