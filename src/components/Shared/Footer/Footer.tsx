import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import assets from "@/assets";

const Footer = () => {
  return (
    <Box bgcolor="#3C0753" py={5}>
      <Container color="#fff">
        <Stack direction="row" gap={4} justifyContent="center">
          <Typography color="#fff">info@petlove.com</Typography>
          <Typography color="#fff">(0202) 456 0982</Typography>
          <Typography color="#fff">New York, USA</Typography>
        </Stack>
        <Stack direction="row" gap={2} justifyContent="center" py={3}>
          <Image
            src={assets.images.facebook}
            width={30}
            height={30}
            alt="facebook"
          />
          <Image
            src={assets.images.instagram}
            width={30}
            height={30}
            alt="instagram"
          />
          <Image
            src={assets.images.twitter}
            width={30}
            height={30}
            alt="twitter"
          />
          <Image
            src={assets.images.linkedin}
            width={30}
            height={30}
            alt="linkedin"
          />
        </Stack>
        <Box
          sx={{
            border: "1px dashed lightgray",
          }}
        ></Box>
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          py={3}
        >
          <Typography component="p" color="white">
            &copy;2024 PET LOVE. All Rights Reserved.
          </Typography>
          <Link href="/" passHref>
            <Stack direction="row" gap={1} alignItems="center">
              <Box>
                <Image
                  src={assets.svgs.logo}
                  width={50}
                  height={50}
                  alt="logo"
                />
              </Box>
            </Stack>
          </Link>
          <Typography component="p" color="white">
            Privacy Policy! Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
