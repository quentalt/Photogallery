import {
    Tab,
    Tabs,
    TabList
} from '@chakra-ui/react'
import Link from "next/link";
import ColorSwitchMode from "@/pages/colorswitchmode";

export default function TabPage() {


    return (
        <>
            <ColorSwitchMode/>
        <Tabs variant="with-border" colorScheme={"green"}>
            <TabList>
                <Link href={"/"}>
                    <Tab>Home</Tab>
                </Link>
                <Link href={"/gallery"}>
                    <Tab>Gallery</Tab>
                </Link>
                <Link href={"/imageupload"}>
                    <Tab>Upload</Tab>
                </Link>
            </TabList>
        </Tabs>
        </>
    )
}

