import { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validate = () => {
    if (password !== confirmPassword)
      return false;
    if (username.trim().length === 0)
      return false;
    if (email.trim().length === 0)
      return false;
    if (email.indexOf('@') === -1)
      return false;
    return true;
  }
  const register = async (e) => {
    e.preventDefault();
    if (!validate())
      return;
    await publicRequest.post('auth/register', { name, lastName, username, email, password });
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={register}>
          <Input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
          <Input placeholder="last name" value={lastName} onChange={e => setLastName(e.target.value)} />
          <Input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
          <Input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
          <Input placeholder="confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type={'submit'}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
