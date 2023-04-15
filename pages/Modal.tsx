import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    imageURL: string;
}

export default function ImageModal(props: Props) {
    const { isOpen, onClose, imageURL } = props;
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </ModalHeader>
                <ModalBody>
                    <Image
                        src={imageURL}
                        alt="Selected Image"
                        onLoad={() => setIsLoading(false)}
                        style={{ display: isLoading ? "none" : "initial", maxWidth: "100%" }}
                        width={300}
                        height={300}
                    />
                    {isLoading && <div>Loading Image...</div>}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
