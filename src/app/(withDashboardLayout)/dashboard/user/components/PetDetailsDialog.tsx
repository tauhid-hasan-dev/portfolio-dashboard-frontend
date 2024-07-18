import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useGetPetQuery } from "@/redux/api/petApi";
import PetsIcon from "@mui/icons-material/Pets";
import LabelIcon from "@mui/icons-material/Label";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import StraightenIcon from "@mui/icons-material/Straighten";
import CakeIcon from "@mui/icons-material/Cake";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type PetDetailsDialogProps = {
  petId: string | null;
  open: boolean;
  onClose: () => void;
};

const PetDetailsDialog = ({ petId, open, onClose }: PetDetailsDialogProps) => {
  const { data: petData, isLoading: isPetLoading } = useGetPetQuery(
    petId ?? undefined
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>See requested pet details</DialogTitle>
      <DialogContent>
        {isPetLoading ? (
          <CircularProgress />
        ) : petData ? (
          <DialogContentText
            sx={{
              backgroundColor: "#F1EAFF",
              p: 1,
              borderRadius: 2,
              minWidth: 300,
            }}
          >
            <Box display="flex" alignItems="center">
              <PetsIcon />
              <Typography variant="body1" fontWeight="bold" marginLeft={1}>
                Name:
              </Typography>
              <Typography variant="body1" marginLeft={1}>
                {petData.name}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <LabelIcon />
              <Typography variant="body1" fontWeight="bold" marginLeft={1}>
                Type:
              </Typography>
              <Typography variant="body1" marginLeft={1}>
                {petData.species}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              {petData.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
              <Typography variant="body1" fontWeight="bold" marginLeft={1}>
                Gender:
              </Typography>
              <Typography variant="body1" marginLeft={1}>
                {petData.gender}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <StraightenIcon />
              <Typography variant="body1" fontWeight="bold" marginLeft={1}>
                Size:
              </Typography>
              <Typography variant="body1" marginLeft={1}>
                {petData.size}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <CakeIcon />
              <Typography variant="body1" fontWeight="bold" marginLeft={1}>
                Age:
              </Typography>
              <Typography variant="body1" marginLeft={1}>
                {petData.age}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <LabelIcon />
              <Typography variant="body1" fontWeight="bold" marginLeft={1}>
                Breed:
              </Typography>
              <Typography variant="body1" marginLeft={1}>
                {petData.breed}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <LocationOnIcon />
              <Typography variant="body1" fontWeight="bold" marginLeft={1}>
                Location:
              </Typography>
              <Typography variant="body1" marginLeft={1}>
                {petData.location}
              </Typography>
            </Box>
          </DialogContentText>
        ) : (
          <Typography variant="body1">No pet data available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PetDetailsDialog;
