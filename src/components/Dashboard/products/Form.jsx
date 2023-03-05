import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line, RiUploadCloud2Line } from "react-icons/ri";
import { RxReset } from "react-icons/rx";
import ImageUploading from "react-images-uploading";
import API from "../../../services/API";

const MAXIMUM = 5;
export default function Form({ title = "Add Product", prevData = {} }) {
  const UPDATE_REQ = !!prevData?._id; // IF HAVE ID ROUTE THEN UPDATE REQUEST.
  // MUTATION OF UPDATE / ADD PRODUCT.
  const { mutate, error, isLoading } = useMutation({
    mutationFn: (data) =>
      UPDATE_REQ
        ? API.products.update(prevData?._id, data)
        : API.products.create(data),
  });
  // Features states & ref.
  const feature_ref = useRef(null);
  const [features, setFeatures] = useState([]);
  function onAddFeature(e) {
    const new_feature = feature_ref?.current?.value;
    setFeatures((old_features) => [...old_features,new_feature]);
    feature_ref.current.value="";
  }
  function onRemoveFeatures(index) {
    setFeatures((old_features) => old_features.filter((_, i) => i !== index));
  }

  //IMAGES STATES & HANDLER
  const [prevImage, setPrevImage] = React.useState(prevData?.images || []);
  const [images, setImages] = React.useState([]);
  const onAddImage = (imageList) => {
    setImages(imageList);
  };
  function removePrevImage(src) {
    setPrevImage((state) => state?.filter((ele) => ele !== src));
  }

  // HOOK FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(prevData);

  //ON SUBMIT FUNCTION
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

  React.useEffect(() => {
    if (prevData?._id) {
      setPrevImage(prevData?.images || []);
    }
  }, []);

  return (
    <div className="form-wrapper mx-auto w-full max-w-md rounded-md bg-gradient-to-tr from-indigo-600 to-purple-600 p-1">
      <div className="mb-1 rounded-md border border-dashed border-white/40 bg-gradient-to-br from-white/50 to-white/5 py-7 px-3 text-center">
        <h3 className="text-2xl font-bold tracking-wider text-white">
          {title}
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full rounded-md bg-white p-3"
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
        <label htmlFor="features">
          <p className="label">Features</p>
          {!!features.length && <ul className="mb-3">
            {features.map((feature, index) => (
              <li className="p-1 mb-1 flex gap-1 bg-slate-50 text-slate-500 border-l-2 border-l-slate-300">
                <p className="flex-grow block">{feature}</p>{" "}
                <button type="button" onClick={() => onRemoveFeatures(index)}>
                  <MdDelete />
                </button>{" "}
                <button type="button">
                  <AiFillEdit />
                </button>
              </li>
            ))}
          </ul>}
          <div className="flex flex-row gap-2">
            <input
              type="text"
              name="features"
              id="features"
              minLength={2}
              className="input flex-grow py-1"
              ref={feature_ref}
            />
            <button
              type="button"
              className="rounded-md bg-slate-800 py-1 px-2 text-white"
              onClick={onAddFeature}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </label>
        <label>
          <p className="label">Image Upload</p>
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
                  className={`flex w-full flex-row border-2 border-dashed px-4 py-10 text-center ${
                    isDragging ? "border-indigo-500" : "border-indigo-300"
                  } items-center justify-center rounded-md `}
                >
                  <div className="inline-flex justify-center">
                    <RiUploadCloud2Line className="text-3xl" />
                    <p className="label">Upload Image</p>
                  </div>
                </button>
                <div className="my-3 flex flex-wrap gap-1">
                  {prevImage.map((ele, indx) => (
                    <div className="group relative" key={indx}>
                      <img
                        src={ele}
                        alt={""}
                        className="h-24 w-24 rounded-sm border border-dashed border-indigo-500 object-contain"
                      />
                      <div className="invisible absolute top-0 left-0 z-10 flex h-full w-full flex-wrap items-center justify-center gap-1 bg-indigo-900/10 opacity-0 backdrop-blur-sm backdrop-saturate-50 group-hover:visible group-hover:opacity-100">
                        <button
                          className="rounded-full bg-rose-500 p-2 text-sm text-white"
                          onClick={() => removePrevImage(ele)}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  ))}
                  {imageList.map((image, index) => (
                    <div className="group relative" key={index}>
                      <img
                        src={image.dataURL}
                        alt={image.name}
                        className="h-24 w-24 rounded-sm border border-dashed border-indigo-500 object-contain"
                      />
                      <div className="invisible absolute top-0 left-0 z-10 flex h-full w-full flex-wrap items-center justify-center gap-1 bg-indigo-900/10 opacity-0 backdrop-blur-sm backdrop-saturate-50 group-hover:visible group-hover:opacity-100">
                        <button
                          className="rounded-full bg-rose-500 p-2 text-sm text-white"
                          onClick={() => onImageRemove(index)}
                        >
                          <RiDeleteBin6Line />
                        </button>
                        <button
                          className="rounded-full bg-indigo-500 p-2  text-sm text-white"
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
        </label>

        {/* BUTTONS-------------------> */}
        <div className="mt-6 mb-4 text-center">
          <button
            disabled={isLoading}
            type="submit"
            className={`inline-flex items-center gap-2 rounded-md bg-gradient-to-tr from-indigo-600 to-indigo-500 px-3 py-2 font-semibold  tracking-wide text-white hover:from-indigo-800 hover:to-indigo-600 ${
              isLoading ? "loading" : "loading"
            }`}
          >
            Add <IoMdAddCircle className="inline-block text-lg" />
          </button>
          <button
            type="reset"
            className="ml-2 inline-flex items-center gap-2 rounded-md bg-gradient-to-tr from-rose-600 to-rose-500 px-3 py-2  font-semibold tracking-wide text-white hover:from-rose-800 hover:to-rose-600"
          >
            Reset <RxReset className="inline-block text-lg" />
          </button>
        </div>
        <p
          className={`${
            error ? "opacity-100" : "opacity-0"
          } overflow-hidden rounded-md bg-rose-700 p-2 text-rose-50 transition-all duration-300`}
        >
          {error?.message || "_"}
        </p>
      </form>
    </div>
  );
}
