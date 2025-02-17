import React from 'react';
import Icon from '../../common/icons/Icon';

type CouponCountProps = {
    numofcoup: number;
}

const CouponCount: React.FC<CouponCountProps> = ( {numofcoup} ) => {
    return (
        <div className='flex flex-col bg-white rounded-xl shadow-custom-basic'>
            <div className='px-4 py-3'>
                <h1 className='text-sm text-black font-semibold pb-2'>사용 가능한 쿠폰</h1>
                <div className='flex gap-4'>
                <Icon name="couponicon_line" size={40}/>
                <p className='text-2xl font-black text-black '>{numofcoup}</p>
            </div>
            </div>
            
        </div>
    )
};

export default CouponCount;
