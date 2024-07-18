"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
import ClearIcon from "@mui/icons-material/Clear";
import { useGetAllPetsQuery } from "@/redux/api/petApi";
import { useDebounced } from "@/redux/hooks";
import { useState, useMemo, useEffect } from "react";
import styles from "./SearchPets.module.css";
import PetsIcon from "@mui/icons-material/Pets";
import LabelIcon from "@mui/icons-material/Label";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import StraightenIcon from "@mui/icons-material/Straighten";
import CakeIcon from "@mui/icons-material/Cake";

const filters = [
  { label: "Size", options: ["Small", "Medium", "Large"], key: "size" },
  { label: "Gender", options: ["Male", "Female"], key: "gender" },
  { label: "Type", options: ["Dog", "Cat"], key: "species" },
];

const customTextFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6504B5", // Custom border color
    },
    "&:hover fieldset": {
      borderColor: "#6504B5", // Custom border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6504B5", // Custom border color when focused
    },
  },
};

const SearchPets = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});
  const [showClearAll, setShowClearAll] = useState<boolean>(false);

  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

  useEffect(() => {
    setShowClearAll(Object.keys(selectedFilters).length > 0);
  }, [selectedFilters]);

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleClearFilter = (key: string) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[key];
      return newFilters;
    });
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({});
  };

  const query = useMemo(() => {
    const queryParams: Record<string, any> = {};
    if (debouncedTerm) queryParams["searchTerm"] = debouncedTerm;
    Object.keys(selectedFilters).forEach((key) => {
      if (selectedFilters[key]) queryParams[key] = selectedFilters[key];
    });
    return queryParams;
  }, [debouncedTerm, selectedFilters]);

  const { data, isLoading, isError } = useGetAllPetsQuery(query);
  const pets = data?.pets || [];

  return (
    <Box sx={{ my: 10 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ color: "#6504B5" }}
          variant="h4"
          component="h1"
          fontWeight={700}
        >
          Pets Available for Adoption
        </Typography>
      </Box>

      <Container>
        <Grid container spacing={2} alignItems="center" py={3}>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TextField
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              variant="outlined"
              size="medium"
              placeholder="Search"
              fullWidth
              sx={customTextFieldStyles}
              InputProps={{
                endAdornment: searchTerm && (
                  <IconButton onClick={() => setSearchTerm("")}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          {filters.map((filter, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
              <TextField
                size="medium"
                select
                label={filter.label}
                variant="outlined"
                fullWidth
                value={selectedFilters[filter.key] || ""}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                sx={customTextFieldStyles}
                InputProps={{
                  endAdornment: selectedFilters[filter.key] && (
                    <IconButton onClick={() => handleClearFilter(filter.key)}>
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              >
                {filter.options.map((option, idx) => (
                  <MenuItem key={idx} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ))}
        </Grid>
        {showClearAll && (
          <Box textAlign="center" mt={2}>
            <Button variant="outlined" onClick={handleClearAllFilters}>
              Clear All Filters
            </Button>
          </Box>
        )}
      </Container>

      <Container sx={{ margin: "30px auto" }}>
        {isLoading ? (
          <Box textAlign="center" my={4}>
            <CircularProgress />
            <Typography variant="h6">Loading...</Typography>
          </Box>
        ) : isError ? (
          <Box textAlign="center" my={4}>
            <Typography variant="h6" color="error">
              Error loading pets. Please try again later.
            </Typography>
          </Box>
        ) : pets.length > 0 ? (
          <Grid container spacing={4}>
            {pets.map((pet: any) => (
              <Grid item key={pet.id} md={4}>
                <Card
                  className={styles.cardContainer}
                  sx={{ borderRadius: 4, p: 2 }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: 300,
                      "& img": {
                        width: "100%",
                        borderRadius: 3,
                        height: "100%",
                        overflow: "hidden",
                        objectFit: "cover",
                      },
                    }}
                  >
                    <Image
                      src={pet?.photos[0]}
                      alt="pet"
                      width={300}
                      height={30}
                    />
                  </Box>
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#6504B5" }}
                      >
                        {pet.name}
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        sx={{ color: "#6504B5" }}
                      >
                        {pet.species}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                      {pet.gender === "Male" ? (
                        <MaleIcon sx={{ color: "#D5D5D5" }} />
                      ) : (
                        <FemaleIcon sx={{ color: "#D5D5D5" }} />
                      )}
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        marginLeft={1}
                      >
                        Gender:
                      </Typography>
                      <Typography variant="body1" marginLeft={1}>
                        {pet.gender}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <StraightenIcon sx={{ color: "#D5D5D5" }} />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        marginLeft={1}
                      >
                        Size:
                      </Typography>
                      <Typography variant="body1" marginLeft={1}>
                        {pet.size}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <CakeIcon sx={{ color: "#D5D5D5" }} />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        marginLeft={1}
                      >
                        Age:
                      </Typography>
                      <Typography variant="body1" marginLeft={1}>
                        {pet.age}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <LabelIcon sx={{ color: "#D5D5D5" }} />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        marginLeft={1}
                      >
                        Breed:
                      </Typography>
                      <Typography variant="body1" marginLeft={1}>
                        {pet.breed}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <LocationOnIcon sx={{ color: "#D5D5D5" }} />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        marginLeft={1}
                      >
                        Location:
                      </Typography>
                      <Typography variant="body1" marginLeft={1}>
                        {pet.location}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      paddingBottom: "20px",
                    }}
                  >
                    <Link href={`/pet/${pet.id}`} style={{ width: "100%" }}>
                      <Button
                        variant="outlined"
                        sx={{ width: "100%", borderRadius: "15px" }}
                      >
                        View Details
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" my={4}>
            <Typography variant="h6">
              There is no match. Please try again.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SearchPets;
