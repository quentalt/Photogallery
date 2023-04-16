import {Button, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";
import styles from '../styles/gallery.module.css'

export default function ColorSwitchMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
           <Button onClick={toggleColorMode}>
                {colorMode === "light" ?
                    <MoonIcon className={styles.icon}/> : <SunIcon className={styles.icon}/>}
            </Button>

        </>
    )
}