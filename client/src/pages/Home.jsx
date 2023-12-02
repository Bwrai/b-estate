import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(saleListings);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Top \ */}
      <div className="flex flex-col gap-4 p-10 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Your next house is your Home.
          <br />
          Find your <span className="text-slate-500">perfect </span>
          home with ease
        </h1>
        <div
          className="text-gray-500 text-sm
            sm:text-lg"
        >
          BwraiEstate makes the perfect place for you to find your next home
        </div>
        <Link
          className="text-md sm:text-lg text-blue-800 font-bold hover:underline"
          to={"/search"}
        >
          Let's get Started..
        </Link>
      </div>

      {/* Swiper */}

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) 
                  center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[550px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-2 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="div">
            <div className="my-3">
              <h2 className="text-2xl text-slate-600 font-semibold">Recent Offers</h2>
              <Link className="text-blue-800 hover:underline text-sm" to={"search?offer=true"}>Show more offers</Link>
            </div>
            <div className="flex flex-wrap gap-8">
              {
                offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="div">
            <div className="my-3">
              <h2 className="text-2xl text-slate-600 font-semibold">Recent places for rent</h2>
              <Link className="text-blue-800 hover:underline text-sm" to={"search?type=rent"}>Show more places for rent</Link>
            </div>
            <div className="flex flex-wrap gap-8">
              {
                rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="div">
            <div className="my-3">
              <h2 className="text-2xl text-slate-600 font-semibold">Recent places for sale</h2>
              <Link className="text-blue-800 hover:underline text-sm" to={"search?type=sale"}>Show more places for sale</Link>
            </div>
            <div className="flex flex-wrap gap-8">
              {
                saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
