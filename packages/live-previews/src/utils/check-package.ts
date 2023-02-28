export const checkPackage = (code = "") => {
    const set = new Set<string>();

    const hasAntd =
        code.includes("@pankod/refine-antd") ||
        code.includes("RefineAntd") ||
        code.includes(`from "antd"`);
    const hasMui =
        code.includes("@pankod/refine-mui") ||
        code.includes("RefineMui") ||
        code.includes("@emotion/react") ||
        code.includes("@emotion/styled") ||
        code.includes("@mui/lab") ||
        code.includes("@mui/material") ||
        code.includes("@mui/x-data-grid");
    const hasMantine =
        code.includes("@pankod/refine-mantine") ||
        code.includes("RefineMantine") ||
        code.includes("@mantine/core") ||
        code.includes("@mantine/hooks") ||
        code.includes("@mantine/form") ||
        code.includes("@mantine/notifications");
    const hasChakra =
        code.includes("@pankod/refine-chakra-ui") ||
        code.includes("RefineChakra") ||
        code.includes("@chakra-ui/react");
    const hasAntdInferencer =
        code.includes("@pankod/refine-inferencer/antd") ||
        code.includes("RefineAntdInferencer");
    const hasMuiInferencer =
        code.includes("@pankod/refine-inferencer/mui") ||
        code.includes("RefineMuiInferencer");
    const hasMantineInferencer =
        code.includes("@pankod/refine-inferencer/mantine") ||
        code.includes("RefineMantineInferencer");
    const hasChakraInferencer =
        code.includes("@pankod/refine-inferencer/chakra-ui") ||
        code.includes("RefineChakraInferencer");
    const hasHeadlessInferencer =
        code.includes("@pankod/refine-inferencer/headless") ||
        code.includes("RefineHeadlessInferencer");

    if (hasAntd) {
        set.add("antd");
    }
    if (hasAntdInferencer) {
        set.add("antd-inferencer");
    }

    if (hasMui) {
        set.add("mui");
    }
    if (hasMuiInferencer) {
        set.add("mui-inferencer");
    }

    if (hasMantine) {
        set.add("mantine");
    }
    if (hasMantineInferencer) {
        set.add("mantine-inferencer");
    }

    if (hasChakra) {
        set.add("chakra");
    }
    if (hasChakraInferencer) {
        set.add("chakra-inferencer");
    }

    if (hasHeadlessInferencer) {
        set.add("headless-inferencer");
    }

    return set;
};
