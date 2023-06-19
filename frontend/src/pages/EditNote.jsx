import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const note = {
  _id: "",
  title: "",
  body: "",
  category: "",
};
export const EditNote = () => {
  const [data, setData] = useState(note);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { id } = useParams();
  const toast = useToast();
  const { token } = useContext(AuthContext);

  // console.log(data);

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
    // console.log(data);
    setEditLoading(true);
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // };
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/notes/edit/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      // console.log(res);
      setEditLoading(false);
      toast({
        position: "top",
        title: `Note Edited Successfully`,
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
        title: `Error while Editing Note`,
        status: "error",
        variant: "top-accent",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const getSingleNote = async (id) => {
    setLoading(true);
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // };
    try {
      let resObj = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/notes/${id}`,
        {
          withCredentials: true,
        }
      );
      // console.log(resObj);
      setData(resObj.data.msg);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getSingleNote(id);
  }, []);
  return (
    <Box backgroundColor={"#F3E5F5"} margin={"20px auto"} padding={"25px"}>
      {loading ? (
        <Box mt={"10%"}>
          <Spinner size={"xl"} />
        </Box>
      ) : (
        <Box
          padding={10}
          margin={"30px auto"}
          bg="white"
          borderRadius={"5px"}
          boxShadow={"2xl"}
          width={{ base: "90%", md: "90%", lg: "40%" }}
        >
          <Heading
            as={"h3"}
            textAlign={"center"}
            fontSize={"1.0rem"}
            mb={"40px"}
          >
            Please Enter Details to Edit Note
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
                type={""}
              />
            </FormControl>
            <Stack spacing={10} mt={"30px"} pt={2}>
              {editLoading ? (
                <Button
                  type={"submit"}
                  variant="outline"
                  border={"1px solid #43A047"}
                  isLoading
                  loadingText="Editing Note"
                  size="lg"
                  bg={"#1d2b4f"}
                  color={"white"}
                  borderRadius="5px"
                  _hover={{
                    bg: "#43A047)",
                    color: "white",
                  }}
                >
                  Edit Note
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
                  Edit Note
                </Button>
              )}
            </Stack>
          </form>
        </Box>
      )}
    </Box>
  );
};
