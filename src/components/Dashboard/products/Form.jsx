import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { GrUpdate } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBin6Line, RiUploadCloud2Line } from "react-icons/ri";
import { RxReset } from "react-icons/rx";
import ImageUploading from "react-images-uploading";
import API from "../../../services/API";

const MAXIMUM = 5;
export default function Form({ title = "Add Product", prevData = {} }) {
  const UPDATE_REQ = !!prevData?._id;
  const { mutate, error, isLoading } = useMutation({
    mutationFn: (data) =>
      UPDATE_REQ
        ? API.products.update(prevData?._id, data)
        : API.products.create(data),
  });
  const [prevImage, setPrevImage] = React.useState(prevData?.images || []);
  const [images, setImages] = React.useState([]);
  const onAddImage = (imageList) => {
    setImages(imageList);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(prevData);

  async function onSubmit(data) {
    if (images.length === 0) return;
    const imgs = data.imgs;
    delete data.imgs;
    const image_64_bit_promise = [];
    images.forEach((ele) => {
      const promise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(ele?.file);
        reader.onload = () => {
          const base64String = reader.result;
          resolve(base64String);
        };
        reader.onerror = () => {
          reject(new Error("File to convert file " + file.name));
        };
      });
      image_64_bit_promise.push(promise);
    });
    const images_data = (await Promise.allSettled(image_64_bit_promise)).map(
      (ele) => ele.value
    );
    // MUTATIONG DATA
    mutate(
      {
        ...data,
        images: [...prevImage, ...images_data],
      },
      {
        onSuccess: () => {
          reset();
          setImages([]);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }

  function removePrevImage(src) {
    setPrevImage((state) => state?.filter((ele) => ele !== src));
  }

  React.useEffect(() => {
    if (prevData?._id) {
      setPrevImage(prevData?.images || []);
    }
  }, [prevData?._id]);

  return (
    <div className="form-wrapper w-full max-w-md p-1 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md mx-auto">
      <div className="mb-1 py-7 px-3 text-center rounded-md bg-gradient-to-br from-white/50 to-white/5 border border-dashed border-white/40">
        <h3 className="text-2xl font-bold tracking-wider text-white">
          {title}
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-3 rounded-md bg-white"
        encType="multipart/form-data"
      >
        <label htmlFor="title">
          <p className="label">Title</p>
          <input
            type="text"
            id="title"
            className="input py-1"
            placeholder="Product title"
            defaultValue={prevData?.title}
            {...register("title", { required: true, minLength: 3 })}
          />
        </label>
        <label htmlFor="description">
          <p className="label">Description</p>
          <textarea
            type="text"
            id="description"
            className="input py-1"
            rows="5"
            cols="50"
            placeholder="Description ... ..."
            defaultValue={prevData?.desc}
            {...register("desc", { required: true, minLength: 10 })}
          ></textarea>
        </label>
        <label htmlFor="price">
          <p className="label">Price</p>
          <input
            type="number"
            id="price"
            min={1}
            className="input py-1"
            placeholder="Price"
            defaultValue={+prevData?.price}
            {...register("price", { required: true, min: 1 })}
          />
        </label>
        <label htmlFor="discount">
          <p className="label">Discount (%)</p>
          <input
            type="number"
            id="discount"
            min={0}
            className="input py-1"
            placeholder="Discount"
            defaultValue={+prevData?.discount}
            {...register("discount", { required: true, min: 0 })}
          />
        </label>
        <label htmlFor="stock">
          <p className="label">Stock</p>
          <input
            type="number"
            id="stock"
            min={0}
            className="input py-1"
            placeholder="Stock"
            defaultValue={+prevData?.stock}
            {...register("stock", { required: true, min: 0 })}
          />
        </label>
        <ImageUploading
          multiple
          value={images}
          onChange={onAddImage}
          maxNumber={MAXIMUM}
          type="image"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="">
              <button
                onClick={onImageUpload}
                {...dragProps}
                className={`w-full text-center mb-3 px-4 py-10 flex flex-row border-2 mt-3 border-dashed ${
                  isDragging ? "border-indigo-500" : "border-indigo-300"
                } rounded-md justify-center items-center `}
              >
                <div className="inline-flex justify-center">
                  <RiUploadCloud2Line className="text-3xl" />
                  <p className="label">Upload Image</p>
                </div>
              </button>
              <div className="flex flex-wrap gap-1 my-3">
                {prevImage.map((ele, indx) => (
                  <div className="relative group" key={indx}>
                    <img
                      src={ele}
                      alt={""}
                      className="h-24 w-24 rounded-sm border border-dashed border-indigo-500 object-contain"
                    />
                    <div className="flex gap-1 flex-wrap items-center justify-center absolute top-0 left-0 h-full w-full z-10 bg-indigo-900/10 backdrop-blur-sm backdrop-saturate-50 opacity-0 invisible group-hover:visible group-hover:opacity-100">
                      <button
                        className="p-2 text-sm rounded-full bg-rose-500 text-white"
                        onClick={() => removePrevImage(ele)}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                ))}
                {imageList.map((image, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={image.dataURL}
                      alt={image.name}
                      className="h-24 w-24 rounded-sm border border-dashed border-indigo-500 object-contain"
                    />
                    <div className="flex gap-1 flex-wrap items-center justify-center absolute top-0 left-0 h-full w-full z-10 bg-indigo-900/10 backdrop-blur-sm backdrop-saturate-50 opacity-0 invisible group-hover:visible group-hover:opacity-100">
                      <button
                        className="p-2 text-sm rounded-full bg-rose-500 text-white"
                        onClick={() => onImageRemove(index)}
                      >
                        <RiDeleteBin6Line />
                      </button>
                      <button
                        className="p-2 text-sm rounded-full  bg-indigo-500 text-white"
                        onClick={() => onImageUpdate(index)}
                      >
                        <GrUpdate className="text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>

        {/* BUTTONS-------------------> */}
        <div className="text-center mt-6 mb-4">
          <button
            disabled={isLoading}
            type="submit"
            className={`px-3 py-2 rounded-md bg-gradient-to-tr to-indigo-500 from-indigo-600 hover:to-indigo-600 hover:from-indigo-800 font-semibold text-white  tracking-wide inline-flex gap-2 items-center ${
              isLoading ? "loading" : "loading"
            }`}
          >
            Add <IoMdAddCircle className="inline-block text-lg" />
          </button>
          <button
            type="reset"
            className="px-3 py-2 rounded-md bg-gradient-to-tr to-rose-500 from-rose-600 hover:to-rose-600 hover:from-rose-800 font-semibold text-white  tracking-wide inline-flex gap-2 items-center ml-2"
          >
            Reset <RxReset className="inline-block text-lg" />
          </button>
        </div>
          <p className={`${error?"opacity-100":"opacity-0"} overflow-hidden text-rose-50 p-2 rounded-md bg-rose-700 transition-all duration-300`}>
            {error?.message ||'_'}
          </p>
      </form>
    </div>
  );
}
