import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import TSNForm from "@/components/Forms/TSNForm";
import TSNInput from "@/components/Forms/TSNInput";

import TSNFullScreenModal from "@/components/Shared/TSNModal/TSNFullScreenModal";
import { useCreateProjectMutation } from "@/redux/api/resumeApi";
import { toast } from "sonner";
import { uploadImage } from "@/utils/uploadImage";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { categoryType, petType, techStackType } from "@/types";
import TSNSelectField from "@/components/Forms/TSNSelecteField";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectModal = ({ open, setOpen }: TProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [createProject] = useCreateProjectMutation();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleFormSubmit = async (values: FieldValues) => {
    const { file, ...data } = values;
    if (files) {
      const photoPromises = Array.from(files).map(uploadImage); // Map over files and upload each
      const uploadedPhotos = await Promise.all(photoPromises); // Wait for all uploads
      data.image = uploadedPhotos[0]; // Assign uploaded photos to data
    }
    data.stack = selectedTypes.map((type) => ({ name: type }));
    console.log({ data });
    try {
      const res = await createProject(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Project created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedTypes(event.target.value as string[]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles(fileList); // Store the selected files in state
    }
  };

  const defaultValues = {
    num: "",
    category: "",
    title: "",
    description: "",
    stack: [],
    image: "",
    live: "",
    githubServer: "",
    githubClient: "",
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
              name="num"
              label="Num"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TSNSelectField
              items={categoryType}
              name="category"
              label="Category"
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="title"
              label="Title"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="Description"
              label="description"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="live"
              label="Live Link"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="githubServer"
              label="Github Server"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="githubClient"
              label="Github Client"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <FormControl fullWidth>
              <InputLabel id="label">Select Tech Stack</InputLabel>
              <Select
                labelId="label"
                multiple
                value={selectedTypes}
                onChange={handleSelectChange}
                renderValue={(selected) => (selected as string[]).join(", ")}
                size="small"
                label="Select Tech Stack"
              >
                {techStackType.map((type) => (
                  <MenuItem key={type} value={type}>
                    <Checkbox
                      checked={selectedTypes.indexOf(type) > -1}
                      size="small"
                    />
                    <ListItemText
                      primary={type}
                      sx={{ fontSize: "0.875rem" }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                Project Image
              </Button>
            </label>
          </Grid>

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
