import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings');

        // Create a query
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(5),
        );

        //Execute query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        // Initialize the array
        const listings = [];
        // Loops through the snapshot and pushes ID and data into listings array.
        querySnap.forEach(doc => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // Updates the state of the component with listings and set loading to false
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listings');
      }
    };

    fetchListings();
  }, []);

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings');

      // Create a query
      // Filters ten more listings by category name in descending order
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10),
      );

      //Execute query
      const querySnap = await getDocs(q);

      // Get last listing
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      // Initialize the array
      const listings = [];
      // Loops through the snapshot and pushes ID and data into listings array.
      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      // Updates the state of the component with listings and set loading to false
      setListings(prevState => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error('Could not fetch listings');
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map(listing => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
          <br />
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  );
}

export default Offers;
