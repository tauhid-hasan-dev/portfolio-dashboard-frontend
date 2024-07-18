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
        <Typography
          variant="h2"
          component="h4"
          fontWeight={600}
          color="primary.main"
        >
          Welcome to Your Dashboard
        </Typography>
        <Typography sx={{ my: 4 }}>
          This is the dashboard for your portfolio
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
          <Image
            src={assets.images.profile}
            width={450}
            height={400}
            alt="cat"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
