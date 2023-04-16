import TabPage from "@/pages/tab_page";
import {Button, ButtonGroup, Card, CardBody, Modal} from "@chakra-ui/react";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useEffect, useState} from "react";
import Image from 'next/image';
import styles from '../styles/gallery.module.css'
import ImageModal from "@/pages/Modal";



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
                            <div className="m-20 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                    <div className="w-full h-56 bg-gray-100 group-hover:opacity-75 flex items-center justify-center text-sm text-gray-500">
                                        <Image
                                            src={CDNURL + file.name}
                                            alt={file.name}
                                            width={300}
                                            height={300}
                                        />
                                    </div>
                                        <div className="flex items-center">
                                        </div>
                                        <ButtonGroup spacing="4" margin="3" mb="10">
                                            <Button
                                                colorScheme="blue"
                                                variant="outline"
                                                onClick={() => handleViewImage(CDNURL + file.name)}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                colorScheme="red"
                                                variant="outline"
                                                onClick={() => deleteImage(file.name)}
                                            >
                                                Delete
                                            </Button>
                                        </ButtonGroup>


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
