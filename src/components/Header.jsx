import { Flex, Input, Button, Box } from "@mantine/core";

const Header = () => {
    return (
        <Box className="header" w={"100vw"}>
            <Flex
                justify={"flex-end"}
                align={"center"}
                wrap={"wrap"}
                w={"100%"}
                gap={20}
                px={40}
                py={10}
            >
                <Input></Input>
                <Button></Button>
            </Flex>
        </Box>
    );
};

export default Header;
