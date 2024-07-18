import TSNFileUploader from "@/components/Forms/TSNFileUploader";
import TSNForm from "@/components/Forms/TSNForm";
import TSNInput from "@/components/Forms/TSNInput";
import TSNModal from "@/components/Shared/TSNModal/TSNModal";
// import { registerUser } from "@/services/actions/registerUser";
import { uploadImage } from "@/utils/uploadImage";
import { Button, Checkbox, Grid, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { getUserInfo } from "@/services/auth.services";
import { Height } from "@mui/icons-material";
import { useCreateAdoptionRequestMutation } from "@/redux/api/adoptionRequestApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  petId: string;
};

type TUserInfo = {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

const RequestModal = ({ open, setOpen, petId }: TProps) => {
  const [user, setUser] = useState<TUserInfo | null>();
  const [agreedTerms, setAgreedTerms] = useState(false);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const [createAdoptionRequest] = useCreateAdoptionRequestMutation();

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    petOwnershipExperience: "",
  };

  const handleFormSubmit = async (values: FieldValues) => {
    if (!agreedTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    console.log({ values });

    try {
      const requestAdoptionData: any = {
        petId: petId,
        userName: user?.name,
        userEmail: user?.email,
        petOwnershipExperience: values.petOwnershipExperience,
      };

      console.log({ requestAdoptionData });

      const res = await createAdoptionRequest(requestAdoptionData);
      console.log({ res });

      if (res?.data?.id) {
        toast.success("Adoption request submitted Successfully");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedTerms(event.target.checked);
  };

  return (
    <TSNModal open={open} setOpen={setOpen} title="Submit an adoption request">
      <TSNForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container direction="row" spacing={2} mb={1}>
          <Grid item md={6}>
            <TSNInput
              label="Name"
              type="name"
              fullWidth={true}
              name="name"
              disabled
            />
          </Grid>

          <Grid item md={6}>
            <TSNInput
              label="Email"
              type="email"
              fullWidth={true}
              name="email"
              disabled
            />
          </Grid>
          <Grid item md={12}>
            <TSNInput
              label="Pet Ownership Experience"
              
              type="text"
              fullWidth={true}
              name="petOwnershipExperience"
              multiline
              required
            />
          </Grid>
          <Grid item md={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreedTerms}
                  onChange={handleCheckboxChange}
                  name="agreedTerms"
                />
              }
              label="I agree with the Terms and Conditions"
            />
          </Grid>
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Submit
        </Button>
      </TSNForm>
    </TSNModal>
  );
};

export default RequestModal;
