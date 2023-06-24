import { useEffect, useState } from "react"
import styled from "styled-components"
import {SlideItem} from "../../Data"
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai"

const Container = styled.div`
padding-top: 5px;
    width: 100%;
    position: relative;
    height: 100vh;
    overflow: hidden;
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #d4d1d1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:0;
    bottom: 0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    z-index: 2;
    cursor: pointer;
`
const Wapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`
const Slide1 = styled.div`
    width: 100vw;
`
const ImgContainer = styled.div`
    width: 100vw;
    height: 100%;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    filter: brightness(50%);
    object-fit: cover;
`
const Desc = styled.h1`
    position: absolute;
    top: 20vh;
    left: ${props=>props.direction};
    font-family: 'Oswald', sans-serif;
    color: #c4c4c4;
    font-size: 70px;
    letter-spacing: 5px;
`
const Box = styled.div`
width: 100%;
    position: absolute;
    top: 40vh;
    left: ${props=>props.direction};
    display: flex;
    align-items: baseline;
`
const Line = styled.div`
    width: 20vw;
    height: 5px;
    background-color: #c7c2c2;
    border-radius: 10px;
`
const Desc1 = styled.h1`
    font-family: 'Oswald', sans-serif;
    color: #c7c2c2;
    font-size: 50px;
    letter-spacing: 5px;
`

const Slide = ({autoPlay = true,autoPlayTime = 5000,}) => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const handleClick = (direction) => {
        if (direction === "left") {
            setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 3)
        } else {
            setCurrentSlide(currentSlide < 3 ? currentSlide + 1 : 0)
        }
    }

    function nextSlide(slideIndex = currentSlide + 1) {
        const newSlideIndex = slideIndex >= SlideItem.length ? 0 : slideIndex;
    
        setCurrentSlide(newSlideIndex);
      }
    
      useEffect(() => {
        const timer = setTimeout(() => {
          nextSlide();
        }, autoPlayTime);
    
        return () => clearTimeout(timer);
      }, [currentSlide]);
    

  return (
      <Container>
          <Arrow direction="left" onClick={() => handleClick("left")}>
                <AiFillCaretLeft />
            </Arrow>
          <Wapper slideIndex={currentSlide}>
              { SlideItem.map((item) => (
                  <Slide1>
                      <ImgContainer>
              <Image src={item.img}/>
              </ImgContainer>
              <Desc direction={item.left}>{item.desc}</Desc>
              <Box direction={item.left1}>
                  <Line></Line>
              <Desc1>{item.desc1}</Desc1>
              </Box>
              </Slide1>
              ))}
          </Wapper>
          <Arrow direction="right" onClick={() => handleClick("right")}>
                <AiFillCaretRight />
            </Arrow>
      </Container>
  )
};

export default Slide;
