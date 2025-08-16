import { InputField, SelectField, TextareaField } from "../ui";
import { useVideoForm } from "../../hooks";
import { useState } from "react";
import axios from "axios";

const UploadVideo = ({ close, type, video }) => {
  // Custom hook to manage form state and validation
  // It initializes form data based on the type (upload or edit)
  const { formData, formNotValid, handleInputChange } = useVideoForm(
    type === "edit"
      ? {
          title: video?.title || "",
          description: video?.description || "",
          category: video?.category || [],
          videoUrl: video?.video || "",
          thumbnailUrl: video?.thumbnail || "",
        }
      : {
          title: "",
          description: "",
          category: [],
          videoUrl: "",
          thumbnailUrl: "",
        }
  );

  const [isUploading, setIsUploading] = useState(false);
  const [alert, setAlert] = useState({ success: null, message: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    // API URL and token for authentication
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("token");

    try {
      // If the type is "edit", we update the existing video
      // Otherwise, we create a new video
      if (type === "edit") {
        // Sending a PUT request to update the video
        // with form data and authentication token
        await axios.put(
          `${apiUrl}/api/videos/update/${video?._id}`,
          {
            ...formData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Sending a POST request to create a new video
        // with form data and authentication token
        await axios.post(
          `${apiUrl}/api/videos/upload`,
          {
            ...formData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
      setAlert({ success: false, message: error.response?.data?.message });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-base-300/60 z-[200] grid justify-center items-center">
      <div className="bg-base-100 py-4 px-5 rounded-2xl overflow-y-auto">
        <h2 className="text-2xl font-bold mb-10">
          {type === "upload" ? "Upload" : "Edit"} video
        </h2>

        {/* Error message */}
        {alert.message ? (
          <div
            role="alert"
            className={`alert ${
              alert.success ? "alert-success" : "alert-error"
            } alert-outline mb-4`}
          >
            <span>{alert.message}</span>
          </div>
        ) : null}

        {/* Form for uploading video */}
        {/* It includes fields for title, description, category, video URL, and thumbnail URL */}
        <form
          onSubmit={onSubmit}
          className="flex flex-col space-y-4 w-full sm:w-sm md:w-md lg:w-lg  max-w-xl "
        >
          {/* Video Title */}
          <InputField
            id={"title"}
            label={"Title"}
            type={"text"}
            placeholder={"Title"}
            title={"Enter your video title"}
            styles={{
              label: "text-sm mb-1",
              input: "w-full",
            }}
            value={formData?.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />

          {/* Description */}
          <TextareaField
            id={"description"}
            label={"Description"}
            placeholder={"Write description about the video"}
            styles={{
              label: "text-sm mb-1",
              textarea: "w-full h-20",
            }}
            value={formData?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />

          {/* Category select */}
          <SelectField
            id={"category"}
            label={"Category"}
            placeholder={"Pick a category"}
            styles={{
              container: "relative flex flex-col space-y-1",
              label: "text-sm mb-1",
              select: "w-full",
            }}
            value={formData?.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          ></SelectField>

          {/* Video URL */}
          <InputField
            id={"link"}
            label={"Link"}
            type={"url"}
            placeholder={"https://"}
            title={"Enter your video link"}
            styles={{
              label: "text-sm mb-1",
              input: "w-full",
            }}
            value={formData?.videoUrl}
            onChange={(e) => handleInputChange("videoUrl", e.target.value)}
          />

          {/* Thumbnail URL */}
          <InputField
            id={"thumbnail"}
            label={"Thumbnail"}
            type={"url"}
            placeholder={"https://"}
            title={"Enter your thumbnail link"}
            styles={{
              label: "text-sm mb-1",
              input: "w-full",
            }}
            value={formData?.thumbnailUrl}
            onChange={(e) => handleInputChange("thumbnailUrl", e.target.value)}
          />

          <div className="flex justify-end space-x-2">
            <button
              disabled={isUploading}
              onClick={close}
              className="btn btn-ghost rounded-full"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={formNotValid | isUploading}
              className="btn btn-ghost rounded-full btn-info"
            >
              {isUploading
                ? type === "upload"
                  ? "Uploading..."
                  : "Editing..."
                : type === "upload"
                ? "Upload"
                : " Edit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
