import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Flex } from "@mantine/core";
import socket from "../scripts/socket";

const Inputmessage = () => {
    const form = useForm({
        initialValues: {
            content: "",
        },
    });

    // const [content, setContent] = useState("");
    // console.log(content);
    // useEffect(() => {
    // });

    const submit = form.onSubmit((formValues) => {
        socket.emit("NewMessage", formValues.content);
        form.reset();
    });

    return (
        <Flex w={"100%"} justify={"center"}>
            <Box maw={300}>
                <form onSubmit={submit}>
                    <TextInput
                        placeholder="Votre message"
                        {...form.getInputProps("content")}
                    ></TextInput>
                </form>
                <Button onClick={submit}>Envoyer</Button>
            </Box>
            {/* <Input
                variant="filled"
                placeholder="Your email"
                onChange={(e) => setContent(e.target.value)}
            />
            <p>{content}</p> */}
        </Flex>
    );
};

export default Inputmessage;
