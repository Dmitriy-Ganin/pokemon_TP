import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { setLogin } from '../../store/slices/loginSlice';
import { useLoginMutation } from '../../API/authAPI';
import { setCookie } from '../../utils/cookes';
import { setToken } from '../../store/slices/tokenSlice';
import { store, saveStateToStorage } from '../../store/store';

import {
  LoginWrapper,
  Form,
  Tabs,
  Tab,
  FormEl,
  RequiredLabel,
  Input,
  SignInButton
} from "../AuthForm/"

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const Login = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();

  const loginSchema = z.object({
    login: z.string().min(1, "Enter login"),
    password: z.string().min(6, "Please enter at least 6 characters"),
  });

  type LoginSchema = z.infer<typeof loginSchema>;

  const savedLogin = useSelector((state: RootState) => state.login);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: savedLogin || '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await loginUser({
        email: `${data.login}@example.com`,
        password: data.password
      }).unwrap() as LoginResponse;

      setCookie('access_token', response.access_token, 3600);

      dispatch(setToken(response.access_token));
      dispatch(setLogin(data.login));

      localStorage.setItem('activeLogin', data.login);

       const state = store.getState();
       saveStateToStorage(state);

      navigate(import.meta.env.VITE_HOME);
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.status === 500) {
        console.error('Server error 500');
        await onSubmit(data);
      }
    }
  };

  const handleSignUpClick = () => {
    const currentLogin = getValues("login");
    if (currentLogin.trim()) {
      dispatch(setLogin(currentLogin));
    }
    navigate(import.meta.env.VITE_REGISTER);
  };

  return (
    <LoginWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Tabs>
          <Tab as={Link} to={import.meta.env.VITE_LOGIN} $active={true}>
            Sign in
          </Tab>
          <Tab></Tab>
          <Tab onClick={handleSignUpClick}>
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
          <SignInButton
            type="submit"
            value={isLoading ? 'Loading...' : 'Sign in'}
            disabled={isLoading}
          />
        </div>
      </Form>
    </LoginWrapper>
  )
}