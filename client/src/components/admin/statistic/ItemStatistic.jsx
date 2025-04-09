import React from "react";
import { mdiArrowUpBold, mdiArrowDownBold } from "@mdi/js";
import Icon from "@mdi/react";

const ItemStatistic = ({ title, value, percent, icon, change }) => {
    return (
        <div className="col-lg-6">
            <div className="card widget-flat">
                <div className="card-body">
                    <div className="float-right">
                        <Icon className="widget-icon" path={icon} size={1.3} />
                    </div>
                    <h5 className="text-muted font-weight-normal mt-0">{title}</h5>
                    <h3 className="mt-3 mb-3 text-muted">{value}</h3>
                    <p className="mb-0 text-muted d-flex flex-column">
                        <span className={`text-${change === "up" ? "success" : "danger"} mr-2`}>
                            <Icon path={change === "up" ? mdiArrowUpBold : mdiArrowDownBold} size={1} />
                            {percent} %
                        </span>
                        <span className="text-nowrap">Since last month</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ItemStatistic;
