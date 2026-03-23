import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function ProductCard ({restaurantName, imgSrc, onRating}
    :{ restaurantName:string, imgSrc:string, onRating?:Function}) {

    return (
        <InteractiveCard contentName={restaurantName}>
            <div className="w-full h-[80%] relative rounded-t-lg">
                <Image src={imgSrc}
                    alt='Product Picture'
                    fill={true}
                    className="object-cover rounded-t-lg"/>
            </div>
            <div className="w-full h-[15%] p-[10px]">{restaurantName}</div>
        </InteractiveCard>
    )
}