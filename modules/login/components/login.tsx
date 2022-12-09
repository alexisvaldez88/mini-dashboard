import Image from "next/image";
import srcImg from "../../../public/paycode.png";
import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../../../core/api";
import { UserModel } from "../../../models/models";

const Layout = styled.div`
  position: relative;
  display: contents;
`;

const ContainerForm = styled.div`
  background-color: #ffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  justify-content: center;
  display: block;
`;

const LogoContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.div`
  padding: 1rem;
`;

const Button = styled.button`
  width: 150px;
`;

const passwordType = "password";

export function Login() {
  const [userData, setUserData] = useState<UserModel>({
    email: "",
    password: "",
  });

  async function sendData(){
    console.log(userData);
    const URL = '/login'

    await api
        .post(URL, userData)
        .then(res => {
          window.localStorage.setItem("accessToken", res.data.token);
          window.location.href = "/home";
        })
        .catch(error => {
          console.error(error);
          alert("¡Usuario y/o Contraseña incorrectos!")
        })
  }

  return (
    <Layout>
      <ContainerForm>
        <LogoContainer>
          <Image src={srcImg} width={300} height={100} alt="logo" loading="eager" priority={true} />
        </LogoContainer>

        <FormContainer>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({
                  email: e.target.value,
                  password: userData.password,
                })
              }
            />
          </div>
          <div className="form-group mb-2">
            <input
              type={passwordType}
              className="form-control"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ email: userData.email, password: e.target.value })
              }
            />
          </div>
          <ButtonContainer>
            <Button type="button" className="btn btn-dark" onClick={sendData}>
              Login
            </Button>
          </ButtonContainer>
        </FormContainer>

        
      </ContainerForm>


    </Layout>
  );
}
