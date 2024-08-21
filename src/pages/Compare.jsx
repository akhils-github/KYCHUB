import React, { useEffect, useState } from "react";
import { ProductModel } from "../components/ProductModel";
import { Button, Table } from "antd";

export const Compare = ({products,setProducts}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (ImageURL) => (
        <img
          src={ImageURL}
          alt={ImageURL}
          className="w-32 h-32 object-cover mb-2"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),

    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",


    // },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      sorter: (a, b) =>
        a.discountPercentage.localeCompare(b.discountPercentage),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,

    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",

    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={()=> setProducts(prevProducts => 
            prevProducts.filter(product => product.id !== record?.id)
          )} className="button-6">
          Remove
        </Button>
      ),
    },
  ];

  return (
    <>
      <ProductModel modalOpen={modalOpen} setModalOpen={setModalOpen} setProducts={setProducts} products={products} />
      <div className="container mx-auto">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-3">Compare Products</h2>
          <Button
            type="primary"
            //   disabled={comparedProducts.length >= 5}
            onClick={() => setModalOpen(true)}
          >
            Add More Products
          </Button>
        </div>

        {/* Comparison Table */}
        <Table
          dataSource={products}
          columns={columns}
          pagination={false}
          rowClassName="bg-white text-center"
        />
        
      </div>
    </>
  );
 
};
