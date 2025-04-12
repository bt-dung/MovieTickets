import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { BarChart } from '@mui/x-charts/BarChart';
import ItemStatistic from "../../components/admin/statistic/ItemStatistic";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { fetchData } from "../../api/api";
import { formatMonth } from "../../utils/formatDateHelper";
import { mdiAccountMultiplePlus, mdiCartPlus, mdiCurrencyUsd, mdiPulse } from "@mdi/js";

const Dashboard = () => {
  const [dataRevenueAnalyst, setRevenue] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState("day");
  const [userAnalyst, setUserAnalyst] = useState("");
  const [orderAnalyst, setOrderAnalyst] = useState("");
  const [revenueAnalyst, setRevenueAnalyst] = useState("");
  const [ticketAnalyst, setTicketAnalyst] = useState("");
  const [month, setMonth] = useState(formatMonth(Date.now()));
  const [theBestMovieofMonth, setMovie] = useState([]);
  useEffect(() => {
    const getRevenueAnalyst = async () => {
      const resAnalyst = await fetchData(`/admin/revenue-analyst`);
      const formattedData = resAnalyst.data.map(item => ({
        ...item,
        totalRevenue: parseFloat(item.totalRevenue) || 0,
      }));
      setRevenue(formattedData);
    }
    getRevenueAnalyst();
  }, []);
  useEffect(() => {
    const fetchAnalysts = async () => {
      const resUserAnalyst = await fetchData(`/admin/analytics/users?key=${selectedDateTime}`);
      setUserAnalyst(resUserAnalyst);
      const resOrderAnalyst = await fetchData(`/admin/analytics/orders?key=${selectedDateTime}`);
      setOrderAnalyst(resOrderAnalyst);
      const resRevenueAnalyst = await fetchData(`/admin/analytics/revenues?key=${selectedDateTime}`);
      setRevenueAnalyst(resRevenueAnalyst);
      const resTicketAnalyst = await fetchData(`/admin/analytics/tickets?key=${selectedDateTime}`);
      setTicketAnalyst(resTicketAnalyst);
    }
    fetchAnalysts();
  }, [selectedDateTime]);

  useEffect(() => {
    const fetchTheBestMoviesofMonth = async () => {
      const resTheBestMovie = await fetchData(`/admin/analystics/movies?month=${month}`);
      console.log(resTheBestMovie);
      setMovie(resTheBestMovie);
    };

    fetchTheBestMoviesofMonth();
  }, [month]);
  const chartParams = {
    yAxis: [
      {
        label: 'Total Revenue (VND)',
      },
    ],
    series: [
      {
        label: 'Revenue',
        dataKey: 'totalRevenue',
        valueFormatter: (v) => {
          const numericValue = parseFloat(v);
          return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(numericValue);
        },
      },
    ],
    slotProps: { legend: { hidden: true } },
    dataset: dataRevenueAnalyst,
    height: 380,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-40px, 0)',
      },
    },
  };
  const chartSetting = {
    xAxis: [
      {
        label: 'TICKETS SOLD',
      },
    ],
    width: 1300,
    height: 500,
    margin: {
      left: 250,
      right: 50,
      top: 50,
      bottom: 50,
    },
  };
  const valueFormatter = (value) => `${value} ticket`;
  const handleChange = (e) => {
    const value = e.target.value;
    setMonth(value);
    onChange && onChange(value);
  };

  return (
    dataRevenueAnalyst.length > 0 ? (
      <>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <h1 className="text-muted mb-3">Dashboard</h1>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-5 col-lg-6">
            <div className="mb-2 w-25">
              <select
                className="custom-select"
                id="inputGroupSelect02"
                value={selectedDateTime}
                onChange={(e) => setSelectedDateTime(e.target.value)}
                style={{ border: "none", textAlign: "center", textAlignLast: "center" }}
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
            <div className="row">
              <ItemStatistic time={selectedDateTime} title={"Customers"} value={userAnalyst?.current} percent={userAnalyst?.percentage} icon={mdiAccountMultiplePlus} change={userAnalyst?.status} />
              <ItemStatistic time={selectedDateTime} title={"Orders"} value={orderAnalyst?.current} percent={orderAnalyst?.percentage} icon={mdiCartPlus} change={orderAnalyst?.status} />
              <ItemStatistic time={selectedDateTime} title={"Revenue"} value={revenueAnalyst?.current} percent={revenueAnalyst?.percentage} icon={mdiCurrencyUsd} change={revenueAnalyst?.status} />
              <ItemStatistic time={selectedDateTime} title={"Tickets"} value={ticketAnalyst?.current} percent={ticketAnalyst?.percentage} icon={mdiPulse} change={ticketAnalyst?.status} />
            </div>
          </div>
          <div className="col-xl-7 col-lg-6">
            <div className="card">
              <div className="card-body">
                <BarChart
                  xAxis={[
                    {
                      scaleType: 'band',
                      dataKey: 'month',
                      valueFormatter: (month, context) =>
                        context.location === 'tick' ? month : `Month: ${month}`,
                    },
                  ]}
                  {...chartParams}
                  margin={{ top: 10, bottom: 30, left: 100, right: 10 }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex mt-4 flex-column align-items-center">
          <div className="w-100 position-relative mb-3" style={{ maxWidth: "1200px" }}>
            <h1
              className="text-center"
              style={{ color: "#ff5733", fontWeight: "bold" }}
            >
              Movie Rating
            </h1>

            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                textAlign: "right",
              }}
            >
              <input
                type="month"
                id="monthPicker"
                className="form-control"
                onChange={handleChange}
                defaultValue={month}
              />
              {month && (
                <p className="mt-2">
                  Choosed month: <strong>{month}</strong>
                </p>
              )}
            </div>
          </div>

          <BarChart
            dataset={theBestMovieofMonth}
            yAxis={[{ scaleType: "band", dataKey: "movie" }]}
            series={[
              {
                dataKey: "tickets",
                label: "Tickets Sold",
                valueFormatter,
                color: "#FFA500",
              },
            ]}
            layout="horizontal"
            grid={{ vertical: true }}
            {...chartSetting}
          />
        </div>

      </>
    ) : (<></>)
  );
};

export default Dashboard;
