import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2%;
  padding-top: 10%;
  padding-left: 20%;
  padding-right: 20%;
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
`;

const CardBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

export const DateSelection = () => {
  const dates: string[] = [
    "21-06-2021",
    "23-06-2022",
    "24-06-2022",
    "27-06-2022",
    "28-06-2022",
  ];

  const getMonth = (val: string): string => {
    const months: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = months.find((m) => m === val) ?? "";
    return date;
  };

  return (
    <Container>
      {dates.map((item: string, key: number) => (
        <div
          className="card"
          style={{ width: "20rem", margin: "1%", flexWrap: "wrap" }}
          key={key}
        >
          <div className="card-body">
            <CardTitle>{item.split("-")[0]}</CardTitle>
            <CardBody>{getMonth(item.split("-")[1].split("0")[1])}</CardBody>
            <CardBody>{item.split("-")[2]}</CardBody>
            <CardBody>
              <button type="button" className="btn btn-outline-primary btn-sm">
                Select Date
              </button>
            </CardBody>
          </div>
        </div>
      ))}
    </Container>
  );
};
