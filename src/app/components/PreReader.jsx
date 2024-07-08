"use client"; // This is a client component
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import ButtonSelect from './ButtonSelect';
import Button from './Button';
import Footer from './Footer';
import Cards from './Cards';
import Image from 'next/image';


const PreReader = ({clickReader}) => {
  const [activeTab, setActiveTab] = useState('work');

  const renderContent = () => {
    switch (activeTab) {
      case 'work':
        return <div className='text-black'>ดูดวงการงานช่วงนี้เป็นอย่างไร มีปัญหาเรื่องงานมั้ย ควรระวังเรื่องอะไร จะป้องกันและแก้ไขอย่างไรได้บ้าง ตั้งจิตอธิษฐานในสิ่งที่ต้องการแล้วเลือกไพ่ขึ้นมา 1 ใบ คำตอบที่คุณจะสงสัยจะปรากฏผ่านคำทำนายจากไพ่ยิปซีของคุณในทันที</div>;
      case 'money':
        return <div className='text-black'>ดูดวงการเงินช่วงนี้เป็นอย่างไร มีปัญหาเรื่องเงินมั้ย ควรระวังเรื่องอะไร จะป้องกันและแก้ไขอย่างไรได้บ้าง ตั้งจิตอธิษฐานในสิ่งที่ต้องการแล้วเลือกไพ่ขึ้นมา 1 ใบ คำตอบที่คุณจะสงสัยจะปรากฏผ่านคำทำนายจากไพ่ยิปซีของคุณในทันที</div>;
      case 'love':
        return <div className='text-black'>ดูดวงความรักช่วงนี้เป็นอย่างไร มีปัญหาความรักมั้ย ควรระวังเรื่องอะไร จะป้องกันและแก้ไขอย่างไรได้บ้าง ตั้งจิตอธิษฐานในสิ่งที่ต้องการแล้วเลือกไพ่ขึ้นมา 1 ใบ คำตอบที่คุณจะสงสัยจะปรากฏผ่านคำทำนายจากไพ่ยิปซีของคุณในทันที</div>;
      case 'health':
        return <div className='text-black'>ดูดวงสุขภาพร่างกายช่วงนี้เป็นอย่างไร มีปัญหาสุขภาพมั้ย ควรระวังเรื่องอะไร จะป้องกันและแก้ไขอย่างไรได้บ้าง ตั้งจิตอธิษฐานในสิ่งที่ต้องการแล้วเลือกไพ่ขึ้นมา 1 ใบ คำตอบที่คุณจะสงสัยจะปรากฏผ่านคำทำนายจากไพ่ยิปซีของคุณในทันที</div>;
      default:
        return <div className='text-black'>ดูดวงการงานช่วงนี้เป็นอย่างไร มีปัญหาเรื่องงานมั้ย ควรระวังเรื่องอะไร จะป้องกันและแก้ไขอย่างไรได้บ้าง ตั้งจิตอธิษฐานในสิ่งที่ต้องการแล้วเลือกไพ่ขึ้นมา 1 ใบ คำตอบที่คุณจะสงสัยจะปรากฏผ่านคำทำนายจากไพ่ยิปซีของคุณในทันที</div>;
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(null);
  // Function to handle card selection and unselection
  const handleCardSelect = (index) => {
    //setSelectedIndex if previous index is not equal to current index set to null else set to index
    setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
  };  


  const [shuffledIndices, setShuffledIndices] = useState([]);

  const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  };

  const randomIndex = () => {
    return Math.floor(Math.random() * 22);
  };

  useEffect(() => {
    // Create an array of indices and shuffle it once on mount
    const initialIndices = [...Array(22).keys()];
    setShuffledIndices(shuffleArray(initialIndices));
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth : 767 ,maxWidth: 1224 });
  const isMobile = useMediaQuery({ maxWidth: 766 })

  if (!isClient) {
    return null; // Render nothing on the server
  }


  return (
    <div>
      {isBigScreen && 
        <div
            className="min-h-screen "
            style={{
              background: 'url(./img/bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <main className="pt-12 bg-white bg-opacity-75 min-h-screen flex flex-col justify-between">
              <h1 className="text-center text-black text-4xl font-bold mt-4 underline">ดูดวงไพ่ยิปซี</h1>
              <div>
                  <div className="flex justify-center mt-2">
                        <button className={`${activeTab === "work" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('work')}>การงาน</button>
                        <button className={`${activeTab === "money" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('money')}>การเงิน</button>
                        <button className={`${activeTab === "love" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('love')}>ความรัก</button>
                        <button className={`${activeTab === "health" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('health')}>สุขภาพ</button>
                  </div>
                  <div className="flex justify-center text-center w-full m-2">
                    <div className="flex justify-center w-3/4">
                      {renderContent()}
                    </div>
                  </div>
              </div>
            
              {/*cards*/}
              <div className="flex justify-center text-center w-full">
                <div className="flex justify-center flex-wrap w-4/6">
                      {shuffledIndices.map((index) => (
                      <div key={index} className="m-1">
                        <Cards
                          imageBack="./img/bg-cardBack.jpg"
                          imageFront="./img/bg-cardBack.jpg"
                          index={index}
                          onSelect={() => handleCardSelect(index)}
                          isSelected={selectedIndex === index}
                        />
                      </div>
                    ))}
                </div>
              </div>
              {/*action buttons*/}
              <div className='flex flex-wrap justify-center'>
                  <div className="flex justify-center">
                      <Button 
                          index={selectedIndex}
                          type={activeTab}
                          clickReader={clickReader}
                          buttonText="ทำนาย"
                        >
                      </Button>
                  </div>
              </div>
              
              <footer>
                  <Footer />
              </footer>
            </main>
        </div>
      }
      {isDesktopOrLaptop &&
        <div
          className="min-h-screen "
          style={{
            background: 'url(./img/bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <main className="pt-12 bg-white bg-opacity-75 min-h-screen flex flex-col justify-between">
            <h1 className="text-center text-black text-4xl font-bold mt-4 underline">ดูดวงไพ่ยิปซี</h1>
            <div>
                <div className="flex justify-center mt-2">
                        <button className={`${activeTab === "work" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('work')}>การงาน</button>
                        <button className={`${activeTab === "money" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('money')}>การเงิน</button>
                        <button className={`${activeTab === "love" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('love')}>ความรัก</button>
                        <button className={`${activeTab === "health" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('health')}>สุขภาพ</button>
                </div>
                <div className="flex justify-center text-center w-full m-2">
                  <div className="flex justify-center w-3/4">
                    {renderContent()}
                  </div>
                </div>
            </div>
          
            {/*cards*/}
            <div className="flex justify-center text-center w-full">
              <div className="flex justify-center flex-wrap w-4/6">
                    {shuffledIndices.map((index) => (
                    <div key={index} className="m-1">
                      <Cards
                        imageBack="./img/bg-cardBack.jpg"
                        imageFront="./img/bg-cardBack.jpg"
                        index={index}
                        onSelect={() => handleCardSelect(index)}
                        isSelected={selectedIndex === index}
                      />
                    </div>
                  ))}
              </div>
            </div>
            {/*action buttons*/}
            <div className='flex flex-wrap justify-center'>
                <div className="flex justify-center">
                    <Button
                        index={selectedIndex}
                        type={activeTab}
                        clickReader={clickReader}
                        buttonText="ทำนาย"
                      >
                    </Button>
                </div>
            </div>
            
            <footer>
                <Footer />
            </footer>
          </main>
        </div>
      }
      {isTablet &&
        <div
          className="min-h-screen "
          style={{
            background: 'url(./img/bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <main className="pt-6 bg-white bg-opacity-75 min-h-screen flex flex-col justify-between">
            <h1 className="text-center text-black text-2xl font-bold underline">ดูดวงไพ่ยิปซี</h1>
            <div>
                <div className="flex justify-center mt-2">
                    <button className={`${activeTab === "work" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('work')}>การงาน</button>
                    <button className={`${activeTab === "money" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('money')}>การเงิน</button>
                    <button className={`${activeTab === "love" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('love')}>ความรัก</button>
                    <button className={`${activeTab === "health" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('health')}>สุขภาพ</button>
                </div>
                <div className="flex justify-center text-center w-full m-2">
                  <div className="flex justify-center w-5/6">
                    {renderContent()}
                  </div>
                </div>
            </div>
          
            {/*cards*/}
            <div className="flex justify-center text-center w-full">
              <div className="flex justify-center flex-wrap w-4/6">
                  {shuffledIndices.map((index) => (
                    <div key={index} className="m-1">
                      <Cards
                        imageBack="./img/bg-cardBack.jpg"
                        imageFront="./img/bg-cardBack.jpg"
                        index={index}
                        onSelect={() => handleCardSelect(index)}
                        isSelected={selectedIndex === index}
                      />
                    </div>
                  ))}
              </div>
            </div>
            {/*action buttons*/}
            <div className='flex flex-wrap justify-center'>
                <div className="flex justify-center">
                  {/*check if cards noting select alert something*/}
                    {/* <Button
                        onClick={() => { shuffleArray() }}
                        buttonText="สับไพ่"
                    >
                    </Button> */}
                    <Button
                        index={randomIndex}
                        type={activeTab}
                        clickReader={clickReader}
                        buttonText="ทำนาย"
                      >
                    </Button>
                </div>
            </div>
            
            <footer>
                <Footer />
            </footer>
          </main>
        </div>
      }
      {isMobile &&
        <div
          className="min-h-screen "
          style={{
            background: 'url(./img/bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <main className="pt-6 bg-white bg-opacity-75 min-h-screen flex flex-col justify-between">
            <h1 className="text-center text-black text-2xl font-bold underline">ดูดวงไพ่ยิปซี</h1>
            <div>
                <div className="flex justify-center mt-2">
                    <button className={`${activeTab === "work" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('work')}>การงาน</button>
                    <button className={`${activeTab === "money" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('money')}>การเงิน</button>
                    <button className={`${activeTab === "love" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('love')}>ความรัก</button>
                    <button className={`${activeTab === "health" ? "" : "opacity-75"} w-36 h-12 m-2 bg-customBlue bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} onClick={() => setActiveTab('health')}>สุขภาพ</button>
                </div>
                <div className="flex justify-center text-center w-full m-2">
                  <div className="flex justify-center w-5/6">
                    {renderContent()}
                  </div>
                </div>
            </div>
          
            {/*cards*/}
            <div className="flex justify-center text-center w-full">
              <div className="flex justify-center flex-wrap w-4/6">
                    <div key={randomIndex} className="m-1">
                      <Image
                        src="./img/bg-cardBack.jpg"
                        alt="Tarot Card"
                        className="w-36 h-52 rounded-md"
                        style={{
                        }}
                      />
                    </div>
              </div>
            </div>
            {/*action buttons*/}
            <div className='flex flex-wrap justify-center'>
                <div className="flex justify-center">
                    <Button
                        index={randomIndex()}
                        type={activeTab}
                        clickReader={clickReader}
                        buttonText="ทำนาย"
                      >
                    </Button>
                </div>
            </div>
            
            <footer>
                <Footer />
            </footer>
          </main>
        </div>
      }
    </div>
  );
};

export default PreReader;
