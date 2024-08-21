import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import { useFetch } from "../hooks/useFetch";
import Search from "antd/es/input/Search";
import { Link, useNavigate } from "react-router-dom";

export const Products = ({ setProducts: setProduct, products: product }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  console.log(searchKey);
  const { data, isPending, error } = useFetch(
    `https://dummyjson.com/products${searchKey}`
  );
  console.log(data, isPending, error);

  useEffect(() => {
    const list = data?.products?.slice((page - 1) * 4, page * 4);
    setProducts(list);
  }, [page, data]);

  const handleChange = (pagination) => {
    setPage(pagination);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (ImageURL) => <img alt={ImageURL} src={ImageURL} width={75} />,
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      //   filteredValue: filteredInfo.name || null,
      //   onFilter: (value, record) => record.name.includes(value),
      //   sorter: (a, b) => a.name.length - b.name.length,
      //   sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      //   sorter: (a, b) => a.age - b.age,
      //   sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      //   sorter: (a, b) => a.age - b.age,
      //   sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      //   filters: [
      //     {
      //       text: "London",
      //       value: "London",
      //     },
      //     {
      //       text: "New York",
      //       value: "New York",
      //     },
      //   ],
      //   filteredValue: filteredInfo.address || null,
      //   onFilter: (value, record) => record.address.includes(value),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          disabled={
            product.some((product) => product.id === record.id)  ||
            product.length >= 4
          }
          type="primary"
          onClick={() => {
            setProduct((prevProducts) => [...prevProducts, record]);
            navigate("compare");
          }}
          // onClick={()=> setProducts(prevProducts =>
          //     prevProducts.filter(product => product.id !== record?.id)
          //   )}
          className="button-6"
        >
          Compare
        </Button>
      ),
    },
  ];

  //   const onSearch = (value, _e, info) => console.log(info?.source, value);
  const onSearch = (value, _e, info) => {
    setSearchKey("/search?q=" + value);
  };
  return (
    <div>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Search
          placeholder="search Products"
          allowClear
          onSearch={onSearch}
          enterButton
        />
      </Space>

      <Table
        columns={columns}
        dataSource={products}
        pagination={{
          total: data?.total,
          onChange: (page, pageSize) => {
            handleChange(page, pageSize);
          },
        }}
      />
    </div>
  );
};
