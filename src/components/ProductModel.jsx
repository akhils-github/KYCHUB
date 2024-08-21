import React, { useEffect, useState } from "react";
import { Avatar, Flex, List, message } from "antd";
import VirtualList from "rc-virtual-list";
import { Button, Modal } from "antd";
import { useFetch } from "../hooks/useFetch";
const ContainerHeight = 400;

export const ProductModel = ({ modalOpen, setModalOpen,products ,setProducts}) => {
  const [skip, setSkip] = useState(10);
  const { data, isPending, error } = useFetch(
    `https://dummyjson.com/products?limit=${skip}`
  );

  const onScroll = (e) => {
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) <= 1
    ) {
      setSkip((prev) => prev + 10);
      //   listing;
      //   setData(data.concat(listing?.products));
    }
  };
  console.log(data);
  return (
    <>
      <Modal
        title="Select Compare Product"
        centered
        width={"50%"}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <List>
          <VirtualList
            data={data?.products}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="id"
            onScroll={onScroll}
          >
            {(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ width: 100, height: 100 }}
                      src={item.thumbnail}
                    />
                  }
                  title={<Flex gap="middle" align="start" vertical>
                    <p>{item?.title}</p>
                    <p>{item?.price}</p>
                  </Flex>}
                  description={item.category}
                />
                <Button
               disabled={products.some(product => product.id === item.id) || products.length >= 4}
                 type="primary" onClick={()=>setProducts(prevProducts => [...prevProducts, item])} style={{marginRight:40}}>Select</Button>
                {/* <div>Content</div> */}
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Modal>
    </>
  );
};
