import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("O email precisa ser um email")
    .required("O email é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("A senha é obrigatório"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    event.preventDefault();

    console.log(values);
  };

  return (
    <Flex w={"100vw"} h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            name="email"
            label="E-mail"
            error={errors.email}
            {...register("email")}
          />
          <Input
            type="password"
            name="password"
            label="Senha"
            error={errors.password}
            {...register("password")}
          />
        </Stack>
        <Button
          type="submit"
          isLoading={formState.isSubmitting}
          mt="6"
          colorScheme="pink"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
