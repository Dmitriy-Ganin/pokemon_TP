import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { setLogin } from '../../store/slices/loginSlice';
import { useRegisterMutation } from '../../API/authAPI';
import { setCookie } from '../../utils/cookes';
import { setToken } from '../../store/slices/tokenSlice';

import {
  RegisterWrapper,
  Form,
  Tabs,
  Tab,
  FormEl,
  RequiredLabel,
  Input,
  SignInButton
} from "../AuthForm/"

export const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const registerSchema = z.object({
    login: z.string().min(1, "Enter login"),
    password: z.string().min(6, "Please enter at least 6 symbol"),
    passwordConfirmation: z.string(),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

  type RegisterSchema = z.infer<typeof registerSchema>;

  const savedLogin = useSelector((state: RootState) => state.login.login);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      login: savedLogin || '',
      password: '',
      passwordConfirmation: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const response = await registerUser({
        companyName: data.login + "_Company",
        userName: data.login,
        email: `${data.login}@example.com`,
        password: data.password
      }).unwrap();

      setCookie('access_token', response.access_token, 3600);

      dispatch(setToken(response.access_token));
      dispatch(setLogin(data.login));

      navigate(import.meta.env.VITE_HOME);
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const handleSignInClick = () => {
    const currentLogin = getValues("login");
    if (currentLogin.trim()) {
      dispatch(setLogin(currentLogin));
    }
    navigate(import.meta.env.VITE_LOGIN);
  };

  return (
    <div>
      <RegisterWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Tabs>
            <Tab onClick={handleSignInClick}>Sign in</Tab>
            <Tab></Tab>
            <Tab as={Link} to={import.meta.env.VITE_REGISTER} $active={true}>
              Sign up
            </Tab>
          </Tabs>
          <div>
            <FormEl>
              <RequiredLabel>Login</RequiredLabel>
              <Input {...register("login")} />
              {errors.login && <p>{errors.login.message}</p>}
            </FormEl>
            <FormEl>
              <RequiredLabel>Password</RequiredLabel>
              <Input {...register("password")} type="password" />
              {errors.password && <p>{errors.password.message}</p>}
            </FormEl>
            <FormEl>
              <RequiredLabel>Password confirmation</RequiredLabel>
              <Input {...register("passwordConfirmation")} type="password" />
              {errors.passwordConfirmation && <p>{errors.passwordConfirmation.message}</p>}
            </FormEl>
            <SignInButton
              type="submit"
              value={isLoading ? 'Loading...' : 'Sign up'}
              disabled={isLoading}
            />
          </div>
        </Form>
      </RegisterWrapper>
    </div>
  )
}