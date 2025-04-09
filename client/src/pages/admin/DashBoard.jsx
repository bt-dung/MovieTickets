import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { BarChart } from '@mui/x-charts/BarChart';
import ItemStatistic from "../../components/admin/statistic/ItemStatistic";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { fetchData } from "../../api/api";
import { mdiCalendarRange, mdiAccountMultiplePlus, mdiCartPlus, mdiCurrencyUsd, mdiPulse } from "@mdi/js";

const Dashboard = () => {
  const [dataRevenueAnalyst, setRevenue] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState("day");
  useEffect(() => {
    const getRevenueAnalyst = async () => {
      const resAnalyst = await fetchData(`/api/v1/revenue-analyst`);
      const formattedData = resAnalyst.data.map(item => ({
        ...item,
        totalRevenue: parseFloat(item.totalRevenue) || 0,
      }));
      setRevenue(formattedData);
    }
    getRevenueAnalyst();
  }, []);
  useEffect(() => {
    console.log(dataRevenueAnalyst);
  }, [dataRevenueAnalyst])

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
  return (
    dataRevenueAnalyst.length > 0 ? (
      <>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <form className="form-inline">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-light"
                        id="dash-daterange"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bg-primary border-primary text-white">
                          <Icon path={mdiCalendarRange} size={1} />
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
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
              <ItemStatistic title={"Customers"} value={120} percent={1.08} icon={mdiAccountMultiplePlus} change={"up"} />
              <ItemStatistic title={"Orders"} value={120} percent={1.08} icon={mdiCartPlus} change={"up"} />
              <ItemStatistic title={"Revenue"} value={120} percent={1.08} icon={mdiCurrencyUsd} change={"up"} />
              <ItemStatistic title={"Growth"} value={120} percent={1.08} icon={mdiPulse} change={"up"} />
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
      </>
    ) : (<></>)
  );
};

export default Dashboard;
