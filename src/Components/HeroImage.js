import { useEffect, useState } from "react";
import loadingHero from "../loading.gif";
import speechBubble from "../images/speechBubble.png";

const HeroImage = ({ heroName }) => {
  const [charaImage, setCharaImage] = useState({
    image: "",
    error: "",
  });

  const loadImage = async (src) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = src;
      img.onload = () => {
        resolve(img.src);
      };
      img.onerror = () => {
        reject(new Error("Request failed"));
        reject(
          setCharaImage({
            image: "https://api.genshin.dev/enemies/hilichurl/portrait",
            error: true,
          })
        );
      };
    });
  };

  useEffect(() => {
    let isSubscribed = true;

    setCharaImage({
      image: loadingHero,
      error: "",
    });

    const fetchData = async () => {
      const heroImage = await loadImage(
        `https://api.genshin.dev/characters/${heroName}/portrait`
      );

      if (isSubscribed) {
        setCharaImage({ image: heroImage, error: false });
      }
    };

    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, [heroName]);

  return (
    <div className="chara-img-ctr">
      <img className="charaPortrait" src={charaImage.image} />
      {charaImage.error ? (
        <div>
          <img src={speechBubble} />
          <p>Failed to get image of {heroName}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HeroImage;
