import React from 'react'
import './Introduction.css'
import Subtitle from '../shared/subtitle'
import worldImg from '../assets/world.png'
import Introduction1 from '../assets/introduction1.png'
import IntroductionVideo from '../assets/hero-video.mp4'
import Introduction2 from '../assets/introduction2.png'
const Introduction = () => {
    return (
        <div className='pt-14 mt-16'>
            <div className='flex'>
                <div className='w-[97%] ml-10'>
                    <div className='ml-4 hero__subtitle flex items-center'>
                        <Subtitle subtitle={'Những điều bạn nên biết'} />
                        <img src={worldImg} alt="" />
                    </div>
                    <h1 className='text-4xl mt-4 ml-4 font-medium'>Explore Nest sẽ mở ra cơ hội giúp bạn tạo ra <span className='text-hightlight'> những kỷ niệm</span></h1>
                    <p className='ml-4 text-base leading-6 mt-4'>
                        Explore Nest nơi hành trình khám phá của bạn bắt đầu.
                        Chúng tôi tin rằng du lịch không chỉ là việc đến một địa điểm mới,
                        mà còn là việc tạo ra những kỷ niệm đáng nhớ và trải nghiệm không thể nào quên.
                        Tại Explore Nest, sự hài lòng của bạn là ưu tiên hàng đầu,
                        và đội ngũ nhân viên giàu kinh nghiệm luôn sẵn sàng hỗ trợ bạn trong suốt chuyến đi.
                    </p>
                </div>
                <div className='flex ml-8'>
                    <div className='hero__img-box mr-4 w-[520px]'>
                        <img src={Introduction1} alt="" />
                    </div>
                    <div className='hero__img-box mr-4 mt-10'>
                        <video src={IntroductionVideo} alt="" controls />
                    </div>
                    <div className='hero__img-box mt-20'>
                        <img src={Introduction2} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Introduction
