import { Box, Button, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        flexDirection={{ sm: "column", md: "column", lg: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={{ sm: "100%", md: "100%", lg: "80%" }}
        margin={"auto"}
        gap={{ sm: "30px", md: "30px", lg: "0px" }}
        marginTop={{ sm: "10px", md: "10px", lg: "100px" }}
      >
        <Box width={{ sm: "100%", md: "100%", lg: "40%" }}>
          <Heading>Your notes.</Heading>
          <Heading>Organized.</Heading>
          <Heading>Effortless.</Heading>
          <Box width={"80%"} margin={"20px auto"}>
            <Text fontSize={"1.2rem"} textAlign={"justify"}>
              Take notes anywhere. Find Information faster. Share ideas with
              anyone. Meeting notes, web pages, projects, to do lists - with{" "}
              <b>Easynote</b> as your note taking app, nothing falls through the
              crack.
            </Text>
          </Box>
          <Flex
            width={{ sm: "60%", md: "60%", lg: "80%" }}
            margin={"auto"}
            alignItems={"center"}
            fontSize={"1.2rem"}
          >
            <Button
              variant={"ghost"}
              _hover={{
                textDecoration: "underline",
              }}
              fontSize={"1.2rem"}
              onClick={() => navigate("/login")}
            >
              Login{" "}
            </Button>
            /
            <Button
              variant={"ghost"}
              _hover={{
                textDecoration: "underline",
              }}
              onClick={() => navigate("/signup")}
              fontSize={"1.2rem"}
            >
              {" "}
              Signup{" "}
            </Button>
            to access your notes
          </Flex>
        </Box>
        <Box width={{ sm: "70%", md: "70%", lg: "50%" }}>
          <Img src="homepage.png" />
        </Box>
      </Flex>
    </>
  );
};
