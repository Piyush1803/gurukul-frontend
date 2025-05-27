import ImageSlider from "../components/ImageSlider";

const Home = () => {

    return (
        <div className="px-6">
            <ImageSlider />
            <div style={{ width: '40%', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Gurukul Bakery</h1>
                <span className="block text-base font-normal">
                    offering a wide variety of freshly baked delights! 🎂🍪 From creamy cakes, crunchy cookies, and crusty breads 🥖 to buttery snacks 🥐 — we have it all! 🎓📚 More than just a bakery, Gurukul is also a 🏫 training school for aspiring bakers 👨‍🍳👩‍🍳, where passion meets skill. 🧁💡 Students learn with hands-on experience 🤲 and expert guidance 🎯. ❤️ Trusted by the community for quality and taste 😋, we bake with love and care every day. 🎁🎉 Customized treats and gift hampers are available for all your special occasions! 🎊🍬
                </span>
            </div>


        </div>
    );

};
export default Home;