// import React from 'react'
// declare var $: any;
//
//
// var coordinants = [];
//
// function initMap(latlng) {
//   // var myLatLng = {lat: 21, lng: -141};
//
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 14,
//     center: {
//       lat: 40.015861,
//       lng: -105.279284
//     }
//   })
//
//   //geocode init thing
//   var geocoder = new google.maps.Geocoder();
//
//   document.getElementById('submit').addEventListener('click', function() {
//     geocodeAddress(geocoder, map);
//   });
//
//   // set pre-existing markers
//   fetch('/spots')
//     .then((res) => res.json())
//     .then((resjson) => {
//       console.log(resjson)
//       for (let j = 0; j < resjson.length; j++) {
//         for (var prop in resjson[j]) {
//           var name = resjson[j].name;
//           var lat = resjson[j].lat;
//           var lng = resjson[j].lon;
//
//         }
//
//         const coord = {
//           lat: lat,
//           lng: lng
//         }
//         coordinants.push(coord);
//       }
//
//       var filterFloat = function(value) {
//         if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
//           .test(value))
//           return Number(value);
//         return NaN;
//       };
//
//       for (let i = 0; i < coordinants.length; i++) {
//         var parseLat = filterFloat(coordinants[i].lat)
//         console.log(parseLat)
//         var parseLng = filterFloat(coordinants[i].lng)
//         var marker = new google.maps.Marker({
//           position: {
//             lat: parseLat,
//             lng: parseLng
//           },
//           map: map,
//           title: name,
//
//         })
//         var infowindow = new google.maps.InfoWindow();
//         google.maps.event.addListener(marker, 'click', (function(marker, i, infowindow) {
//           return function mapWindow() {
//             console.log('Klick! Marker=' + resjson[i]);
//             var contentThing =
//               '<div class="content">' +
//               '<div class="siteNotice">' +
//               '</div>' +
//               '<h2 class="firstHeading" class="firstHeading">' + resjson[i].name + '</h2>' +
//               '<div class="bodyContent">' +
//               '<p>Location: ' + resjson[i].location + '</p>' +
//               '<p>Bust: ' + resjson[i].bust + '</p>' +
//               '<p>Difficulty: ' + resjson[i].difficulty + '</p>' +
//               '<p>Photo_url: ' + resjson[i].photo_urlt + '</p>' +
//               '<p>Description: ' + resjson[i].description + '</p>' +
//               '</div>' +
//               '<button onclick="editFunction(' + resjson[i].id + ')" id="modal">Edit</button>' +
//               '<button onclick="deleteFunction(' + resjson[i].id + ')" >Delete</button></div>'
//             infowindow.setContent(contentThing);
//             infowindow.open(map, marker);
//           };
//         })(marker, i, infowindow));
//
//         google.maps.event.trigger(marker, 'click');
//         if (infowindow.open()) {
//
//           infowindow.open(map, marker);
//         } else {
//           infowindow.close(map, marker);
//         }
//
//       }
//     })
//
//
//   ///GEOCODE SHIT
//   function geocodeAddress(geocoder, resultsMap) {
//     var address = document.getElementById('address').value;
//     geocoder.geocode({
//       'address': address
//     }, function newMark(results, status) {
//       if (status === 'OK') {
//         resultsMap.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//           map: resultsMap,
//           position: results[0].geometry.location
//         });
//         // var id = document.getElementById('id').value;
//         var location = document.getElementById('address').value;
//         var name = document.getElementById('name').value;
//         var bust = document.getElementById('bust').value;
//         var difficulty = document.getElementById('difficulty').value;
//         var photo_url = document.getElementById('photo_url').value;
//         var description = document.getElementById('description').value;
//
//         // SAVE TO DB
//         // NEED AN AJAX CALL
//         const jaxObj = {
//           method: "POST",
//           url: `/spots`,
//           data: {
//             lat: results[0].geometry.location.lat(),
//             lon: results[0].geometry.location.lng(),
//             name: name,
//             location: location,
//             bust: bust,
//             difficulty: difficulty,
//             photo_url: photo_url,
//             description: description
//           }
//         }
//         $.ajax(jaxObj)
//           .done((spot) => {
//             //nothing needed per say, maybe refresh page?
//             window.location.href = '/map'
//             console.log('you won that ajax bruv' + spot)
//           })
//           .fail(($xhr) => {
//             console.log('you failed that ajax bruv' + $xhr)
//             //ajax failed
//           })
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//   }
// }
//
// $('#logout').click(function(event){
//   event.preventDefault()
//
//  const options = {
//     contentType: 'application/json',
//     type: "DELETE",
//     url: '/token'
//   }
//
//    $.ajax(options)
//     .done((data)=>{
//       window.location.href = '/'
//     })
//     .fail(($xhr)=>{
//       console.log($xhr.responseText)
//     })
//
// })
//
// function deleteFunction(id) {
//   fetch(`/spots/${id}`, {
//       method: 'DELETE'
//     })
//     .then(() => {
//       console.log('deleted the thing');
//       window.location.href = '/map'
//     })
//
// };
//
//   // '<div id="myModal" class="modal">' +
//   // '<div class="modal-content">' +
//   // '<span class="close">&times;</span>' +
//   // '<p>Some text in the Modal..</p>' +
//   // '</div>' +
//   // '</div>'
//
// function editFunction(id) {
//   var ids = id;
//   var modal = document.getElementById('myModal')
//   var span = document.getElementsByClassName("close")[0]
//   modal.style.display = "block";
//   span.onclick = function() {
//     modal.style.display = "none";
//   }
//   window.onclick = function(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   }
//   document.getElementById('submit2').addEventListener('click', function(poop) {
//     fetch(`/spots/${id}`)
//     var location = document.getElementById('address2').value;
//     var name = document.getElementById('name2').value;
//     var bust = document.getElementById('bust2').value;
//     var difficulty = document.getElementById('difficulty2').value;
//     var photo_url = document.getElementById('photo_url2').value;
//     var description = document.getElementById('description2').value;
//     const jaxObj2 = {
//       method: "PATCH",
//       url: `/spots/${id}`,
//       data: {
//         // lat: results[0].geometry.location.lat(),
//         // lon: results[0].geometry.location.lng(),
//         name: name,
//         location: location,
//         bust: bust,
//         difficulty: difficulty,
//         photo_url: photo_url,
//         description: description
//       }
//     }
//     $.ajax(jaxObj2)
//       .done((spot) => {
//         //nothing needed per say, maybe refresh page?
//         window.location.href = '/map'
//         console.log('you won that ajax bruv' + spot)
//       })
//       .fail(($xhr) => {
//         console.log('you failed that ajax bruv' + $xhr)
//         //ajax failed
//       })
//   // fetch(`http://localhost:3000/spots/${id}`, {
//   //     method: 'PATCH',
//   //     url: `/spots/${id}`,
//   //     data: {
//   //       name2: name,
//   //       location2: location,
//   //       bust2: bust,
//   //       difficulty2: difficulty,
//   //       photo_url2: photo_url,
//   //       description2: description
//   //     }
//   //     // body: JSON.stringify(item)
//   //   })
//   //   .then(() => {
//   //     window.location.href = '/map'
//   //   })
//     // console.log('i did a thing')
//   })
// };
//
//
// export default Map
