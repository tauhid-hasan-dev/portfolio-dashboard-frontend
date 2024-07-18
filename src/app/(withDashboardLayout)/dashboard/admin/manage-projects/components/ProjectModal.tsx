import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import TSNForm from "@/components/Forms/TSNForm";
import TSNInput from "@/components/Forms/TSNInput";

import TSNFullScreenModal from "@/components/Shared/TSNModal/TSNFullScreenModal";
import { useCreatePetMutation } from "@/redux/api/petApi";
import { toast } from "sonner";
import { uploadImage } from "@/utils/uploadImage";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Margin } from "@mui/icons-material";
import TSNSelectField from "@/components/Forms/TSNSelecteField";
import { Gender, petSize, petType } from "@/types/common";

// import { toast } from "sonner";
// import TSNSelectField from "@/components/Forms/TSNSelecteField";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectModal = ({ open, setOpen }: TProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [createPet] = useCreatePetMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const { file, ...data } = values;
    if (files) {
      const photoPromises = Array.from(files).map(uploadImage); // Map over files and upload each
      const uploadedPhotos = await Promise.all(photoPromises); // Wait for all uploads
      data.photos = uploadedPhotos; // Assign uploaded photos to data
    }
    data.age = Number(values.age);
    console.log({ data });
    try {
      const res = await createPet(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Pet created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles(fileList); // Store the selected files in state
    }
  };

  const defaultValues = {
    name: "",
    species: "",
    breed: "",
    age: 0,
    size: "",
    gender: "",
    location: "",
    description: "",
    temperament: "",
    medicalHistory: "",
    adoptionRequirements: "",
  };

  return (
    <TSNFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Create New Project"
    >
      <TSNForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="name"
              label="Name"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TSNSelectField
              items={petType}
              name="species"
              label="Type"
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="breed"
              label="Breed"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="age"
              label="Age"
              type="number"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TSNSelectField
              items={petSize}
              name="size"
              label="Size"
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TSNSelectField
              items={Gender}
              name="gender"
              label="Gender"
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="location"
              label="Location"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="description"
              label="Description"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="temperament"
              label="Temperament"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="medicalHistory"
              label="Health Status"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="adoptionRequirements"
              label="Requirements"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            <input
              accept="image/*"
              id="file"
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file">
              <Button variant="outlined" component="span">
                <CloudUploadIcon style={{ marginRight: "8px" }} /> Upload
                Multiple Images
              </Button>
            </label>
          </Grid>

          {/* Display uploaded files count and file names */}
          {files && (
            <Grid item xs={12} sm={12} md={4}>
              <ul>
                <li style={{ color: "blue" }}>{files.length} files uploaded</li>
                {[...Array.from(files)].map((file, index) => (
                  <li key={index}>
                    <span>{file.name}</span>
                    <CheckCircleIcon style={{ color: "green" }} />
                  </li>
                ))}
              </ul>
            </Grid>
          )}
        </Grid>

        <Button type="submit">Create</Button>
      </TSNForm>
    </TSNFullScreenModal>
  );
};

export default ProjectModal;
