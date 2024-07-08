"use client"; // This is a client component
import React, {useState, useEffect} from 'react';
import { useMediaQuery } from 'react-responsive'
import Footer from './Footer';
import Cards from './Cards';

function Browingcard({ clickBack, cardSelected }) {
  const [cardDetails, setCardDetails] = useState(null);
  const apiUrl = "http://localhost:3001";

  useEffect(() => {
    console.log('Fetching card details for card:', cardSelected.index);
    fetch(`${apiUrl}/api/cards/${cardSelected.index}`)
      .then(response => response.json())
      .then(data => setCardDetails(data))
      .catch(error => console.error('Error fetching card details:', error));
  }, [cardSelected]);

  if (!cardDetails) return <div>Loading...</div>;

  const getCardMeaning = () => {
    switch (cardSelected.typeCard) {
      case 'work':
        return cardDetails.work_meaning;
      case 'money':
        return cardDetails.money_meaning;
      case 'love':
        return cardDetails.love_meaning;
      case 'health':
        return cardDetails.health_meaning;
      default:
        return '';
    }
  };

  const meaning = getCardMeaning();

  return (
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
        <div>
            <h1 className="text-center text-black text-4xl font-bold mb-4">{cardDetails.name}</h1>
            <h2 className="text-center text-black text-2xl">{cardDetails.name_th}</h2>
            <div className="flex flex-wrap justify-center mt-4">
                <div className="grid grid-row-2 gap-8">
                    <div className="flex flex-wrap justify-center">
                        <img
                            className="w-60 h-84 rounded-md"
                            src={"/img/cards/" + cardDetails.name + ".png"}
                        />
                    </div>
                    <div className="max-w-lg">
                        <p className="text-black">{getCardMeaning()}</p>
                    </div>
                </div>
            </div>
        </div>
        

        {/*action buttons*/}
        <div className="flex flex-wrap justify-center">
          <div className="flex justify-center">
            <button
              className="bg-customBlue text-white px-4 py-2 rounded-md mx-2"
              onClick={ clickBack }
            >
              ทำนายอีกครั้ง
            </button>
          </div>
        </div>

        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  );
}

export default Browingcard;