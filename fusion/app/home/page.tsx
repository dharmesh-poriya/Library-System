import Image from "next/image";

import {HomeNavbar} from "../components/home_navbar";
import {Recommendations} from '../components/recommendations'

export default function Home() {
  return (
      <div className="container mx-auto">
        <div className="text-3xl text-center py-16">Search for your favorite books</div>
        
        <form action="" className="flex p-3 gap-4">
          <input type="search" name="search" className="input input-bordered w-full" placeholder="Type your query"/>
          <button className="btn btn-accent">Search</button>
        </form>

        <div className="my-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Recommendations type="new_arrivals"/>
          <Recommendations type="trending"/>
        </div>
      </div>
  );
}
