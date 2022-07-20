import axios from 'axios';

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.querySelector('#address')! as HTMLInputElement;
const GOOGLE_API_KEY = ``;
const URL = `https://maps.googleapis.com/maps/api/geocode/json`
declare var google : any;
type GoogleGeocodingResponse ={ results:{geometry:{location:{lat: number,lng: number}}}[];
status: 'OK'| 'ZERO_RESULTS';
}
const searchAddressHandler= (event: Event)=>{
    event.preventDefault()
    const address = addressInput.value
    axios.get<GoogleGeocodingResponse>(`${URL}?address=${encodeURI(address)}&key=${GOOGLE_API_KEY}`)
    .then((res)=> {
    if (res.data.status !== 'OK') {
        throw new Error("No results");
    }
    const coordinates = res?.data?.results[0].geometry.location
    const map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 12
      });
      
      new google.maps.Maker({position:coordinates, map:map})
})
    .catch(err => err)
    addressInput.value= ''
    
}
form.addEventListener('submit',searchAddressHandler)
