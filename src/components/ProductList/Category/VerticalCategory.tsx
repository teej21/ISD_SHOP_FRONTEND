import React, { useState, useEffect } from "react";
import { ICategories } from "../../../interface/ICategory";
import { Link } from "react-router-dom";

const VerticalCategory = () => {
  const [categories, setCategories] = useState<ICategories[]>([
    {
      id: 0,
      name: "",
      description: "",
    },
  ]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setActiveCategory(id);
  };

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await fetch("http://localhost:8686/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data: ICategories[] = await response.json();
          setCategories(data);
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomerList();
  }, []);

  return (
    <div className="flex flex-col p-8 gap-[20px] w-[20%] mt-[100px] xl:basis-[20%] basis-[30%] lg:flex hidden">
      <h1 className="text-2xl font-bold">Danh mục tranh</h1>
      <hr className="w-[50px] h-[5px] bg-gray-500"></hr>
      {categories.map((category) => (
        <div key={category.id} onClick={() => handleClick(category.id)}>
          <Link to={`/${category.id}`} className={`hover:text-3xl hover:font-bold ${activeCategory === category.id? 'font-bold text-3xl' : ''}`}>
            <h1 className="text-2xl">{category.name}</h1>
          </Link>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default VerticalCategory;
