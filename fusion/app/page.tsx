import {Recommendations} from './components/recommendations'
import Navbar from './components/navbar';
import Footer from './components/footer';
export default function Home() {
  return (
    <>
    <Navbar  />
      <div className="container mx-auto">
        <div className="text-3xl text-center py-16">Search for your favorite books</div>
        
        <form action="/home/search" className="flex p-3 gap-4">
          <input type="search" name="q" className="input input-bordered w-full" placeholder="Type your query"/>
          <button className="btn btn-accent">Search</button>
        </form>

        <div className="my-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Recommendations type="new_arrivals"/>
          <Recommendations type="trending"/>
        </div>
      </div>
      <Footer />
      </>
  );
}
