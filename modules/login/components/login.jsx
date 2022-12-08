/* eslint-disable jsx-a11y/alt-text */
import styled from "styled-components";
import Image from "next/image";
import srcImg from "../../../public/paycode.png";

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

const password = "password";

export function Login() {
  return (
    <Layout>
      <ContainerForm>
        <LogoContainer>
          <Image src={srcImg} width={300} height={100} alt="logo" />
        </LogoContainer>

        <FormContainer>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
          </div>
          <div className="form-group mb-2">
            <input
              type={password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <ButtonContainer>
            <Button type="button" className="btn btn-dark">
              Login
            </Button>
          </ButtonContainer>
        </FormContainer>
      </ContainerForm>
    </Layout>
  );
}
