import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4">
          <Text>Carlos Rodrigues</Text>
          <Text color="gray.300" fontSize="small">
            Carlos@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Carlos Rodrigues"
        src="https://github.com/carlosrodrigues94.png"
      />
    </Flex>
  );
}
