import { CiCirclePlus } from "react-icons/ci";
import "./App.css";
import { useState } from "react";
import Modal from "./components/Modal";
import InputComp from "./components/InputComp";

function App() {
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCategory, setShowCategory] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [formData, setFormData] = useState({
    department: "",
    category: "",
  });
  const [departmentList, setDepartmentList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

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

  const handleShowCategory = (index) => {
    setShowCategory(index);
  };

  console.log(departmentList, categoryList);
  return (
    <>
      <div>
        <h1 className="text-xl font-bold">Recursive Navigation Menu</h1>

        {/* department list start */}
        {departmentList?.length > 0 &&
          departmentList?.map((deptList, index) => (
            <div key={index}>
              <div className="flex items-center gap-2">
                <CiCirclePlus
                  onClick={() => handleShowCategory(index)}
                  className="text-2xl"
                />
                <p className="cursor-pointer">{deptList?.department}</p>
              </div>
              <div>
                {showCategory === index && (
                  <>
                    <div className="flex items-center gap-2 ml-4">
                      <CiCirclePlus className="text-2xl" />
                      <p
                        onClick={() => {
                          setShowCategoryModal(true),
                            setDepartmentId(deptList?.department);
                        }}
                        className="cursor-pointer"
                      >
                        Add Category
                      </p>
                    </div>
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
                              <div className="flex items-center gap-2 ml-4">
                                <CiCirclePlus
                                  onClick={() => handleShowCategory(index)}
                                  className="text-2xl"
                                />
                                <p className="cursor-pointer">
                                  {filterCatList?.category}
                                </p>
                              </div>
                            </div>
                          ))}
                      {/* category list end */}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        {/* department list end */}

        <div className="flex items-center gap-2">
          <CiCirclePlus className="text-2xl" />
          <p
            onClick={() => setShowDepartmentModal(true)}
            className="cursor-pointer"
          >
            Add Department
          </p>
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
              className="bg-yellow-400 py-2 mt-2 rounded-md text-white w-full"
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
              className="bg-yellow-400 py-2 mt-2 rounded-md text-white w-full"
            >
              Add Category
            </button>
          </div>
        </Modal>
      )}
      {/* categor modal end */}
    </>
  );
}

export default App;
