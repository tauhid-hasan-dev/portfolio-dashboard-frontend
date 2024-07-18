import React from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Paper,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";

const teamMembers = [
  {
    name: "Asif Abdullah",
    role: "CEO",
    imageUrl: "https://i.ibb.co/5MzQd0n/person1.jpg",
  },
  {
    name: "Abu Ubayda",
    role: "CTO",
    imageUrl: "https://i.ibb.co/ZfZKBHP/person2.jpg",
  },
  {
    name: "Muhammad Deif",
    role: "COO",
    imageUrl: "https://i.ibb.co/DWzLwFS/person3.jpg",
  },
];

const About = () => {
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: "24px", marginTop: "24px" }}>
        <Box my={4} textAlign="start">
          <Typography variant="h5" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            Pet Love is an online, searchable database of animals who need
            homes. It is also a directory of nearly 11,000 animal shelters and
            adoption organizations across the U.S., Canada, and Mexico.
            Organizations maintain their own home pages and available-pet
            databases.
          </Typography>
          <Box
            mt={4}
            p={3}
            sx={{ backgroundColor: "#F1EAFF", borderRadius: "8px" }}
          >
            <Typography variant="h5" gutterBottom>
              OUR MISSION
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="• Increase public awareness of the availability of high-quality adoptable pets" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Increase the overall effectiveness of pet adoption programs across North America." />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Elevate the status of pets to that of family member" />
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box textAlign="center" my={4}>
          <Typography variant="h5" gutterBottom my={4}>
            Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    src={member.imageUrl}
                    alt={member.name}
                    sx={{ width: 120, height: 120, mb: 2, boxShadow: 3 }}
                  />
                  <Typography variant="h5">{member.name}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {member.role}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;
