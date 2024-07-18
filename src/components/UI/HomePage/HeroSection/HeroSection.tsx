import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h3" component="h3" fontWeight={600}>
          Find your best friend
        </Typography>

        <Typography
          variant="h2"
          component="h1"
          fontWeight={600}
          color="primary.main"
        >
          Adopt and Care
        </Typography>
        <Typography sx={{ my: 4 }}>
          Could you give a pet a forever home? Browse our pooches looking for a
          new start.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button href="/about-us" variant="outlined">
            Learn More
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Box>
          <Image src={assets.images.cat} width={450} height={400} alt="cat" />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
