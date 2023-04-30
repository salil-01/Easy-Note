import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const colors = ["#A0E7E5", "#B4F8C8", "#FBE7C6", "#F4B9B8", "#FADCD9"];
export const NotesCard = ({ _id, title, body, category, handleDelete }) => {
  const navigate = useNavigate();
  const handleDeleteNote = (id) => {
    handleDelete(id);
  };
  let bgColor = colors[Math.floor(Math.random() * colors.length)];
  // console.log(bgColor);
  return (
    <>
      <Flex
        gap={"15px"}
        // border={"1px solid"}
        flexDirection={"column"}
        padding={"20px"}
        borderRadius={"3px"}
        boxShadow={
          "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"
        }
        bg={bgColor}
      >
        <HStack gap={"8px"}>
          <Heading fontSize={"xl"} textAlign={"left"}>
            {title}
          </Heading>
          <Spacer />
          <HStack>
            <Box>
              <Tooltip hasArrow label="Edit" fontSize="md">
                <Button
                  size={"sm"}
                  bg={bgColor}
                  onClick={() => navigate(`/edit/${_id}`)}
                  _hover={{ bg: "green", color: "white" }}
                >
                  <EditIcon />
                </Button>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip hasArrow label="Delete" fontSize="md">
                <Button
                  size={"sm"}
                  bg={bgColor}
                  onClick={() => handleDeleteNote(_id)}
                  _hover={{ bg: "red", color: "white" }}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </Box>
          </HStack>
        </HStack>
        <Text style={{ hyphens: "auto", textAlign: "justify" }}>{body}</Text>
        <Text fontSize={"1.1rem"} fontWeight={"500"} textAlign={"left"}>
          Category : {category}
        </Text>
      </Flex>
    </>
  );
};
