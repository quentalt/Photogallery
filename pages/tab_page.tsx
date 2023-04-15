import {
    Tab,
    Tabs,
    TabList,
} from '@chakra-ui/react'
import Link from "next/link";

export default function TabPage() {
    return (
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
    )
}

