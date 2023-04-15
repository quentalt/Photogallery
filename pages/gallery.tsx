import TabPage from "@/pages/tab_page";
import {Button, ButtonGroup, Card, CardBody, Modal} from "@chakra-ui/react";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useEffect, useState} from "react";
import Image from 'next/image';
import styles from '../styles/gallery.module.css'
import ImageModal from "@/pages/Modal";

interface ImageData {
    name: string;
}

export default function Gallery() {
const supabase = useSupabaseClient();
    const [loading, setLoading] = useState(true);
const [data, setData] = useState<any>([]);
    const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const CDNURL = "https://fcgevnradkuomebumufq.supabase.co/storage/v1/object/public/imagesbucket/public/";

    useEffect(() => {
        getImages().then(r => setLoading(false));
    }
    , []);


    async function getImages() {
        const { data, error } = await supabase.storage.from("imagesbucket").list('public',{
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
            })

        if (error) {
            console.log(error);
        }
        if (data) {
            setData(data);
        }
    }

    async function deleteImage(imageName:string) {
        const { data, error } = await supabase
            .storage
            .from('imagesbucket')
            .remove([ 'public/' + imageName])

        if (data) {
            console.log(data);
        }

        if(error) {
            alert(error);
        } else {
            await getImages();
        }
    }

    function handleViewImage(imageURL: string) {
        setSelectedImageURL(imageURL);
        setIsOpen(true);
    }



    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            <TabPage/>

                    <div className={styles.masonry}>
                        {data.map((file: any) => (
                            <div key={file.name}>
                            <div className="columns-1">
                                <Card>
                                    <CardBody>
                                        <Image
                                            key={file.name}
                                            src={CDNURL + file.name}
                                            alt={file.name}
                                            blurDataURL={CDNURL + file.name}
                                            width={300}
                                            height={300}
                                        />
                                       <ButtonGroup
                                            variant="outline"
                                            colorScheme="red"
                                            size="sm"
                                            mt={2}
                                            style={{ display: 'flex', gap:'5px' }}

                                        >
                                            <Button
                                                onClick={() => deleteImage(file.name)}
                                            >
                                                Delete
                                            </Button>
                                           <Button variant="outline" colorScheme="blue" size="sm" mt={2} onClick={() => handleViewImage(CDNURL + file.name)}>
                                                View
                                            </Button>
                                        </ButtonGroup>
                                    </CardBody>
                                </Card>
                            </div>
                                {isOpen && (
                                    <ImageModal
                                        isOpen={isOpen}
                                        onClose={() => setIsOpen(false)}
                                        imageURL={selectedImageURL || ""}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
    )
}
