import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const initial = {
  title: "",
  body: "",
  category: "",
};
export const CreateNote = () => {
  const [data, setData] = useState(initial);
  const [editLoading, setEditLoading] = useState(false);
  const toast = useToast();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ------- Onchange Event Input tag ------ */
  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /* ------- Form Submit Handling ------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.title && data.body && data.category) {
      //   console.log(data);
      setEditLoading(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/notes/create`,
          data,
          {
            headers: headers,
          }
        );
        // console.log(res);
        setEditLoading(false);
        navigate("/notes");
        toast({
          position: "top",
          title: `Note Added Successfully`,
          status: "success",
          variant: "top-accent",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
        setEditLoading(false);
        toast({
          position: "top",
          title: `Error while Creating Note`,
          status: "error",
          variant: "top-accent",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      toast({
        position: "top",
        title: `Please Fill Out All The Fields`,
        status: "error",
        variant: "top-accent",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      create page
      <Box
        padding={10}
        margin={"30px auto"}
        bg="white"
        borderRadius={"5px"}
        boxShadow={"2xl"}
        width={{ base: "90%", md: "90%", lg: "40%" }}
      >
        <Heading as={"h3"} textAlign={"center"} fontSize={"1.0rem"} mb={"40px"}>
          Create New Note
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              border={"1px dotted gray"}
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={data.title}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Body</FormLabel>
            <Textarea
              border={"1px dotted gray"}
              placeholder="Body"
              name="body"
              onChange={handleChange}
              value={data.body}
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Category</FormLabel>
            <Input
              border={"1px dotted gray"}
              placeholder="Category"
              name="category"
              onChange={handleChange}
              value={data.category}
              type={"text"}
            />
          </FormControl>
          <Stack spacing={10} mt={"30px"} pt={2}>
            {editLoading ? (
              <Button
                type={"submit"}
                variant="outline"
                border={"1px solid #43A047"}
                isLoading
                loadingText="Creating.."
                size="lg"
                bg={"#1d2b4f"}
                color={"white"}
                borderRadius="5px"
                _hover={{
                  bg: "#43A047)",
                  color: "white",
                }}
              >
                Create
              </Button>
            ) : (
              <Button
                type={"submit"}
                variant="outline"
                rightIcon={<EditIcon />}
                onClick={handleSubmit}
                size="lg"
                border={"1px solid #43A047"}
                color={"#43A047"}
                borderRadius="5px"
                _hover={{
                  bg: "#43A047",
                  color: "white",
                }}
              >
                Create
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </>
  );
};
