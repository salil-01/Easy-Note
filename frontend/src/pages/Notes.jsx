import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NotesCard } from "../components/NotesCard";
import { AuthContext } from "../context/AuthContext";
const arr = [
  {
    author: "Ansh",
    authorID: "644d055694cc24756cc09e70",
    body: "Some Random Body",
    category: "Sci Fi",
    title: "Some Random Title",
    _id: "644d0bf3a4c9bc9b7ceb31c2",
  },
];

const deleteNote = async (id) => {
  // console.log(id)
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/notes/delete/${id}`,
    {
      withCredentials: true,
    }
  );
};
export const Notes = () => {
  const [notesData, setNotesData] = useState([] || arr);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  /* -------  Search a Single Note------ */
  const handleSearch = (query) => {
    getData(`${process.env.REACT_APP_BACKEND_URL}/notes`, query);
  };

  /* ------- Key Event ------ */
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      console.log(inputRef.current.value);
      handleSearch(inputRef.current.value);
    }
  };
  /* -------  Delete Single Note------ */
  const handleDelete = async (id) => {
    // console.log(id);
    setLoading(true);
    await deleteNote(id)
      .then(() => {
        getData(`${process.env.REACT_APP_BACKEND_URL}/notes`);
        toast({
          title: "Note Deleted",
          position: "top",
          status: "success",
          variant: "top-accent",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(() => {
        getData(`${process.env.REACT_APP_BACKEND_URL}/notes`);
        toast({
          title: "Error while Deleting Note",
          position: "top",
          status: "error",
          variant: "top-accent",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /* -------Get Data of All Notes ------ */
  const getData = async (url, val) => {
    const parameter = val ? { title: val } : null;
    setLoading(true);
    try {
      let res = await axios.get(url, {
        withCredentials: true,
        params: parameter,
      });
      // console.log(res.data);
      setNotesData(res.data.msg);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  /* ------- Get Users ------ */
  useEffect(() => {
    inputRef.current.focus();
    if (notesData.length === 0) {
      getData(`${process.env.REACT_APP_BACKEND_URL}/notes`);
    }
  }, []);
  return (
    <Box bg={"#DDFFE7"}>
      <Box
        width={{
          sm: "50%",
          md: "50%",
          lg: "30%",
        }}
        margin={"auto"}
        padding={"20px"}
      >
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <InputGroup>
            <Input
              ref={inputRef}
              placeholder="Search your notes"
              border={"1px dotted gray"}
              onKeyDown={handleKeyPress}
            />
            <InputRightElement>
              <IconButton
                icon={<Search2Icon />}
                aria-label="Search-Notes"
                size={"sm"}
                variant={"ghost"}
                onClick={() => handleSearch(inputRef.current.value)}
              />
            </InputRightElement>
          </InputGroup>

          <Tooltip hasArrow label="Create a Note" fontSize="md">
            <Button
              onClick={() => navigate(`/create`)}
              _hover={{ bg: "green", color: "white" }}
            >
              <AddIcon boxSize={"20px"} />
            </Button>
          </Tooltip>
        </HStack>
      </Box>
      {loading ? (
        <Box mt={"10%"}>
          <Spinner size={"xl"} />
        </Box>
      ) : (
        <Box margin={"auto"} padding={"20px"}>
          <SimpleGrid
            width={{
              sm: "98%",
              md: "98%",
              lg: "90%",
            }}
            margin={"auto"}
            // border={"1px solid"}
            gridTemplateColumns={{
              sm: "repeat(2,1fr)",
              md: "repeat(2,1fr)",
              lg: "repeat(3,1fr)",
            }}
            gap={"25px"}
          >
            {notesData?.map((element) => (
              <NotesCard
                key={element._id}
                handleDelete={handleDelete}
                {...element}
              />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};
