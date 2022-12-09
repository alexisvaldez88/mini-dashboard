/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { api } from "../../../core/api";
import Image from "next/image";
import { useAuth } from "../../../hooks/useAuth";
import { UserData } from "../../../models/models";
import srcImg from "../../../public/logout.svg";
import arrowUp from "../../../public/arrow-up.svg";
import arrowDown from "../../../public/arrow-down.svg";
import { Card } from "../../../components";
import { routes } from "../../../routes/routes";

const Container = styled.div`
  padding: 2rem;
`;

const ContainerSubtitle = styled.div`
  margin-top: 2rem;
`;

const ContainerData = styled.div``;

const CardChart = styled.div`
  min-height: 100%;
  width: 300px;
  height: 150px;

  @media (min-width: 768px) {
    width: 500px;
    height: 250px;
  }
`;

const ContainerChart = styled.div``;

const LabelSubtitle = styled.div`
  font-size: 1.5rem;
`;

const CurrencyText = styled.span`
  font-size: 1rem;
`;

const WelcomeMessage = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;

export function Dashboard() {
  const { isAuth } = useAuth();
  const { replace } = useRouter();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    paternalSurname: "",
    maternalSurname: "",
    phone: "",
    email: "",
  });

  const [chartData, setCharData] = useState<any>([{}]);

  const [totalAmount, setTotalAmount] = useState<number>(0);

  const [reportData, setReportData] = useState<any>([]);

  const handleRedirect = async () => {
    const auth = await isAuth();
    if (!auth) {
      replace("/login");
    } else {
      replace("/dashboard");
    }
  };

  async function getUserData() {
    const token = localStorage.getItem("accessToken") || "";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await api
      .get(routes.URL_ME, config)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getReportData() {
    const token = localStorage.getItem("accessToken") || "";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await api
      .get(routes.URL_REPORT, config)
      .then((res) => {
        setReportData(res.data);
        buildChartData(res.data.revenuePerHour);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function logOut() {
    window.localStorage.clear();
    handleRedirect();
  }

  function getPercent(currentValue: number, oldValue: number): string {
    const percent = (currentValue / oldValue) * 100 - 100;
    return percent.toFixed(1);
  }

  function getPercentState(percent: string): boolean {
    return percent.charAt(0) === "-";
  }

  function buildChartData(revenuePerHour: Array<number>) {
    let data = [];
    let sum = 0;
    if (revenuePerHour) {
      for (let i = 0; i < revenuePerHour.length; i++) {
        sum += revenuePerHour[i];
        data.push({
          name: `${i}:00`,
          total: revenuePerHour[i],
        });
      }
    }
    setTotalAmount(sum);
    setCharData(data);
  }

  useEffect(() => {
    getUserData();
    getReportData();
    handleRedirect();
  }, []);

  return (
    <Container className="container">
      <div className="row justify-content-between">
        <WelcomeMessage className="col-10">
          Bienvenido {userData.name}
        </WelcomeMessage>
        <button
          type="button"
          className="btn btn-light col-auto d-flex align-items-center"
          onClick={logOut}
        >
          <Image
            src={srcImg}
            width={25}
            height={25}
            alt="logo"
            loading="eager"
            priority={true}
            className="p-1"
          />
          Logout
        </button>
      </div>
      <ContainerSubtitle className="row justify-content-start">
        <LabelSubtitle className="d-flex align-items-baseline fw-normal">
          Reporte de<h4 className="ms-1 fw-bold"> Hoy</h4>
        </LabelSubtitle>
      </ContainerSubtitle>
      {reportData.averageTicket ? (
        <ContainerData className="row justify-content-center mt-3">
          <div className="col-auto">
            <ContainerChart className="justify-content-between shadow bg-white rounded p-3">
              <div>
                <h6 className="text-secondary pb-2">Ingresos</h6>
                <h2 className="fw-bold d-flex align-items-baseline">
                  ${totalAmount}
                  <CurrencyText className="text-secondary fw-bold  ms-2">
                    MXN
                  </CurrencyText>
                </h2>
              </div>
              <CardChart>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="1 7" />
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Line
                      type="linear"
                      dataKey="total"
                      stroke="#73D99F"
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardChart>
            </ContainerChart>
          </div>
          <div className="col-auto">
            <div className="row p-1">
              <Card
                title={"Ticket promedio"}
                detail={`$${reportData.averageTicket}`}
                currency={"MXN"}
                showPercent
                percent={getPercent(
                  reportData.averageTicket,
                  reportData.previousDay.averageTicket
                )}
                imgSrc={
                  getPercentState(
                    getPercent(
                      reportData.averageTicket,
                      reportData.previousDay.averageTicket
                    )
                  )
                    ? arrowDown
                    : arrowUp
                }
                trenddingUp={
                  !getPercentState(
                    getPercent(
                      reportData.averageTicket,
                      reportData.previousDay.averageTicket
                    )
                  )
                }
              />
            </div>
            <div className="row p-1">
              {" "}
              <Card
                title={"Ticket tope"}
                detail={`$${reportData.topTicket}`}
                currency={"MXN"}
                showPercent
                percent={getPercent(
                  reportData.topTicket,
                  reportData.previousDay.topTicket
                )}
                imgSrc={
                  getPercentState(
                    getPercent(
                      reportData.topTicket,
                      reportData.previousDay.topTicket
                    )
                  )
                    ? arrowDown
                    : arrowUp
                }
                trenddingUp={
                  !getPercentState(
                    getPercent(
                      reportData.topTicket,
                      reportData.previousDay.topTicket
                    )
                  )
                }
              />
            </div>
            <div className="row p-1">
              {" "}
              <Card
                title={"Método de pago mas usado"}
                detail={
                  reportData.topPaymentMethod === "card"
                    ? "Tarjeta de credito/debito"
                    : "Efectivo"
                }
                currency={""}
                showPercent={false}
              />
            </div>
          </div>
        </ContainerData>
      ) : null}
    </Container>
  );
}
