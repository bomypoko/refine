import { useGetLocale } from "@pankod/refine-core";
import { DownOutlined } from "@ant-design/icons";
import {
    Layout as AntdLayout,
    Space,
    Menu,
    Button,
    Dropdown,
    Avatar,
} from "antd";
import NextRouter from "@pankod/refine-nextjs-router/legacy";
import { useRouter } from "next/router";

const { Link } = NextRouter;

export const Header: React.FC = () => {
    const locale = useGetLocale();
    const { locales } = useRouter();

    const currentLocale = locale();

    const menu = (
        <Menu selectedKeys={currentLocale ? [currentLocale] : []}>
            {[...(locales || [])].sort().map((lang: string) => (
                <Menu.Item
                    key={lang}
                    icon={
                        <span style={{ marginRight: 8 }}>
                            <Avatar
                                size={16}
                                src={`/images/flags/${lang}.svg`}
                            />
                        </span>
                    }
                >
                    <Link href="/" locale={lang}>
                        {lang === "en" ? "English" : "German"}
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <AntdLayout.Header
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0px 24px",
                height: "48px",
                backgroundColor: "#FFF",
            }}
        >
            <Dropdown overlay={menu}>
                <Button type="link">
                    <Space>
                        <Avatar
                            size={16}
                            src={`/images/flags/${currentLocale}.svg`}
                        />
                        {currentLocale === "en" ? "English" : "German"}
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </AntdLayout.Header>
    );
};
