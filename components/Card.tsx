import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { PercentProps, CardProps } from "../models/models";


const CardElm = styled.div`
  margin: 0 auto;
  display: block !important;
  @media (min-width: 480px) {
    display: flex !important;
  }
`;

const CardTitle = styled.h6``;

const CardDescription = styled.h2``;

const CurrencyText = styled.span`
  font-size: 1rem;
`;

const PercentDetail = styled.div<PercentProps>`
  background-color: ${({ trenddingUp }) =>
    trenddingUp ? "#fbe5e6" : "#D5F2DF"};
  height: 1rem;
  display: flex;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0.4rem;
  @media (min-width: 768px) {
    height: 2rem;
    padding: 0.7rem;
    border-radius: 0.8rem;
  }
`;

const PercentValue = styled.p<PercentProps>`
  margin: 0;
  font-size: 0.8rem;
  color: ${({ trenddingUp }) => (trenddingUp ? "#ac263b" : "#73D99F")};
  @media (min-width: 768px) {
    font-size: 1rem;
    font-weight: 600;
    padding: 0.1rem;
  }
`;

export function Card({
  title,
  detail,
  currency,
  showPercent,
  imgSrc = "",
  trenddingUp = false,
  percent = "",
}: CardProps) {
  return (
    <CardElm className="justify-content-between shadow p-3 bg-white rounded">
      <div className="">
        <CardTitle className="text-secondary pb-2">{title}</CardTitle>
        <CardDescription className="fw-bold d-flex align-items-baseline">
          {detail}
          <CurrencyText className="text-secondary fw-bold  ms-2">
            {currency !== "" ? currency : ""}
          </CurrencyText>
        </CardDescription>
      </div>
      {showPercent ? (
        <PercentDetail trenddingUp={trenddingUp}>
          <Image
            src={imgSrc}
            width={20}
            height={20}
            alt="arrow-down"
            loading="eager"
            priority={true}
            className="icon p-1"
          />
          <PercentValue trenddingUp={trenddingUp}>
            {Math.abs(parseFloat(percent))}%
          </PercentValue>
        </PercentDetail>
      ) : null}
    </CardElm>
  );
}
