import { CiCirclePlus, CiFolderOn } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { FaFolder } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import "./App.css";
import { useState } from "react";
import Modal from "./components/Modal";
import InputComp from "./components/InputComp";

function App() {
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [showCategory, setShowCategory] = useState(null);
  const [showSubCategory, setShowSubCategory] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [formData, setFormData] = useState({
    department: "",
    category: "",
    subCategory: " ",
  });
  const [departmentList, setDepartmentList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleAddDepartment = () => {
    if (formData?.department) {
      setDepartmentList([
        ...departmentList,
        { department: formData?.department },
      ]);
      setShowDepartmentModal(false);
      setFormData({ department: "" });
    }
  };

  const handleAddCategory = () => {
    if (formData?.category) {
      setCategoryList([
        ...categoryList,
        { department: departmentId, category: formData?.category },
      ]);
      setShowCategoryModal(false);
      setFormData({ category: "" });
    }
  };

  const handleAddSubCategory = () => {
    if (formData?.subCategory) {
      setSubCategoryList([
        ...subCategoryList,
        {
          department: departmentId,
          category: categoryId,
          subCategory: formData?.subCategory,
        },
      ]);
      setShowSubCategoryModal(false);

      setFormData({ subCategory: "" });
    }
  };

  const handleShowCategory = (index) => {
    showCategory === index ? setShowCategory(null) : setShowCategory(index);
  };
  const handleShowSubCategory = (index) => {
    showSubCategory === index
      ? setShowSubCategory(null)
      : setShowSubCategory(index);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-xl font-bold">Recursive Navigation Menu</h1>

        {/* department list start */}
        {departmentList?.length > 0 &&
          departmentList?.map((deptList, index) => (
            <div key={index}>
              <div className="flex items-center gap-2 mb-2   cursor-pointer text-[#8b5cf6] font-semibold">
                {showCategory === index ? (
                  <AiFillMinusCircle
                    onClick={() => handleShowCategory(index)}
                    className="text-2xl"
                  />
                ) : (
                  <BsFillPlusCircleFill
                    onClick={() => handleShowCategory(index)}
                    className="text-2xl"
                  />
                )}
                <p className="">{deptList?.department}</p>
              </div>
              <div>
                {showCategory === index && (
                  <>
                    <div>
                      {/* category list start */}
                      {categoryList?.length > 0 &&
                        categoryList
                          ?.filter(
                            (catList) =>
                              catList?.department === deptList?.department
                          )
                          ?.map((filterCatList, index) => (
                            <div key={index}>
                              <div className="flex items-center gap-2  my-2  cursor-pointer text-[#8b5cf6] font-semibold ">
                                {showSubCategory === index ? (
                                  <AiFillMinusCircle
                                    onClick={() => handleShowSubCategory(index)}
                                    className="text-2xl"
                                  />
                                ) : (
                                  <BsFillPlusCircleFill
                                    onClick={() => handleShowSubCategory(index)}
                                    className="text-2xl"
                                  />
                                )}
                                <p className=" capitalize">
                                  {filterCatList?.category}
                                </p>
                              </div>

                              {showSubCategory === index && (
                                <>
                                  {subCategoryList?.length > 0 &&
                                    subCategoryList
                                      ?.filter(
                                        (subList) =>
                                          subList?.category ===
                                          filterCatList?.category
                                      )
                                      ?.map((filteredSubCat, subIndex) => (
                                        <div
                                          key={subIndex}
                                          className="ml-16 flex items-center gap-2 text-[#8b5cf6] font-semibold "
                                        >
                                          <FaFolder className="text-xl " />
                                          <p className="cursor-pointer capitalize">
                                            {filteredSubCat?.subCategory}
                                          </p>
                                        </div>
                                      ))}

                                  <div
                                    className="flex items-center gap-2 ml-8 cursor-pointer text-[#8b5cf6] font-semibold "
                                    onClick={() => {
                                      setShowSubCategoryModal(true),
                                        setCategoryId(filterCatList?.category);
                                    }}
                                  >
                                    <BsFillPlusCircleFill className="text-2xl" />
                                    <p>Add SubCategory</p>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                      {/* category list end */}
                    </div>
                    <div
                      className="flex items-center gap-2 ml-4 my-2 text-[#8b5cf6] font-semibold cursor-pointer"
                      onClick={() => {
                        setShowCategoryModal(true),
                          setDepartmentId(deptList?.department);
                      }}
                    >
                      <BsFillPlusCircleFill className="text-2xl" />
                      <p>Add Category</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        {/* department list end */}

        <div
          className="flex items-center gap-2 cursor-pointer text-[#8b5cf6] font-semibold"
          onClick={() => setShowDepartmentModal(true)}
        >
          <BsFillPlusCircleFill className="text-2xl " />
          <p className="">Add Department</p>
        </div>
      </div>

      {/* department modal start */}
      {showDepartmentModal && (
        <Modal handleClose={() => setShowDepartmentModal(false)}>
          <div className="flex flex-col items-center   ">
            <h1 className="font-bold">Add Department</h1>
            <InputComp
              type="text"
              title="department"
              placeholder="Enter Department Name"
              value={formData.department}
              handleChange={handleChange}
              style="mt-2"
            />
            <button
              onClick={handleAddDepartment}
              className="bg-[#a78bfa] py-2  mt-2 rounded-md text-white w-full"
            >
              Add Department
            </button>
          </div>
        </Modal>
      )}
      {/* department modal end */}

      {/* category modal start */}
      {showCategoryModal && (
        <Modal handleClose={() => setShowCategoryModal(false)}>
          <div className="flex flex-col items-center   ">
            <h1 className="font-bold">Add Category</h1>
            <InputComp
              type="text"
              title="category"
              placeholder="Enter Category Name"
              value={formData.category}
              handleChange={handleChange}
              style="mt-2"
            />
            <button
              onClick={handleAddCategory}
              className="bg-[#a78bfa]  py-2 mt-2 rounded-md text-white w-full"
            >
              Add Category
            </button>
          </div>
        </Modal>
      )}
      {/* categor modal end */}

      {/* subCategory modal start */}
      {showSubCategoryModal && (
        <Modal handleClose={() => setShowSubCategoryModal(false)}>
          <div className="flex flex-col items-center   ">
            <h1 className="font-bold">Add SubCategory</h1>
            <InputComp
              type="text"
              title="subCategory"
              placeholder="Enter SubCategory Name"
              value={formData.subCategory}
              handleChange={handleChange}
              style="mt-2"
            />
            <button
              onClick={handleAddSubCategory}
              className="bg-[#a78bfa] py-2 mt-2 rounded-md text-white w-full"
            >
              Add SubCategory
            </button>
          </div>
        </Modal>
      )}
      {/* subCategory modal end */}
    </>
  );
}

export default App;
