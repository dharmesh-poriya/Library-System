import Image from "next/image";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="hero mt-24">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold">Hello there 🙋🏻‍♂️</h1>
            <p className="py-8">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati accusamus aut repellendus itaque adipisci inventore nemo consequatur mollitia ullam, totam natus labore. Eveniet ratione magni obcaecati, ducimus assumenda sint tempora?
            </p>
            <button className="btn btn-sm">Get Started 🚀</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
