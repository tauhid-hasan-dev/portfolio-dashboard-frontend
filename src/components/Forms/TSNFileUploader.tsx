import * as React from "react";
import { SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
};

export default function TSNFileUploader({ name, label, sx }: TProps) {
  const { control } = useFormContext();
  const [fileName, setFileName] = React.useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <Box display="flex" alignItems="center">
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ ...sx }}
            >
              {label || "Upload file"}
              <Input
                {...field}
                type="file"
                onChange={(e) => {
                  const file = (e?.target as HTMLInputElement).files?.[0];
                  if (file) {
                    setFileName(file.name);
                    onChange(file);
                  }
                }}
                style={{ display: "none" }}
              />
            </Button>
            {fileName && (
              <Box display="flex" alignItems="center" ml={2}>
                <CheckCircleIcon style={{ color: "green", marginRight: 8 }} />
                <Typography>{fileName}</Typography>
              </Box>
            )}
          </Box>
        );
      }}
    />
  );
}
