import { Button } from "@chakra-ui/button";
import React from "react";

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
}

const PaginationItem: React.FC<PaginationItemProps> = ({
  isCurrent = false,
  number,
}) => {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: "pink.500",
          cursor: "default",
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      disabled
      _disabled={{
        bgColor: "gray.500",
      }}
    >
      {number}
    </Button>
  );
};

export default PaginationItem;
