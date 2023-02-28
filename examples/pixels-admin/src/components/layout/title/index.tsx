import React from "react";
import { TitleProps } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

const { Link } = routerProvider;

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
    <Link to="/">
        {collapsed ? (
            <img
                src={"/pixels-admin-collapsed.svg"}
                alt="Pixels Admin"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 24px",
                }}
            />
        ) : (
            <img
                src={"/pixels-admin.svg"}
                alt="Pixels Admin"
                style={{
                    width: "200px",
                    padding: "12px 24px",
                }}
            />
        )}
    </Link>
);
